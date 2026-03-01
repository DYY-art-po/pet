"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wechatLogin = exports.login = exports.getCode = void 0;
const models_1 = __importDefault(require("../models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User = models_1.default.User;
const Pet = models_1.default.Pet;
// 生成验证码
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
// 模拟存储验证码（实际项目中应该使用Redis）
const codeStore = {};
// 获取验证码
const getCode = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ message: '手机号不能为空' });
        }
        // 生成验证码
        const code = generateCode();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5分钟过期
        // 存储验证码
        codeStore[phone] = { code, expiresAt };
        // 模拟发送验证码（实际项目中应该调用短信API）
        console.log(`向 ${phone} 发送验证码：${code}`);
        res.status(200).json({ success: true, message: '验证码发送成功' });
    }
    catch (error) {
        console.error('获取验证码失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.getCode = getCode;
// 登录/注册
const login = async (req, res) => {
    try {
        const { phone, code } = req.body;
        if (!phone || !code) {
            return res.status(400).json({ message: '手机号和验证码不能为空' });
        }
        // 验证验证码
        const storedCode = codeStore[phone];
        if (!storedCode || storedCode.expiresAt < Date.now()) {
            return res.status(400).json({ message: '验证码已过期或不存在' });
        }
        if (storedCode.code !== code) {
            return res.status(400).json({ message: '验证码错误' });
        }
        // 查找或创建用户
        let user = await User.findOne({ where: { phone } });
        if (!user) {
            user = await User.create({ phone });
        }
        // 生成JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        // 检查用户是否有宠物
        const pets = await Pet.findAll({ where: { user_id: user.id } });
        res.status(200).json({
            token,
            user: {
                id: user.id,
                phone: user.phone,
            },
            hasPet: pets.length > 0,
        });
    }
    catch (error) {
        console.error('登录失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.login = login;
// 微信登录（预留）
const wechatLogin = async (req, res) => {
    try {
        const { code: wechatCode } = req.body;
        // 实际项目中应该调用微信API获取openid
        // 这里模拟返回
        const openid = `wechat_${Math.random().toString(36).substr(2, 9)}`;
        // 查找或创建用户
        let user = await User.findOne({ where: { openid } });
        if (!user) {
            user = await User.create({ openid });
        }
        // 生成JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        // 检查用户是否有宠物
        const pets = await Pet.findAll({ where: { user_id: user.id } });
        res.status(200).json({
            token,
            user: {
                id: user.id,
                openid: user.openid,
            },
            hasPet: pets.length > 0,
        });
    }
    catch (error) {
        console.error('微信登录失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.wechatLogin = wechatLogin;
