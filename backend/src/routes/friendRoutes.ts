import express from 'express';
import { getFriends, addFriend, getFriendRequests, acceptFriendRequest, rejectFriendRequest, deleteFriend } from '../controllers/friendController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// 获取好友列表
router.get('/', authenticate, getFriends);

// 添加好友
router.post('/add', authenticate, addFriend);

// 获取好友申请
router.get('/requests', authenticate, getFriendRequests);

// 接受好友申请
router.post('/requests/:id/accept', authenticate, acceptFriendRequest);

// 拒绝好友申请
router.post('/requests/:id/reject', authenticate, rejectFriendRequest);

// 删除好友
router.delete('/delete', authenticate, deleteFriend);

export default router;