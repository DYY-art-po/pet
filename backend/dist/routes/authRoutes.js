"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// 获取验证码
router.post('/code', authController_1.getCode);
// 手机号登录
router.post('/login', authController_1.login);
// 微信登录
router.post('/wechat', authController_1.wechatLogin);
exports.default = router;
