import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd/lib/menu';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import './navbar.css';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('หน้าหลัก', '1', <PieChartOutlined />),
  getItem('ระบบการจัดการสำหรับผู้ดูแล', 'sub1', <UserOutlined />, [
    getItem('รายการห้องเช่า', '2'),
    getItem('ใบแจ้งหนี้', '3'),
    getItem('กระดานสรุปรายงานผล', '4'),
    getItem('จัดการประกาศและคำร้อง', '5'),
    getItem('แจ้งเตือนพัสดุและยืนยัน', '6'),
  ]),
  getItem('ระบบจัดการสำหรับผู้เช่า', 'sub2', <TeamOutlined />, [
    getItem('ใบแจ้งหนี้ของคุณ', '7'),
    getItem('แจ้งปัญหา', '8'),
    getItem('พัสดุของคุณ', '9'),
  ]),
  getItem('การบริหารระบบ', 'sub3', <FileOutlined />, [
    getItem('หอพักของคุณ', '10'),
    getItem('การจัดการผู้ใช้', '11'),
    getItem('ตั้งค่าสิทธิ์การเข้าใช้งาน', '12'),
    getItem('ตั้งค่าค่าใช้จ่าย', '13'),
  ]),
];

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="md"  // ตั้ง breakpoint เมื่อขนาดหน้าจอลดลงถึง md (medium)
        collapsedWidth="0" // ตั้งค่าความกว้างเมื่อพับลงเป็น 0
        onCollapse={(value) => setCollapsed(value)}
        width={270}
        style={{ background: '#253141' }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: '#253141' }}>
        </Menu>
      </Sider>
      <Layout>
      <div className="header-top"> {/* Header ด้านบน */}
        <LoginOutlined className="logout-icon" style={{ color: '#fff', fontSize: '30px' }} />
      </div> 
      <div className="divider"></div>
      <div className="header-bottom" /> {/* Header ด้านล่าง */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
