import { Request, Response } from 'express';
import db from '../models';

const Pet = db.Pet;

// 获取用户的宠物列表
export const getPets = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const pets = await Pet.findAll({ where: { user_id: userId } });
    res.status(200).json(pets);
  } catch (error) {
    console.error('获取宠物列表失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 创建宠物档案
export const createPet = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { name, avatar_url, breed, gender, birthday, bio, is_memorial } = req.body;
    
    if (!name || !breed || !gender || !birthday) {
      return res.status(400).json({ message: '请填写必填字段' });
    }
    
    const pet = await Pet.create({
      user_id: userId,
      name,
      avatar_url,
      breed,
      gender,
      birthday,
      bio,
      is_memorial: is_memorial || false,
    });
    
    res.status(201).json(pet);
  } catch (error) {
    console.error('创建宠物档案失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 获取宠物详情
export const getPetDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);
    
    if (!pet) {
      return res.status(404).json({ message: '宠物不存在' });
    }
    
    res.status(200).json(pet);
  } catch (error) {
    console.error('获取宠物详情失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 更新宠物档案
export const updatePet = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { id } = req.params;
    const { name, avatar_url, breed, gender, birthday, bio, is_memorial } = req.body;
    
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: '宠物不存在' });
    }
    
    // 检查权限
    if (pet.user_id !== userId) {
      return res.status(403).json({ message: '无权限操作' });
    }
    
    await pet.update({
      name,
      avatar_url,
      breed,
      gender,
      birthday,
      bio,
      is_memorial,
    });
    
    res.status(200).json(pet);
  } catch (error) {
    console.error('更新宠物档案失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

// 删除宠物档案
export const deletePet = async (req: Request, res: Response) => {
  try {
    const { userId } = req as any;
    const { id } = req.params;
    
    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: '宠物不存在' });
    }
    
    // 检查权限
    if (pet.user_id !== userId) {
      return res.status(403).json({ message: '无权限操作' });
    }
    
    await pet.destroy();
    res.status(200).json({ message: '删除成功' });
  } catch (error) {
    console.error('删除宠物档案失败:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};