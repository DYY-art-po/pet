"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.getPetDetail = exports.createPet = exports.getPets = void 0;
const models_1 = __importDefault(require("../models"));
const Pet = models_1.default.Pet;
// 获取用户的宠物列表
const getPets = async (req, res) => {
    try {
        const { userId } = req;
        const pets = await Pet.findAll({ where: { user_id: userId } });
        res.status(200).json(pets);
    }
    catch (error) {
        console.error('获取宠物列表失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.getPets = getPets;
// 创建宠物档案
const createPet = async (req, res) => {
    try {
        const { userId } = req;
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
    }
    catch (error) {
        console.error('创建宠物档案失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.createPet = createPet;
// 获取宠物详情
const getPetDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).json({ message: '宠物不存在' });
        }
        res.status(200).json(pet);
    }
    catch (error) {
        console.error('获取宠物详情失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.getPetDetail = getPetDetail;
// 更新宠物档案
const updatePet = async (req, res) => {
    try {
        const { userId } = req;
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
    }
    catch (error) {
        console.error('更新宠物档案失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.updatePet = updatePet;
// 删除宠物档案
const deletePet = async (req, res) => {
    try {
        const { userId } = req;
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
    }
    catch (error) {
        console.error('删除宠物档案失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};
exports.deletePet = deletePet;
