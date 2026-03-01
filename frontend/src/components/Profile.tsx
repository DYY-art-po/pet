import React, { useState } from 'react';
import { Card, Avatar, Button, List, Switch, Modal, Form, Input, Select, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

// 模拟宠物数据
const mockPets = [
  {
    id: 1,
    name: '小柯基',
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20corgi%20dog%20avatar&size=portrait_4_3',
    breed: '柯基',
    gender: 'male',
    birthday: '2020-01-01',
    bio: '萌宠一只',
    isMemorial: false,
  },
  {
    id: 2,
    name: '布偶猫',
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20ragdoll%20cat%20avatar&size=portrait_4_3',
    breed: '布偶猫',
    gender: 'female',
    birthday: '2021-03-15',
    bio: '优雅的小公主',
    isMemorial: false,
  },
];

const Profile: React.FC = () => {
  const [currentPet, setCurrentPet] = useState(mockPets[0]);
  const [pets] = useState(mockPets);
  const [editVisible, setEditVisible] = useState(false);
  const [form] = Form.useForm();

  // 处理编辑宠物信息
  const handleEdit = () => {
    form.setFieldsValue({
      name: currentPet.name,
      breed: currentPet.breed,
      gender: currentPet.gender,
      birthday: currentPet.birthday,
      bio: currentPet.bio,
      isMemorial: currentPet.isMemorial,
    });
    setEditVisible(true);
  };

  // 处理切换宠物
  const handlePetChange = (pet: any) => {
    setCurrentPet(pet);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* 顶部导航 */}
      <div style={{ backgroundColor: '#FF8C42', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '18px' }}>个人中心</h1>
        <Button type="text" style={{ color: 'white' }}>设置</Button>
      </div>

      {/* 当前宠物信息 */}
      <Card style={{ margin: '10px', borderRadius: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size={80} src={currentPet.avatar} />
          <div style={{ marginLeft: '20px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{currentPet.name}</h2>
              <Button icon={<EditOutlined />} onClick={handleEdit} />
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>{currentPet.breed} · {currentPet.gender === 'male' ? '男孩' : '女孩'}</div>
            <div style={{ color: '#999', fontSize: '12px' }}>生日: {currentPet.birthday}</div>
            {currentPet.bio && (
              <div style={{ marginTop: '10px', fontSize: '14px' }}>{currentPet.bio}</div>
            )}
          </div>
        </div>
      </Card>

      {/* 我的宠物 */}
      <Card title="我的宠物" style={{ margin: '10px', borderRadius: 8 }}>
        <List
          dataSource={pets}
          renderItem={(pet) => (
            <List.Item
              key={pet.id}
              style={{
                border: currentPet.id === pet.id ? '1px solid #FF8C42' : '1px solid #f0f0f0',
                borderRadius: 8,
                marginBottom: '10px',
                padding: '10px',
                cursor: 'pointer',
              }}
              onClick={() => handlePetChange(pet)}
            >
              <List.Item.Meta
                avatar={<Avatar src={pet.avatar} />}
                title={pet.name}
                description={`${pet.breed} · ${pet.gender === 'male' ? '男孩' : '女孩'}`}
              />
            </List.Item>
          )}
        />
        <Button type="dashed" style={{ width: '100%' }}>添加新宠物</Button>
      </Card>

      {/* 编辑宠物信息弹窗 */}
      <Modal
        title="编辑宠物信息"
        open={editVisible}
        onCancel={() => setEditVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="宠物昵称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="宠物品种" name="breed" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="宠物性别" name="gender" rules={[{ required: true }]}>
            <Select>
              <Option value="male">男孩</Option>
              <Option value="female">女孩</Option>
            </Select>
          </Form.Item>
          <Form.Item label="宠物生日" name="birthday" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="个性签名" name="bio">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="纪念账号" name="isMemorial" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* 底部导航 */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        <Button type="text" style={{ color: '#999' }}>首页</Button>
        <Button type="text" style={{ color: '#999' }}>发现</Button>
        <Button type="text" style={{ color: '#999' }}>消息</Button>
        <Button type="text" style={{ color: '#FF8C42' }}>我的</Button>
      </div>
    </div>
  );
};

export default Profile;