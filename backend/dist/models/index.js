"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// 加载环境变量
dotenv_1.default.config();
// 创建数据库连接
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'pet_utopia',
    logging: console.log,
});
// 测试数据库连接
sequelize.authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// 导出数据库连接
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    User: {},
    Pet: {},
    Post: {},
    Like: {},
    Comment: {},
    Friendship: {},
    Topic: {},
};
// 导入模型
db.User = require('./User')(sequelize, sequelize_1.Sequelize);
db.Pet = require('./Pet')(sequelize, sequelize_1.Sequelize);
db.Post = require('./Post')(sequelize, sequelize_1.Sequelize);
db.Like = require('./Like')(sequelize, sequelize_1.Sequelize);
db.Comment = require('./Comment')(sequelize, sequelize_1.Sequelize);
db.Friendship = require('./Friendship')(sequelize, sequelize_1.Sequelize);
db.Topic = require('./Topic')(sequelize, sequelize_1.Sequelize);
// 定义模型关系
db.User.hasMany(db.Pet, { foreignKey: 'user_id' });
db.Pet.belongsTo(db.User, { foreignKey: 'user_id' });
db.Pet.hasMany(db.Post, { foreignKey: 'pet_id' });
db.Post.belongsTo(db.Pet, { foreignKey: 'pet_id' });
db.Pet.hasMany(db.Like, { foreignKey: 'pet_id' });
db.Like.belongsTo(db.Pet, { foreignKey: 'pet_id' });
db.Post.hasMany(db.Like, { foreignKey: 'post_id' });
db.Like.belongsTo(db.Post, { foreignKey: 'post_id' });
db.Pet.hasMany(db.Comment, { foreignKey: 'pet_id' });
db.Comment.belongsTo(db.Pet, { foreignKey: 'pet_id' });
db.Post.hasMany(db.Comment, { foreignKey: 'post_id' });
db.Comment.belongsTo(db.Post, { foreignKey: 'post_id' });
db.Pet.hasMany(db.Friendship, { foreignKey: 'pet_id' });
db.Friendship.belongsTo(db.Pet, { foreignKey: 'pet_id', as: 'pet' });
db.Pet.hasMany(db.Friendship, { foreignKey: 'friend_pet_id' });
db.Friendship.belongsTo(db.Pet, { foreignKey: 'friend_pet_id', as: 'friendPet' });
db.Pet.hasMany(db.Topic, { foreignKey: 'created_by' });
db.Topic.belongsTo(db.Pet, { foreignKey: 'created_by' });
exports.default = db;
