"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// 获取动态列表
router.get('/', auth_1.authenticate, postController_1.getPosts);
// 发布动态
router.post('/', auth_1.authenticate, postController_1.createPost);
// 获取动态详情
router.get('/:id', auth_1.authenticate, postController_1.getPostDetail);
// 点赞
router.post('/:id/like', auth_1.authenticate, postController_1.likePost);
// 取消点赞
router.delete('/:id/like', auth_1.authenticate, postController_1.unlikePost);
// 评论
router.post('/:id/comment', auth_1.authenticate, postController_1.commentPost);
exports.default = router;
