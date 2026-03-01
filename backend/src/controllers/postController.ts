import { Request, Response } from 'express';
import db from '../models';

const Post = db.Post;
const Pet = db.Pet;
const Like = db.Like;
const Comment = db.Comment;

// 获取动态列表
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { page = 1, size = 20 } = req.query;
    
    // 获取用户的宠物
    const pets = await Pet.findAll({ where: { user_id: userId } });
    const petIds = pets.map((pet: any) => pet.id);
    
    // 获取好友的宠物ID（简化版，实际需要查询好友关系表）
    // 这里暂时只返回用户自己的动态
    
    // 查询动态
    const posts = await Post.findAll({
      where: { pet_id: petIds },
      include: [
        {
          model: Pet,
          attributes: ['id', 'name', 'avatar_url', 'breed'],
        },
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(size as string),
      offset: (parseInt(page as string) - 1) * parseInt(size as string),
    });
    
    // 获取每个动态的点赞和评论数
    const postsWithDetails = await Promise.all(
      posts.map(async (post: any) => {
        const likeCount = await Like.count({ where: { post_id: post.id } });
        const commentCount = await Comment.count({ where: { post_id: post.id } });
        return {
          ...post.toJSON(),
          likeCount,
          commentCount,
        };
      })
    );
    
    res.status(200).json({ list: postsWithDetails, total: postsWithDetails.length });
  } catch (error) {
    console.error('获取动态列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 发布动态
export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { pet_id, content, images } = req.body;
    
    if (!pet_id || (!content && !images)) {
      return res.status(400).json({ message: '请填写内容或上传图片' });
    }
    
    // 检查宠物是否属于用户
    const pet = await Pet.findOne({ where: { id: pet_id, user_id: userId } });
    if (!pet) {
      return res.status(403).json({ message: '无权限操作此宠物' });
    }
    
    const post = await Post.create({
      pet_id,
      content,
      images,
    });
    
    res.status(201).json(post);
  } catch (error) {
    console.error('发布动态失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 获取动态详情
export const getPostDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findByPk(id, {
      include: [
        {
          model: Pet,
          attributes: ['id', 'name', 'avatar_url', 'breed'],
        },
        {
          model: Comment,
          include: [
            {
              model: Pet,
              attributes: ['id', 'name', 'avatar_url'],
            },
          ],
          order: [['created_at', 'ASC']],
        },
      ],
    });
    
    if (!post) {
      return res.status(404).json({ message: '动态不存在' });
    }
    
    // 获取点赞数
    const likeCount = await Like.count({ where: { post_id: id } });
    
    res.status(200).json({
      ...post.toJSON(),
      likeCount,
    });
  } catch (error) {
    console.error('获取动态详情失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 点赞
export const likePost = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { id } = req.params;
    const { pet_id } = req.body;
    
    if (!pet_id) {
      return res.status(400).json({ message: '请指定宠物ID' });
    }
    
    // 检查宠物是否属于用户
    const pet = await Pet.findOne({ where: { id: pet_id, user_id: userId } });
    if (!pet) {
      return res.status(403).json({ message: '无权限操作此宠物' });
    }
    
    // 检查动态是否存在
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: '动态不存在' });
    }
    
    // 检查是否已经点赞
    const existingLike = await Like.findOne({ where: { post_id: id, pet_id } });
    if (existingLike) {
      return res.status(400).json({ message: '已经点赞过了' });
    }
    
    // 创建点赞记录
    await Like.create({ post_id: id, pet_id });
    
    // 更新点赞数
    await post.update({ like_count: post.like_count + 1 });
    
    res.status(200).json({ message: '点赞成功' });
  } catch (error) {
    console.error('点赞失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 取消点赞
export const unlikePost = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { id } = req.params;
    const { pet_id } = req.body;
    
    if (!pet_id) {
      return res.status(400).json({ message: '请指定宠物ID' });
    }
    
    // 检查宠物是否属于用户
    const pet = await Pet.findOne({ where: { id: pet_id, user_id: userId } });
    if (!pet) {
      return res.status(403).json({ message: '无权限操作此宠物' });
    }
    
    // 检查动态是否存在
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: '动态不存在' });
    }
    
    // 检查是否已经点赞
    const existingLike = await Like.findOne({ where: { post_id: id, pet_id } });
    if (!existingLike) {
      return res.status(400).json({ message: '尚未点赞' });
    }
    
    // 删除点赞记录
    await existingLike.destroy();
    
    // 更新点赞数
    await post.update({ like_count: Math.max(0, post.like_count - 1) });
    
    res.status(200).json({ message: '取消点赞成功' });
  } catch (error) {
    console.error('取消点赞失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 评论
export const commentPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { id } = req.params;
    const { pet_id, content } = req.body;
    
    if (!pet_id || !content) {
      return res.status(400).json({ message: '请指定宠物ID和评论内容' });
    }
    
    // 检查宠物是否属于用户
    const pet = await Pet.findOne({ where: { id: pet_id, user_id: userId } });
    if (!pet) {
      return res.status(403).json({ message: '无权限操作此宠物' });
    }
    
    // 检查动态是否存在
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: '动态不存在' });
    }
    
    // 创建评论
    const comment = await Comment.create({ post_id: id, pet_id, content });
    
    // 更新评论数
    await post.update({ comment_count: post.comment_count + 1 });
    
    // 返回评论信息，包含宠物信息
    const commentWithPet = await Comment.findByPk(comment.id, {
      include: [
        {
          model: Pet,
          attributes: ['id', 'name', 'avatar_url'],
        },
      ],
    });
    
    res.status(201).json(commentWithPet);
  } catch (error) {
    console.error('评论失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};