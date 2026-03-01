import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../models';

const Friendship = db.Friendship;
const Pet = db.Pet;

// 获取好友列表
export const getFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    
    // 获取用户的宠物
    const pets = await Pet.findAll({ where: { user_id: userId } });
    const petIds = pets.map((pet: any) => pet.id);
    
    // 查询好友关系
    const friendships = await Friendship.findAll({
      where: {
        pet_id: petIds,
        status: 'accepted',
      },
      include: [
        {
          model: Pet,
          as: 'friendPet',
          attributes: ['id', 'name', 'avatar_url', 'breed'],
        },
      ],
    });
    
    // 转换为好友列表
    const friends = friendships.map((friendship: any) => friendship.friendPet);
    
    res.status(200).json(friends);
  } catch (error) {
    console.error('获取好友列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 添加好友
export const addFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { pet_id, friend_pet_id } = req.body;
    
    if (!pet_id || !friend_pet_id) {
      return res.status(400).json({ message: '请指定宠物ID和好友宠物ID' });
    }
    
    // 检查宠物是否属于用户
    const pet = await Pet.findOne({ where: { id: pet_id, user_id: userId } });
    if (!pet) {
      return res.status(403).json({ message: '无权限操作此宠物' });
    }
    
    // 检查好友宠物是否存在
    const friendPet = await Pet.findByPk(friend_pet_id);
    if (!friendPet) {
      return res.status(404).json({ message: '好友宠物不存在' });
    }
    
    // 检查是否已经是好友或已发送申请
    const existingFriendship = await Friendship.findOne({
      where: {
        pet_id,
        friend_pet_id,
      },
    });
    
    if (existingFriendship) {
      return res.status(400).json({ message: '已经发送过好友申请或已经是好友' });
    }
    
    // 创建好友申请
    await Friendship.create({
      pet_id,
      friend_pet_id,
      status: 'pending',
    });
    
    res.status(200).json({ message: '好友申请发送成功' });
  } catch (error) {
    console.error('添加好友失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 获取好友申请
export const getFriendRequests = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    
    // 获取用户的宠物
    const pets = await Pet.findAll({ where: { user_id: userId } });
    const petIds = pets.map((pet: any) => pet.id);
    
    // 查询好友申请
    const requests = await Friendship.findAll({
      where: {
        friend_pet_id: petIds,
        status: 'pending',
      },
      include: [
        {
          model: Pet,
          as: 'pet',
          attributes: ['id', 'name', 'avatar_url', 'breed'],
        },
      ],
    });
    
    res.status(200).json(requests);
  } catch (error) {
    console.error('获取好友申请失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 接受好友申请
export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { id } = req.params;
    
    // 查询好友申请
    const request = await Friendship.findByPk(id, {
      include: [
        {
          model: Pet,
          as: 'friendPet',
          attributes: ['user_id'],
        },
      ],
    });
    
    if (!request) {
      return res.status(404).json({ message: '好友申请不存在' });
    }
    
    // 检查是否有权限处理此申请
    if (request.friendPet?.user_id !== userId) {
      return res.status(403).json({ message: '无权限处理此申请' });
    }
    
    // 更新好友状态
    await request.update({ status: 'accepted' });
    
    res.status(200).json({ message: '接受好友申请成功' });
  } catch (error) {
    console.error('接受好友申请失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 拒绝好友申请
export const rejectFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { id } = req.params;
    
    // 查询好友申请
    const request = await Friendship.findByPk(id, {
      include: [
        {
          model: Pet,
          as: 'friendPet',
          attributes: ['user_id'],
        },
      ],
    });
    
    if (!request) {
      return res.status(404).json({ message: '好友申请不存在' });
    }
    
    // 检查是否有权限处理此申请
    if (request.friendPet?.user_id !== userId) {
      return res.status(403).json({ message: '无权限处理此申请' });
    }
    
    // 删除好友申请
    await request.destroy();
    
    res.status(200).json({ message: '拒绝好友申请成功' });
  } catch (error) {
    console.error('拒绝好友申请失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 删除好友
export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { pet_id, friend_pet_id } = req.body;
    
    if (!pet_id || !friend_pet_id) {
      return res.status(400).json({ message: '请指定宠物ID和好友宠物ID' });
    }
    
    // 检查宠物是否属于用户
    const pet = await Pet.findOne({ where: { id: pet_id, user_id: userId } });
    if (!pet) {
      return res.status(403).json({ message: '无权限操作此宠物' });
    }
    
    // 删除好友关系
    await Friendship.destroy({
      where: {
        [Op.or]: [
          { pet_id, friend_pet_id, status: 'accepted' },
          { pet_id: friend_pet_id, friend_pet_id: pet_id, status: 'accepted' },
        ],
      },
    });
    
    res.status(200).json({ message: '删除好友成功' });
  } catch (error) {
    console.error('删除好友失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};