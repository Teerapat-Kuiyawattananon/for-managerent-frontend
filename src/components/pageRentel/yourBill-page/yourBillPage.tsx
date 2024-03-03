import React from 'react';
import { Empty } from 'antd';

const YourBillPage: React.FC = () => {
  return (
    <div>
        <h1>ไม่มีใบแจ้งหนี้ของคุณในขณะนี้</h1>
        <div><Empty /></div>
        {/* เนื้อหาหน้าหลัก */}
    </div>
  );
};

export default YourBillPage;