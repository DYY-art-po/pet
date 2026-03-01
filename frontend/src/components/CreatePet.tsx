import React, { useState } from 'react';
import { Card, Form, Input, Select, DatePicker, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

// 常见宠物品种
const petBreeds = {
  猫: ['布偶猫', '英短', '美短', '加菲猫', '暹罗猫', '金渐层', '银渐层', '橘猫', '狸花猫', '其他'],
  狗: ['柯基', '金毛', '泰迪', '哈士奇', '萨摩耶', '拉布拉多', '边牧', '德牧', '博美', '其他'],
};

const CreatePet: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('猫');
  const navigate = useNavigate();

  // 处理图片上传
  const handleUpload = async (file: any) => {
    // 实际项目中应该上传到服务器
    // 这里模拟上传
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
        resolve({ url });
      }, 1000);
    });
  };

  // 处理宠物类型选择
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    form.setFieldsValue({ breed: undefined });
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      // 添加头像URL
      const petData = {
        ...values,
        avatar_url: avatarUrl,
        birthday: values.birthday.format('YYYY-MM-DD'),
      };

      // 实际项目中应该调用API
      // 这里模拟提交
      console.log('创建宠物:', petData);
      message.success('宠物档案创建成功');
      
      // 跳转到首页
      navigate('/');
    } catch (error) {
      message.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: '20px' }}>
      <Card title="创建宠物档案" style={{ borderRadius: 8 }}>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="宠物头像"
            required
          >
            <Upload
              customRequest={handleUpload}
              listType="picture-circle"
              maxCount={1}
              showUploadList={false}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="宠物头像" style={{ width: 100, height: 100, borderRadius: '50%' }} />
              ) : (
                <Button icon={<UploadOutlined />}>上传头像</Button>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="宠物昵称"
            rules={[
              { required: true, message: '请输入宠物昵称' },
              { min: 2, max: 20, message: '昵称长度为2-20字符' },
            ]}
          >
            <Input placeholder="请输入宠物昵称" />
          </Form.Item>

          <Form.Item
            name="type"
            label="宠物类型"
            rules={[{ required: true, message: '请选择宠物类型' }]}
          >
            <Select
              placeholder="请选择宠物类型"
              onChange={handleTypeChange}
              defaultValue="猫"
            >
              <Option value="猫">猫</Option>
              <Option value="狗">狗</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="breed"
            label="宠物品种"
            rules={[{ required: true, message: '请选择宠物品种' }]}
          >
            <Select placeholder="请选择宠物品种">
              {petBreeds[selectedType as keyof typeof petBreeds].map((breed) => (
                <Option key={breed} value={breed}>{breed}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="gender"
            label="宠物性别"
            rules={[{ required: true, message: '请选择宠物性别' }]}
          >
            <Select placeholder="请选择宠物性别">
              <Option value="male">男孩</Option>
              <Option value="female">女孩</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="birthday"
            label="宠物生日"
            rules={[{ required: true, message: '请选择宠物生日' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="bio"
            label="个性签名"
            rules={[{ max: 50, message: '个性签名最多50字' }]}
          >
            <TextArea rows={3} placeholder="请输入个性签名" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={loading}
            >
              完成
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePet;