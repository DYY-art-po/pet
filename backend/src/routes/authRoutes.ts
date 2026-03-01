import express from 'express';
import { getCode, login, wechatLogin } from '../controllers/authController';

const router = express.Router();

// 获取验证码
router.post('/code', getCode);

// 手机号登录
router.post('/login', login);

// 微信登录
router.post('/wechat', wechatLogin);

export default router;