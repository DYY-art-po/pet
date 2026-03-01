import express from 'express';
import { getPosts, createPost, getPostDetail, likePost, unlikePost, commentPost } from '../controllers/postController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// 获取动态列表
router.get('/', authenticate, getPosts);

// 发布动态
router.post('/', authenticate, createPost);

// 获取动态详情
router.get('/:id', authenticate, getPostDetail);

// 点赞
router.post('/:id/like', authenticate, likePost);

// 取消点赞
router.delete('/:id/like', authenticate, unlikePost);

// 评论
router.post('/:id/comment', authenticate, commentPost);

export default router;