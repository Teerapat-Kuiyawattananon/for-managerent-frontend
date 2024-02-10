import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Avatar, Input, notification, Button} from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import type { MenuProps } from 'antd/lib/menu';
import { FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, LoginOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
import AuthService from './services/auth.service';
import './navbar.css';

// Import หน้าต่างๆ
import HomePage from './components/pageStaff/home-page/homePage';
import RoomListPage from './components/pageStaff/roomList-page/roomListPage';
import BillPage from './components/pageStaff/bill-page/billPage';
import DashBoardPage from './components/pageStaff/dashboard-page/dashboard';
import AnouncePage from './components/pageStaff/annouce-page/annoncePage';
import PacketPage from './components/pageStaff/packet-page/packetPage';

import YourBillPage from './components/pageRentel/yourBill-page/yourBillPage';
import ReportPage from './components/pageRentel/report-page/report';
import YourpacketPage from './components/pageRentel/yourPacket-page/yourPacket';

import RentPage from './components/pageAdmin/rent-page/rentPage';
import ManageUserPage from './components/pageAdmin/manageUser-page/manageUserPage';
import PermissionPage from './components/pageAdmin/permission-page/permissionPage';
import SettingPage from './components/pageAdmin/setting-Page/settingPage';

const { Content, Footer, Sider } = Layout;
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

const Navbar: React.FC = () => {
  const [_collapsed, setCollapsed] = useState(false);
  const [urlPath, setUrlPath] = useState('');
  const [url, setUrl] = useState(window.location.pathname);
  const [pageTitle, setPageTitle] = useState('');
  const {
    token: { colorBgContainer, borderRadiusLG },

  } = theme.useToken();
  // const navigate = useNavigate();
  // const history = useNavigate();
  const currentUser = AuthService.getCurrentUser();

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

  // useEffect(() => {
  //   if (url.includes('/home')) {
  //     setPageTitle('หน้าหลัก');
  //   } else if (url.includes('/roomlist')) {
  //     setPageTitle('รายการห้องเช่า');
  //   } else if (url.includes('/bill')) {
  //     setPageTitle('ใบแจ้งหนี้');
  //   } else if (url.includes('/dashboard')) {
  //     setPageTitle('กระดานสรุปรายงานผล');
  //   } else if (url.includes('/anounce')) {
  //     setPageTitle('จัดการประกาศและคำร้อง');
  //   } else if (url.includes('/packet')) {
  //     setPageTitle('แจ้งเตือนพัสดุและยืนยัน');
  //   } else if (url.includes('/yourbill')) {
  //     setPageTitle('ใบแจ้งหนี้ของคุณ');
  //   } else if (url.includes('/report')) {
  //     setPageTitle('แจ้งปัญหา');
  //   } else if (url.includes('/yourPacket')) {
  //     setPageTitle("พัสดุของคุณ");
  //   } else if (url.includes('/rent')) {
  //     setPageTitle('หอพักของคุณ');
  //   } else if (url.includes('/manageUser')) {
  //     setPageTitle('การจัดการผู้ใช้');
  //   } else if (url.includes('/permission')) {
  //     setPageTitle('ตั้งค่าสิทธิ์การเข้าใช้งาน');
  //   } else if (url.includes('/setting')) {
  //     setPageTitle('ตั้งค่าค่าใช้จ่าย');
  //   }
  // }, [url]);

  const handleMenuClick = ({ key }: { key: React.Key }) => {
    if (key === 'home') {
      setPageTitle('หน้าหลัก');
      setUrlPath('/home');
      // console.log(url.includes('/home'));
      // window.location.href = '/home';
    }
    else if (key === 'roomlist') {
      setPageTitle('รายการห้องเช่า');
      setUrlPath('/roomlist'); 
      // navigate('/roomlist')
    }
    else if (key === 'bill') {
      setPageTitle('ใบแจ้งหนี้');
      setUrlPath('/bill');
    }
    else if (key === 'dashboard') {
      setPageTitle('กระดานสรุปรายงานผล');
      setUrlPath('/dashboard');
    }
    else if (key === 'anouncn') {
      setPageTitle('จัดการประกาศและคำร้อง');
      setUrlPath('/anounce');
    }
    else if (key === 'packet') {
      setPageTitle('แจ้งเตือนพัสดุและยืนยัน');
      setUrlPath('/packet');
    }
    else if (key === 'yourBill') {
      setPageTitle('ใบแจ้งหนี้ของคุณ');
      setUrlPath('/yourbill');
    }
    else if (key === 'report') {
      setPageTitle('แจ้งปัญหา');
      setUrlPath('/report');
    }
    else if (key === 'yourPacket') {
      setPageTitle("พัสดุของคุณ");
      setUrlPath('/yourPacket');
    }
    else if (key === 'rent') {
      setPageTitle('หอพักของคุณ');
      setUrlPath('/rent');
    }
    else if (key === 'manageUser') {
      setPageTitle('การจัดการผู้ใช้');
      setUrlPath('/manageUser');
    }
    else if (key === 'permission') {
      setPageTitle('ตั้งค่าสิทธิ์การเข้าใช้งาน');
      setUrlPath('/permission');
    }
    else if (key === 'setting') {
      setPageTitle('ตั้งค่าค่าใช้จ่าย');
      setUrlPath('/setting');
    }
  };

  const handlerLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  }


  return (
    <Router>
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
          {/* <Link to={urlPath} > */}
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ background: '#253141' }} onClick={handleMenuClick}></Menu>
          {/* </Link> */}
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
            <span className="namepage" style={{ color: '#fff', marginLeft: 10 }}>{pageTitle}</span>
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
              <Routes location={urlPath} >
                <Route path="/home" element={ <HomePage/> } />
                <Route path="/roomlist" element={ <RoomListPage/> } />
                <Route path="/bill" element={ <BillPage/> } />
                <Route path="/dashboard" element={ <DashBoardPage/> } />
                <Route path="/anounce" element={ <AnouncePage/> } />
                <Route path="/packet" element={ <PacketPage/> } />
                <Route path="/yourBill" element={ <YourBillPage/> } />
                <Route path="/report" element={ <ReportPage/> } />
                <Route path="/yourpacket" element={ <YourpacketPage/> } />
                <Route path="/rent" element={ <RentPage/> } />
                <Route path="/manageUser" element={ <ManageUserPage/> } />
                <Route path="/permission" element={ <PermissionPage/> } />
                <Route path="/setting" element={ <SettingPage/> } />
                {/* <Route path="/*" element={ <Navigate to="/home"/> } /> */}
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            For managerent ©{new Date().getFullYear()} Created by KD
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Navbar;

