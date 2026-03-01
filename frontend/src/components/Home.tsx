import React, { useState } from 'react';
import { Card, Avatar, Button, Tabs, Input, Upload, Modal } from 'antd';
import { PlusOutlined, UploadOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

// 模拟动态数据
const mockPosts = [
  {
    id: 1,
    pet: {
      id: 1,
      name: '小柯基',
      avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20corgi%20dog%20avatar&size=portrait_4_3',
      breed: '柯基',
    },
    content: '今天天气真好，和主人一起去公园玩了！',
    images: [
      'https://neeko-copilot.bytedance.net/api/text2image?prompt=corgi%20playing%20in%20park&size=landscape_16_9',
      'https://neeko-copilot.bytedance.net/api/text2image?prompt=corgi%20with%20owner&size=landscape_16_9',
    ],
    likeCount: 123,
    commentCount: 23,
    createdAt: '2026-03-01 10:00:00',
    liked: false,
  },
  {
    id: 2,
    pet: {
      id: 2,
      name: '布偶猫',
      avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20ragdoll%20cat%20avatar&size=portrait_4_3',
      breed: '布偶猫',
    },
    content: '今天在家睡了一整天，好舒服～',
    images: [
      'https://neeko-copilot.bytedance.net/api/text2image?prompt=ragdoll%20cat%20sleeping&size=landscape_16_9',
    ],
    likeCount: 234,
    commentCount: 45,
    createdAt: '2026-03-01 09:30:00',
    liked: true,
  },
];

const Home: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // 处理点赞
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
        };
      }
      return post;
    }));
  };

  // 处理发布动态
  const handlePublish = () => {
    if (!content && images.length === 0) {
      return;
    }

    const newPost = {
      id: posts.length + 1,
      pet: {
        id: 1,
        name: '小柯基',
        avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20corgi%20dog%20avatar&size=portrait_4_3',
        breed: '柯基',
      },
      content,
      images,
      likeCount: 0,
      commentCount: 0,
      createdAt: new Date().toLocaleString(),
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setVisible(false);
    setContent('');
    setImages([]);
  };

  // 处理图片上传
  const handleUpload = async (file: any) => {
    // 实际项目中应该上传到服务器
    // 这里模拟上传
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setImages([...images, url]);
        resolve({ url });
      }, 1000);
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* 顶部导航 */}
      <div style={{ backgroundColor: '#FF8C42', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '18px' }}>宠物乌托邦</h1>
        <div>
          <Button type="text" style={{ color: 'white' }}>搜索</Button>
          <Button type="text" style={{ color: 'white' }}>消息</Button>
        </div>
      </div>

      {/* 标签页 */}
      <Tabs defaultActiveKey="recommend" style={{ backgroundColor: 'white' }}>
        <TabPane tab="推荐" key="recommend" />
        <TabPane tab="关注" key="follow" />
        <TabPane tab="附近" key="nearby" />
      </Tabs>

      {/* 动态列表 */}
      <div style={{ padding: '10px' }}>
        {posts.map(post => (
          <Card key={post.id} style={{ marginBottom: '10px', borderRadius: 8 }}>
            {/* 头部 */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar src={post.pet.avatar} />
              <div style={{ marginLeft: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>{post.pet.name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>{post.pet.breed} · {post.createdAt}</div>
              </div>
            </div>

            {/* 内容 */}
            <div style={{ marginBottom: '10px' }}>{post.content}</div>

            {/* 图片 */}
            {post.images.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    style={{
                      width: post.images.length === 1 ? '100%' : '32%',
                      marginRight: '2%',
                      marginBottom: '2%',
                      borderRadius: 4,
                    }}
                    alt={`${post.pet.name}的照片`}
                  />
                ))}
              </div>
            )}

            {/* 底部 */}
            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px', borderTop: '1px solid #f0f0f0' }}>
              <Button
                type="text"
                icon={<LikeOutlined style={{ color: post.liked ? '#FF4D4F' : '#999' }} />}
                onClick={() => handleLike(post.id)}
              >
                {post.likeCount > 0 && post.likeCount}
              </Button>
              <Button type="text" icon={<MessageOutlined style={{ color: '#999' }} />}>
                {post.commentCount > 0 && post.commentCount}
              </Button>
              <Button type="text" icon={<ShareAltOutlined style={{ color: '#999' }} />} />
            </div>
          </Card>
        ))}
      </div>

      {/* 发布按钮 */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, backgroundColor: '#FF8C42' }}
        onClick={() => setVisible(true)}
      />

      {/* 发布动态弹窗 */}
      <Modal
        title="发布动态"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={handlePublish}
      >
        <TextArea
          rows={4}
          placeholder="分享你的精彩瞬间..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Upload
          customRequest={handleUpload}
          listType="picture"
          maxCount={9}
          multiple
        >
          <Button icon={<UploadOutlined />}>上传图片</Button>
        </Upload>
        {images.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                style={{ width: '80px', height: '80px', margin: '5px', borderRadius: 4 }}
                alt={`预览${index + 1}`}
              />
            ))}
          </div>
        )}
      </Modal>

      {/* 底部导航 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        <Button type="text" style={{ color: '#FF8C42' }}>首页</Button>
        <Button type="text" style={{ color: '#999' }}>发现</Button>
        <Button type="text" style={{ color: '#999' }}>消息</Button>
        <Button type="text" style={{ color: '#999' }}>我的</Button>
      </div>
    </div>
  );
};

export default Home;