"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const petRoutes_1 = __importDefault(require("./routes/petRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const friendRoutes_1 = __importDefault(require("./routes/friendRoutes"));
// 加载环境变量
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// 中间件
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 路由
app.use('/api/auth', authRoutes_1.default);
app.use('/api/pets', petRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api/friends', friendRoutes_1.default);
// 健康检查
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
