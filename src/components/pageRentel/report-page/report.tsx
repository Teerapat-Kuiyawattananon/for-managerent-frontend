import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import YourAnnouce from './subReportPage/yourAnnouce';
import YourReportTap from './subReportPage/yourReport/yourReportTap';

const ReportPage: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
      };
    
      const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'แจ้งปัญหา',
          children: <YourReportTap/>,
        },
        {
          key: '2',
          label: 'ประกาศของคุณ',
          children: <YourAnnouce/>,
        },
    
      ];
    
      return (
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          {/* เนื้อหาหน้าหลัก */}
        </div>
      );
    };
    

export default ReportPage;