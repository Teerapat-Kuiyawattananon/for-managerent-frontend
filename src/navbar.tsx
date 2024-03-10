import React, { useEffect, useState } from 'react';
import { Layout, Menu, theme, Avatar, Input, notification, Button, Modal} from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';
import type { MenuProps } from 'antd/lib/menu';
import { FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, LoginOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
import AuthService from './services/auth.service';
import ProfileService from './services/profile.service';
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



const Navbar = ({component, title} : Page) => {
  const items: MenuItem[] = [
    getItem('หน้าหลัก', 'home', <PieChartOutlined />),
    getItem('ระบบการจัดการสำหรับผู้ดูแล', 'sub1', <UserOutlined />, [
      getItem('รายการห้องเช่า', 'roomlist'),
      getItem('ใบแจ้งหนี้', 'bill'),
      getItem('กรอกค่าน้ำค่าไฟ', 'waterElec'),
      getItem('กำหนดค่าใช้จ่ายเพิ่มเติม', 'setting'),
      // getItem('กระดานสรุปรายงานผล', 'dashboard'),
      getItem('ประกาศทั้งหมด', 'anouncn'),
      // getItem('แจ้งเตือนพัสดุและยืนยัน', 'packet'),
    ]),
    getItem('ระบบจัดการสำหรับผู้เช่า', 'sub2', <TeamOutlined />, [
      getItem('ใบแจ้งหนี้ของคุณ', 'yourBill'),
      getItem('ประกาศของคุณ', 'report'),
      // getItem('พัสดุของคุณ', 'yourPacket'),
    ]),
    getItem('การบริหารระบบ', 'sub3', <FileOutlined />, [
      getItem('หอพักของคุณ', 'rent'),
      getItem('การจัดการผู้ใช้', 'manageUser'),
      getItem('ตั้งค่าสิทธิ์การเข้าใช้งาน', 'permission'),
    ]),
  ];
  const { apartId } = useParams();
  const [itemTest, setItemTest] = useState<MenuItem[]>(items);
  const [isCreateApartment, setIsCreateApartment] = useState(false);
  const [permissionStr, setPermissionStr] = useState("");
  const [_collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },

  } = theme.useToken();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  // const handleSearch = (value: string) => {
  //   console.log('Searching for:', value);
  //   // ปุ่มค้นหา
  // };

  // ------------------------------



  // -------------------------------
  // const showNotification = () => {
  //   notification.open({
  //     message: 'ไม่มีการแจ้งเตือน',
  //     description: 'ไม่มีการแจ้งเตือนในขณะนี้',
  //     duration: 3, // วินาที
  //     icon: <BellOutlined style={{ color: '#ff4d4f' }} />,
  //   });
  // };
  
  const handleMenuClick = ({ key }: { key: React.Key }) => {
    if (key === 'home') {
      navigate(`/apartment/${apartId}/home`)
    }
    else if (key === 'roomlist') {
      navigate(`/apartment/${apartId}/roomlist`)
    }
    else if (key === 'bill') {
      navigate(`/apartment/${apartId}/bill`)
    }
    else if (key === 'dashboard') {
      navigate(`/apartment/${apartId}/dashboard`)
    }
    else if (key === 'anouncn') {
      navigate(`/apartment/${apartId}/anouncn`)
    }
    else if (key === 'packet') {
      navigate(`/apartment/${apartId}/packet`)
    }
    else if (key === 'yourBill') {
      navigate(`/apartment/${apartId}/yourBill`)
    }
    else if (key === 'waterElec') {
      navigate(`/apartment/${apartId}/waterElec`)
    }
    else if (key === 'report') {
      navigate(`/apartment/${apartId}/report`)
    }
    else if (key === 'yourPacket') {
      navigate(`/apartment/${apartId}/yourPacket`)
    }
    else if (key === 'rent') {
      if (apartId === "0" || apartId === undefined){
        navigate(`/apartment/undefined/create-apartment`)
      }else{
        navigate(`/apartment/${apartId}/rentdetail`)
      }
    }
    else if (key === 'manageUser') {
      navigate(`/apartment/${apartId}/manageUser`)
    }
    else if (key === 'permission') {
      navigate(`/apartment/${apartId}/permission`)
    }
    else if (key === 'setting') {
      navigate(`/apartment/${apartId}/setting`)
    }
  };

  const handlerLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  }

  useEffect(() => {
    // Chekc role
    // let permissonsStr = ""
      const fetchPermission = async () => {
        const res = await ProfileService.getPermissionByUserId(Number(apartId), currentUser.user_id)
        if (res.status === 200) {
          setPermissionStr(res.data)
        }
      }
      fetchPermission()
      // fetchPermission()
      const permissions = permissionStr.split(',')
      const permissionList : MenuItem[] = []
      const permissionListSub1 : MenuItem[] = []
      const permissionListSub2 : MenuItem[] = []
      const permissionListSub3 : MenuItem[] = []
      for (const prs of permissions) {
        if (prs === "หน้าหลัก") {
          permissionList.push(getItem('หน้าหลัก', 'home', <PieChartOutlined />))
        } else if (prs === "รายการห้องเช่า") {
          permissionListSub1.push(getItem('รายการห้องเช่า', 'roomlist'))
          // permissionList.push(getItem('รายการห้องเช่า', 'roomlist'))
        } else if (prs === "ใบแจ้งหนี้") {
          permissionListSub1.push(getItem('ใบแจ้งหนี้', 'bill'))
          // permissionList.push(getItem('ใบแจ้งหนี้', 'bill'))
        } else if (prs === "กรอกค่าน้ำค่าไฟ") {
          permissionListSub1.push(getItem('กรอกค่าน้ำค่าไฟ', 'waterElec'))
          // permissionList.push(getItem('กรอกค่าน้ำค่าไฟ', 'waterElec'))
        } else if (prs === "กำหนดค่าใช้จ่ายเพิ่มเติม") {
          permissionListSub1.push(getItem('กำหนดค่าใช้จ่ายเพิ่มเติม', 'setting'))
          // permissionList.push(getItem('กำหนดค่าใช้จ่ายเพิ่มเติม', 'setting'))
        } else if (prs === "ประกาศทั้งหมด") {
          permissionListSub1.push(getItem('ประกาศทั้งหมด', 'anouncn'))
          // permissionList.push(getItem('ประกาศทั้งหมด', 'anouncn'))
        } else if (prs === "ใบแจ้งหนี้ของคุณ") {
          permissionListSub2.push(getItem('ใบแจ้งหนี้ของคุณ', 'yourBill'))
          // permissionList.push(getItem('ใบแจ้งหนี้ของคุณ', 'yourBill'))
        } else if (prs === "ประกาศของคุณ") {
          permissionListSub2.push(getItem('ประกาศของคุณ', 'report'))
          // permissionList.push(getItem('ประกาศของคุณ', 'report'))
        } else if (prs === "หอพักของคุณ") {
          permissionListSub3.push(getItem('หอพักของคุณ', 'rent'))
          // permissionList.push(getItem('หอพักของคุณ', 'rent'))
        } else if (prs === "การจัดการผู้ใช้") {
          permissionListSub3.push(getItem('การจัดการผู้ใช้', 'manageUser'))
          // permissionList.push(getItem('การจัดการผู้ใช้', 'manageUser'))
        } else if (prs === "ตั้งค่าสิทธิ์การเข้าใช้งาน") {  
          permissionListSub3.push(getItem('ตั้งค่าสิทธิ์การเข้าใช้งาน', 'permission'))
          // permissionList.push(getItem('ตั้งค่าสิทธิ์การเข้าใช้งาน', 'permission'))
        }

      }
      if (permissionListSub1.length > 0) {
        permissionList.push(getItem('ระบบการจัดการสำหรับผู้ดูแล', 'sub1', <UserOutlined />, permissionListSub1))
      }
      if (permissionListSub2.length > 0) {
        permissionList.push(getItem('ระบบจัดการสำหรับผู้เช่า', 'sub2', <TeamOutlined />, permissionListSub2))
      }
      if (permissionListSub3.length > 0) {
        permissionList.push(getItem('การบริหารระบบ', 'sub3', <FileOutlined />, permissionListSub3))
      }
      setItemTest(permissionList)
  }, [permissionStr])


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
            <span className="role-topmenu " style={{ color: '#fff', marginLeft: 10 }}>{ currentUser.role ? <p>{currentUser.role}</p>: null}</span>
          </div>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={itemTest} style={{ background: '#253141' }} onClick={handleMenuClick}></Menu>
        </Sider>
        <Layout>
          <div className="header-top">

            <span className='flex text-xl font-bold justify-center mt-6 text-neutral-50 mr-7' >
              ระบบการจัดการหอพัก For ManageRent
            </span>
            {/* <Button className="notification-button" icon={<BellOutlined/>} onClick={showNotification}/> */}
            {/* <Input.Search className="search-icon"
              placeholder="ค้นหาทั้งหมด"
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
            /> */}
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
