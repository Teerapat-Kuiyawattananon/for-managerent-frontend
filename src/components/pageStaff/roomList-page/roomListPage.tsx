import React from 'react';
import {  Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RoomListTable } from './roomListTable';


const data = [
  {
    key: '1',
    floor: '1',
    roomName: '101',
    tenantName: 'สมโชค',
    roomRent: 5000,
    roomStatus: 'ว่าง',
  },
  {
    key: '2',
    floor: '1',
    roomName: '102',
    tenantName: 'สมหมาย',
    roomRent: 4500,
    roomStatus: 'ไม่ว่าง',
  },
  {
    key: '3',
    floor: '1',
    roomName: '103',
    tenantName: 'สมชาย',
    roomRent: 5000,
    roomStatus: 'ไม่ว่าง',
  },
];

const RoomListPage: React.FC = () => {

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>เพิ่มรูปภาพผังห้องพัก</Button>
      </Space>
      <RoomListTable data={data}/>
    </div>
  );
};

export default RoomListPage;