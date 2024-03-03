import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

// import AllAnnouce from './subtabannouce/allAnnouce.tsx';

// import ReportFormRenter from './subtabannouce/reportFormRenter.tsx';

import FillBillTap from './billTap/fillBillTap';
import StatusBillTap from './billTap/statusBillTap';
const BillPage: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
      };
    
      const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'กรอกค่าใช้จ่าย',
          children: <FillBillTap/> ,
        },
        {
          key: '2',
          label: 'สถานะการชำระเงิน',
          children: <StatusBillTap/>, 
        
        },
    
      ];
    
      return (
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          {/* เนื้อหาหน้าหลัก */}
        </div>
      );
    };

export default BillPage;