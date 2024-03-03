import React, { useState } from 'react';
import { Layout, Menu, theme, Avatar, Input, notification, Button, Modal} from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';
import type { MenuProps } from 'antd/lib/menu';
import { FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, LoginOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
import AuthService from './services/auth.service';
import './navbar.css';
import './index.css'


const { Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

interface Page {
  component: React.ReactNode;
  title: string;
}

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
  getItem('หน้าหลัก', 'home', <PieChartOutlined />),
  getItem('ระบบการจัดการสำหรับผู้ดูแล', 'sub1', <UserOutlined />, [
    getItem('รายการห้องเช่า', 'roomlist'),
    getItem('ใบแจ้งหนี้', 'bill'),
    getItem('กระดานสรุปรายงานผล', 'dashboard'),
    getItem('จัดการประกาศและคำร้อง', 'anouncn'),
    getItem('แจ้งเตือนพัสดุและยืนยัน', 'packet'),
  ]),
  getItem('ระบบจัดการสำหรับผู้เช่า', 'sub2', <TeamOutlined />, [
    getItem('ใบแจ้งหนี้ของคุณ', 'yourBill'),
    getItem('แจ้งปัญหา', 'report'),
    getItem('พัสดุของคุณ', 'yourPacket'),
  ]),
  getItem('การบริหารระบบ', 'sub3', <FileOutlined />, [
    getItem('หอพักของคุณ', 'rent'),
    getItem('การจัดการผู้ใช้', 'manageUser'),
    getItem('ตั้งค่าสิทธิ์การเข้าใช้งาน', 'permission'),
    getItem('ตั้งค่าค่าใช้จ่าย', 'setting'),
  ]),
];

const Navbar = ({component, title} : Page) => {
  const [isCreateApartment, setIsCreateApartment] = useState(false);
  const [_collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },

  } = theme.useToken();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const {apartId} = useParams();

  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
    // ปุ่มค้นหา
  };

  const showNotification = () => {
    notification.open({
      message: 'ไม่มีการแจ้งเตือน',
      description: 'ไม่มีการแจ้งเตือนในขณะนี้',
      duration: 3, // วินาที
      icon: <BellOutlined style={{ color: '#ff4d4f' }} />,
    });
  };
    // if (apartId === "0" || apartId === undefined) {
    //   setIsCreateApartment(true);
    // }
    // else {
    //   setIsCreateApartment(false);
    // }
  
  const handleMenuClick = ({ key }: { key: React.Key }) => {
    if (key === 'home') {
      navigate('/home')
    }
    else if (key === 'roomlist') {
      navigate('/roomlist')
    }
    else if (key === 'bill') {
      navigate('/bill')
    }
    else if (key === 'dashboard') {
      navigate('/dashboard')
    }
    else if (key === 'anouncn') {
      navigate('/anouncn')
    }
    else if (key === 'packet') {
      navigate('/packet')
    }
    else if (key === 'yourBill') {
      navigate('/yourBill')
    }
    else if (key === 'report') {
      navigate('/report')
    }
    else if (key === 'yourPacket') {
      navigate('/yourPacket')
    }
    else if (key === 'rent') {
      navigate('/create-apartment')
    }
    else if (key === 'manageUser') {
      navigate('/manageUser')
    }
    else if (key === 'permission') {
      navigate('/permission')
    }
    else if (key === 'setting') {
      navigate('/setting')
    }
  };

  const handlerLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  }


  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onCollapse={(value) => setCollapsed(value)}
          width={270}
          style={{ background: '#253141' }}
        >
          <div className="top-menu">
            <Avatar className="avatar" size={40} icon={<UserOutlined/>} />
            <span className="username-topmenu" style={{ color: '#fff', marginLeft: 10 }}>{ currentUser.full_name }</span>
            <span className="role-topmenu " style={{ color: '#fff', marginLeft: 10 }}>{ currentUser.roll ? currentUser.roll: "ตำแหน่ง"}</span>
          </div>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: '#253141' }} onClick={handleMenuClick}></Menu>
        </Sider>
        <Layout>
          <div className="header-top">
            <Button className="notification-button" icon={<BellOutlined/>} onClick={showNotification}/>
            <Input.Search className="search-icon"
              placeholder="ค้นหาทั้งหมด"
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
            />
            <LoginOutlined className="logout-icon cursor-pointer hover:bg-purple-th-hov rounded" 
              onClick={handlerLogout}
              style={{ color: '#fff', fontSize: '30px' }} />
            
          </div>
          <div className="divider"></div>
          <div className="header-bottom">
            <span className="namepage" style={{ color: '#fff', marginLeft: 10 }}>{title}</span>
          </div>
          <Content style={{ margin: '16px 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {component}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            For managerent ©{new Date().getFullYear()} Created by KD
          </Footer>
        </Layout>
      </Layout>
      {(apartId === "0" || apartId === undefined ) && (window.location.pathname !== '/create-apartment') ?
      <Modal title="ท่านยังไม่ได้สร้างพอพัก" open={false} onOk={() => {return false}} onCancel={() => {return false} }
      footer={[
          <Link to="/create-apartment">
          <Button key="submit" type="primary">
          สร้างหอพัก
        </Button>
          </Link>
      ]}>
      <p>โปรดทำการสร้างหอพักก่อนเริ่มใช้งาน</p>
      
    </Modal> : null}
      {/* <Modal title="ท่านยังไม่ได้สร้างพอพัก" open={false} onOk={() => {return false}} onCancel={() => {return false} }
        footer={[
            <Link to="/create-apartment">
            <Button key="submit" type="primary">
            สร้างหอพัก
          </Button>
            </Link>
        ]}>
        <p>โปรดทำการสร้างหอพักก่อนเริ่มใช้งาน</p>
        
      </Modal> */}
  </>
  );
};

export default Navbar;
