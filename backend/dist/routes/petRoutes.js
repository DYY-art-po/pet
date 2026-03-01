"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const petController_1 = require("../controllers/petController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// 获取用户的宠物列表
router.get('/', auth_1.authenticate, petController_1.getPets);
// 创建宠物档案
router.post('/', auth_1.authenticate, petController_1.createPet);
// 获取宠物详情
router.get('/:id', auth_1.authenticate, petController_1.getPetDetail);
// 更新宠物档案
router.put('/:id', auth_1.authenticate, petController_1.updatePet);
// 删除宠物档案
router.delete('/:id', auth_1.authenticate, petController_1.deletePet);
exports.default = router;
