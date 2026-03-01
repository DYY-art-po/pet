import React from 'react';
import { List, Avatar, Button, Tabs, Badge } from 'antd';

const { TabPane } = Tabs;

// 模拟好友申请数据
const mockFriendRequests = [
  {
    id: 1,
    pet: {
      id: 3,
      name: '金毛',
      avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=golden%20retriever%20dog%20avatar&size=portrait_4_3',
      breed: '金毛',
    },
    message: '想和你成为好友',
    createdAt: '2026-03-01 09:00:00',
  },
  {
    id: 2,
    pet: {
      id: 4,
      name: '英短',
      avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=british%20shorthair%20cat%20avatar&size=portrait_4_3',
      breed: '英短',
    },
    message: '很高兴认识你',
    createdAt: '2026-03-01 08:30:00',
  },
];

// 模拟聊天记录数据
const mockChats = [
  {
    id: 1,
    pet: {
      id: 2,
      name: '布偶猫',
      avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20ragdoll%20cat%20avatar&size=portrait_4_3',
      breed: '布偶猫',
    },
    lastMessage: '今天天气真好！',
    lastMessageTime: '2026-03-01 10:00:00',
    unreadCount: 2,
  },
  {
    id: 2,
    pet: {
      id: 3,
      name: '金毛',
      avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=golden%20retriever%20dog%20avatar&size=portrait_4_3',
      breed: '金毛',
    },
    lastMessage: '一起去公园玩吗？',
    lastMessageTime: '2026-03-01 09:30:00',
    unreadCount: 0,
  },
];

const Messages: React.FC = () => {
  // 处理接受好友申请
  const handleAcceptRequest = (id: number) => {
    console.log('接受好友申请:', id);
  };

  // 处理拒绝好友申请
  const handleRejectRequest = (id: number) => {
    console.log('拒绝好友申请:', id);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* 顶部导航 */}
      <div style={{ backgroundColor: '#FF8C42', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '18px' }}>消息</h1>
      </div>

      <Tabs defaultActiveKey="chats" style={{ backgroundColor: 'white' }}>
        <TabPane tab="聊天" key="chats">
          <List
            dataSource={mockChats}
            renderItem={(chat) => (
              <List.Item
                key={chat.id}
                style={{ borderBottom: '1px solid #f0f0f0', padding: '15px' }}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={chat.unreadCount} size="small" style={{ backgroundColor: '#FF4D4F' }}>
                      <Avatar src={chat.pet.avatar} />
                    </Badge>
                  }
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{chat.pet.name}</span>
                      <span style={{ fontSize: '12px', color: '#999' }}>{chat.lastMessageTime}</span>
                    </div>
                  }
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: chat.unreadCount > 0 ? '#333' : '#999' }}>{chat.lastMessage}</span>
                      {chat.unreadCount > 0 && (
                        <Badge count={chat.unreadCount} size="small" style={{ backgroundColor: '#FF4D4F' }} />
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab={<Badge count={2}><span>好友申请</span></Badge>} key="requests">
          <List
            dataSource={mockFriendRequests}
            renderItem={(request) => (
              <List.Item
                key={request.id}
                style={{ borderBottom: '1px solid #f0f0f0', padding: '15px' }}
              >
                <List.Item.Meta
                  avatar={<Avatar src={request.pet.avatar} />}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{request.pet.name} ({request.pet.breed})</span>
                      <span style={{ fontSize: '12px', color: '#999' }}>{request.createdAt}</span>
                    </div>
                  }
                  description={request.message}
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <Button type="primary" size="small" onClick={() => handleAcceptRequest(request.id)}>接受</Button>
                  <Button size="small" onClick={() => handleRejectRequest(request.id)}>拒绝</Button>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>

      {/* 底部导航 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        <Button type="text" style={{ color: '#999' }}>首页</Button>
        <Button type="text" style={{ color: '#999' }}>发现</Button>
        <Button type="text" style={{ color: '#FF8C42' }}>消息</Button>
        <Button type="text" style={{ color: '#999' }}>我的</Button>
      </div>
    </div>
  );
};

export default Messages;