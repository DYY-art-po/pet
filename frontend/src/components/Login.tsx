import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Tabs, Card } from 'antd';
import { PhoneOutlined, WechatOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 倒计时逻辑
  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000) as unknown as number;
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // 获取验证码
  const handleGetCode = async () => {
    const { phone } = form.getFieldsValue();
    if (!phone) {
      message.error('请输入手机号');
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      message.error('请输入正确的手机号');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/auth/code', { phone });
      if (response.data.success) {
        message.success('验证码发送成功');
        setCountdown(60);
      } else {
        message.error('验证码发送失败');
      }
    } catch (error) {
      message.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 手机号登录
  const handlePhoneLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', values);
      if (response.data.token) {
        // 存储token
        localStorage.setItem('token', response.data.token);
        // 检查是否有宠物
        if (response.data.hasPet) {
          navigate('/');
        } else {
          navigate('/create-pet');
        }
      } else {
        message.error('登录失败');
      }
    } catch (error) {
      message.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 微信登录
  const handleWechatLogin = async () => {
    try {
      setLoading(true);
      // 实际项目中应该跳转到微信授权页面
      // 这里模拟登录
      const response = await axios.post('/api/auth/wechat', { code: 'mock_code' });
      if (response.data.token) {
        // 存储token
        localStorage.setItem('token', response.data.token);
        // 检查是否有宠物
        if (response.data.hasPet) {
          navigate('/');
        } else {
          navigate('/create-pet');
        }
      } else {
        message.error('登录失败');
      }
    } catch (error) {
      message.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '20px' }}>
      <Card title="宠物乌托邦登录" style={{ borderRadius: 8 }}>
        <Tabs defaultActiveKey="phone">
          <TabPane tab="手机号登录" key="phone">
            <Form
              form={form}
              onFinish={handlePhoneLogin}
              layout="vertical"
            >
              <Form.Item
                name="phone"
                label="手机号"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item
                name="code"
                label="验证码"
                rules={[{ required: true, message: '请输入验证码' }]}
              >
                <Input.Group compact>
                  <Input style={{ width: '60%' }} placeholder="请输入验证码" />
                  <Button
                    type="primary"
                    style={{ width: '40%' }}
                    onClick={handleGetCode}
                    disabled={countdown > 0 || loading}
                    loading={loading}
                  >
                    {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
                  </Button>
                </Input.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="微信登录" key="wechat">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Button
                type="primary"
                icon={<WechatOutlined />}
                size="large"
                onClick={handleWechatLogin}
                loading={loading}
              >
                微信授权登录
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;