import { Sequelize, Model } from 'sequelize';

// 定义模型类型
interface UserAttributes {
  id: number;
  phone?: string;
  openid?: string;
  created_at: Date;
}

interface PetAttributes {
  id: number;
  user_id: number;
  name: string;
  avatar_url?: string;
  breed: string;
  gender: string;
  birthday: Date;
  bio?: string;
  is_memorial: boolean;
  created_at: Date;
}

interface PostAttributes {
  id: number;
  pet_id: number;
  content?: string;
  images?: string[];
  like_count: number;
  comment_count: number;
  created_at: Date;
}

interface LikeAttributes {
  id: number;
  post_id: number;
  pet_id: number;
  created_at: Date;
}

interface CommentAttributes {
  id: number;
  post_id: number;
  pet_id: number;
  content: string;
  created_at: Date;
}

interface FriendshipAttributes {
  id: number;
  pet_id: number;
  friend_pet_id: number;
  status: string;
  created_at: Date;
}

interface TopicAttributes {
  id: number;
  name: string;
  description?: string;
  created_by: number;
  is_official: boolean;
  created_at: Date;
}

// 定义模型类类型
type UserModel = Model<UserAttributes>;
type PetModel = Model<PetAttributes>;
type PostModel = Model<PostAttributes>;
type LikeModel = Model<LikeAttributes>;
type CommentModel = Model<CommentAttributes>;
type FriendshipModel = Model<FriendshipAttributes>;
type TopicModel = Model<TopicAttributes>;

// 定义db对象类型
export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: any;
  Pet: any;
  Post: any;
  Like: any;
  Comment: any;
  Friendship: any;
  Topic: any;
}
