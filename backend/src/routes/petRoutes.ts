import express from 'express';
import { getPets, createPet, getPetDetail, updatePet, deletePet } from '../controllers/petController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// 获取用户的宠物列表
router.get('/', authenticate, getPets);

// 创建宠物档案
router.post('/', authenticate, createPet);

// 获取宠物详情
router.get('/:id', authenticate, getPetDetail);

// 更新宠物档案
router.put('/:id', authenticate, updatePet);

// 删除宠物档案
router.delete('/:id', authenticate, deletePet);

export default router;