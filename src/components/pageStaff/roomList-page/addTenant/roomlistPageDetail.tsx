import React from 'react';
import { Button, Space, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const RoomListPageDetail: React.FC = () => {

    return (
      <>
        <div>
            <span> roomdetail </span>
          <Space style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />}>เพิ่มรูปภาพผังห้องพัก</Button>
          </Space>
        </div>
      </>
    );
  };
  
  export default RoomListPageDetail;