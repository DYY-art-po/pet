# 宠物乌托邦（Pet Utopia）

以宠物为第一身份的社交平台，每只宠物拥有独立账号，宠主以"家长"身份参与。网站目标是实现"宠物版微信"的核心社交功能。

## 项目特点

- 宠主可以安心晒宠，无需暴露个人信息
- 宠物之间建立真实社交关系
- 构建纯净的宠物乌托邦社区

## 技术栈

### 前端
- React + TypeScript
- Ant Design
- Zustand (状态管理)
- React Router
- Axios

### 后端
- Node.js + Express
- TypeScript
- MySQL + Sequelize
- JWT (认证)

### 部署
- Docker + Docker Compose
- Nginx

## 功能模块

### 核心功能（MVP）
- 用户注册登录（手机号/微信）
- 宠物档案创建（一个用户可以创建多个宠物账号）
- 发布图文动态
- 浏览好友动态（时间流）
- 点赞/评论功能
- 基础好友系统（通过搜索ID或用户名添加）

### 后续功能
- 扫码加好友
- 社区话题
- 宠物语气优化
- 附近宠物
- 宠物相亲匹配
- 纪念账号
- AI宠物识别防伪

## 快速开始

### 环境要求
- Node.js 16+
- MySQL 5.7+
- Docker (可选，用于容器化部署)

### 本地开发

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd pet-utopia
   ```

2. **后端设置**
   ```bash
   cd backend
   npm install
   # 复制环境变量文件并修改配置
   cp .env.example .env
   # 启动开发服务器
   npm run dev
   ```

3. **前端设置**
   ```bash
   cd frontend
   npm install
   # 启动开发服务器
   npm run dev
   ```

4. **数据库设置**
   - 创建MySQL数据库：`pet_utopia`
   - 运行 `database/schema.sql` 初始化数据库结构

### Docker部署

1. **构建和启动服务**
   ```bash
   docker-compose up -d
   ```

2. **访问应用**
   - 前端：http://localhost
   - 后端API：http://localhost:3000/api

3. **停止服务**
   ```bash
   docker-compose down
   ```

## 项目结构

```
pet-utopia/
├── frontend/            # 前端代码
│   ├── src/
│   │   ├── components/  # 组件
│   │   ├── hooks/       # 自定义钩子
│   │   ├── services/    # API服务
│   │   └── App.tsx      # 应用入口
│   └── Dockerfile       # 前端Docker配置
├── backend/             # 后端代码
│   ├── src/
│   │   ├── controllers/ # 控制器
│   │   ├── models/      # 数据库模型
│   │   ├── routes/      # 路由
│   │   ├── middlewares/ # 中间件
│   │   └── server.ts    # 服务器入口
│   └── Dockerfile       # 后端Docker配置
├── database/            # 数据库脚本
│   └── schema.sql       # 数据库初始化脚本
├── deployment/          # 部署配置
├── docker-compose.yml   # Docker Compose配置
└── README.md            # 项目文档
```

## API接口

### 认证相关
- `POST /api/auth/code` - 获取验证码
- `POST /api/auth/login` - 手机号登录
- `POST /api/auth/wechat` - 微信登录

### 宠物相关
- `GET /api/pets` - 获取宠物列表
- `POST /api/pets` - 创建宠物档案
- `GET /api/pets/:id` - 获取宠物详情
- `PUT /api/pets/:id` - 更新宠物档案
- `DELETE /api/pets/:id` - 删除宠物档案

### 动态相关
- `GET /api/posts` - 获取动态列表
- `POST /api/posts` - 发布动态
- `GET /api/posts/:id` - 获取动态详情
- `POST /api/posts/:id/like` - 点赞
- `DELETE /api/posts/:id/like` - 取消点赞
- `POST /api/posts/:id/comment` - 评论

### 好友相关
- `GET /api/friends` - 获取好友列表
- `POST /api/friends/add` - 添加好友
- `GET /api/friends/requests` - 获取好友申请
- `POST /api/friends/requests/:id/accept` - 接受好友申请
- `POST /api/friends/requests/:id/reject` - 拒绝好友申请
- `DELETE /api/friends/delete` - 删除好友

## 注意事项

1. **数据库配置**：默认使用本地MySQL数据库，用户名`root`，密码为空，数据库名`pet_utopia`
2. **JWT密钥**：生产环境中请修改`.env`文件中的`JWT_SECRET`为安全的密钥
3. **图片存储**：当前版本使用前端本地存储模拟，实际生产环境需要配置云存储服务
4. **短信服务**：当前版本模拟发送验证码，实际生产环境需要集成短信API

## 开发指南

### 代码规范
- 前端：使用ESLint和Prettier
- 后端：使用TypeScript严格模式

### 提交规范
- 采用Conventional Commits规范
- 提交信息格式：`<type>(<scope>): <description>`

## 许可证

MIT
