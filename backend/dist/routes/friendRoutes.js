"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friendController_1 = require("../controllers/friendController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// 获取好友列表
router.get('/', auth_1.authenticate, friendController_1.getFriends);
// 添加好友
router.post('/add', auth_1.authenticate, friendController_1.addFriend);
// 获取好友申请
router.get('/requests', auth_1.authenticate, friendController_1.getFriendRequests);
// 接受好友申请
router.post('/requests/:id/accept', auth_1.authenticate, friendController_1.acceptFriendRequest);
// 拒绝好友申请
router.post('/requests/:id/reject', auth_1.authenticate, friendController_1.rejectFriendRequest);
// 删除好友
router.delete('/delete', auth_1.authenticate, friendController_1.deleteFriend);
exports.default = router;
