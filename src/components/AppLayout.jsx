import React from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Typography } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  ExperimentOutlined,
  GithubOutlined,
  UserOutlined,
  StarOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const userMenu = (
  <Menu>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const AppLayout = ({ children }) => {
  const location = useLocation();
  const selectedKey = location.pathname === '/top' ? 'top' : (location.pathname.split('/')[1] || 'home');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: 'linear-gradient(135deg, #326CE5 0%, #1e293b 100%)',
          color: '#fff',
        }}
      >
        <div style={{ height: 80, margin: 16, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/">
            <img src="/images/logo.png" alt="Kubernetes Daily" style={{ height: 48, marginBottom: 8 }} />
          </Link>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 18, letterSpacing: 1 }}>Kubernetes Daily</span>
          <span style={{ color: '#cbd5e1', fontSize: 12 }}>Cloud Native Blog</span>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          style={{ height: '100%', borderRight: 0, background: 'transparent', color: '#fff' }}
          theme="dark"
        >
          <Menu.Item key="top" icon={<StarOutlined />}>
            <Link to="/top">TOP</Link>
          </Menu.Item>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="blog" icon={<BookOutlined />}>
            <Link to="/blog">Blog</Link>
          </Menu.Item>
          <Menu.Item key="labs" icon={<ExperimentOutlined />}>
            <Link to="/labs">Labs</Link>
          </Menu.Item>
          <Menu.Item key="github" icon={<GithubOutlined />}>
            <a href="https://github.com/kubernetesdaily/kubernetesdaily.github.io" target="_blank" rel="noopener noreferrer">GitHub</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, boxShadow: '0 2px 8px #f0f1f2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Breadcrumb style={{ margin: '16px 24px' }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {location.pathname.split('/').filter(Boolean).map((part, idx, arr) => (
              <Breadcrumb.Item key={idx}>
                <Link to={`/${arr.slice(0, idx + 1).join('/')}`}>{part.charAt(0).toUpperCase() + part.slice(1)}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ marginRight: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar size={40} icon={<UserOutlined />} style={{ background: 'linear-gradient(135deg, #326CE5 0%, #1e293b 100%)' }} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', minHeight: 280, background: '#f3f6fa' }}>
          <div style={{ padding: 32, background: '#fff', borderRadius: 16, minHeight: 360, boxShadow: '0 4px 24px rgba(50,108,229,0.07)' }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#f0f2f5', fontWeight: 500, color: '#64748b' }}>
          Kubernetes Daily ©{new Date().getFullYear()} | Built with Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout; 