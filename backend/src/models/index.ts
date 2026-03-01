import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { DB } from './types';

// 加载环境变量
dotenv.config();

// 创建数据库连接
const sequelize = new Sequelize({
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
const db: DB = {
  sequelize,
  Sequelize,
  User: {} as any,
  Pet: {} as any,
  Post: {} as any,
  Like: {} as any,
  Comment: {} as any,
  Friendship: {} as any,
  Topic: {} as any,
};

// 导入模型
db.User = require('./User')(sequelize, Sequelize);
db.Pet = require('./Pet')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.Like = require('./Like')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);
db.Friendship = require('./Friendship')(sequelize, Sequelize);
db.Topic = require('./Topic')(sequelize, Sequelize);

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

export default db;