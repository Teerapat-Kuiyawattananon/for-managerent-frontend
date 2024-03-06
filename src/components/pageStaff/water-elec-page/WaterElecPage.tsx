import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

// import AllAnnouce from './subtabannouce/allAnnouce.tsx';

// import ReportFormRenter from './subtabannouce/reportFormRenter.tsx';

import ElecTab from './waterElecTab/ElecTab';
import WaterTab from './waterElecTab/WaterTab';

const WaterElecPage: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
      };
    
      const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'กรอกค่าไฟ',
          children: <ElecTab/> ,
        },
        {
          key: '2',
          label: 'กรอกค่าน้ำ',
          children: <WaterTab/>, 
        
        },
    
      ];
    
      return (
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          {/* เนื้อหาหน้าหลัก */}
        </div>
      );
    };

export default WaterElecPage;