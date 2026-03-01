import React, { useState } from 'react';
import { Card, Input, Button, List } from 'antd';
import { SearchOutlined, UserAddOutlined, FireOutlined, HeartOutlined, CompassOutlined } from '@ant-design/icons';

// 模拟话题数据
const mockTopics = [
  {
    id: 1,
    name: '相亲角',
    description: '为宠物寻找伴侣的专属话题',
    participantCount: 1234,
    isOfficial: true,
  },
  {
    id: 2,
    name: '养宠经验',
    description: '分享养宠的各种经验和技巧',
    participantCount: 5678,
    isOfficial: true,
  },
  {
    id: 3,
    name: '求助',
    description: '遇到问题寻求帮助',
    participantCount: 3456,
    isOfficial: true,
  },
  {
    id: 4,
    name: '萌宠日常',
    description: '分享宠物的日常生活',
    participantCount: 7890,
    isOfficial: false,
  },
];

const Discover: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* 顶部导航 */}
      <div style={{ backgroundColor: '#FF8C42', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '18px' }}>发现</h1>
      </div>

      {/* 搜索框 */}
      <div style={{ padding: '10px' }}>
        <Input
          placeholder="搜索宠物昵称或ID"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ borderRadius: 20 }}
        />
      </div>

      {/* 功能入口 */}
      <div style={{ padding: '10px' }}>
        <Card style={{ borderRadius: 8, marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div style={{ cursor: 'pointer' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <UserAddOutlined style={{ fontSize: 24, color: '#FF8C42' }} />
              </div>
              <div>添加好友</div>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <FireOutlined style={{ fontSize: 24, color: '#FF8C42' }} />
              </div>
              <div>话题广场</div>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <HeartOutlined style={{ fontSize: 24, color: '#FF8C42' }} />
              </div>
              <div>宠物相亲</div>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <CompassOutlined style={{ fontSize: 24, color: '#FF8C42' }} />
              </div>
              <div>附近宠物</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 话题广场 */}
      <div style={{ padding: '10px' }}>
        <Card title="热门话题" style={{ borderRadius: 8 }}>
          <List
            dataSource={mockTopics}
            renderItem={(topic) => (
              <List.Item
                key={topic.id}
                style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: 8,
                  marginBottom: '10px',
                  padding: '15px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <h3 style={{ margin: 0, marginRight: '10px' }}>{topic.name}</h3>
                    {topic.isOfficial && (
                      <span style={{ backgroundColor: '#FF8C42', color: 'white', fontSize: '12px', padding: '2px 8px', borderRadius: 10 }}>官方</span>
                    )}
                  </div>
                  <div style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{topic.description}</div>
                  <div style={{ color: '#999', fontSize: '12px' }}>{topic.participantCount}只宠物参与</div>
                </div>
              </List.Item>
            )}
          />
          <Button type="dashed" style={{ width: '100%' }}>创建话题</Button>
        </Card>
      </div>

      {/* 底部导航 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        <Button type="text" style={{ color: '#999' }}>首页</Button>
        <Button type="text" style={{ color: '#FF8C42' }}>发现</Button>
        <Button type="text" style={{ color: '#999' }}>消息</Button>
        <Button type="text" style={{ color: '#999' }}>我的</Button>
      </div>
    </div>
  );
};

export default Discover;