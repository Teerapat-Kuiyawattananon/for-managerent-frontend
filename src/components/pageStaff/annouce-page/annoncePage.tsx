import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import AllAnnouce from './subtabannouce/allAnnouce.tsx';

import ReportFormRenter from './subtabannouce/reportFormRenter.tsx';

const AnouncePage: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'ประกาศทั้งหมด',
      children: <AllAnnouce/>,
    },
    {
      key: '2',
      label: 'แจ้งปัญหาจากลูกบ้าน',
      children: <ReportFormRenter/>,
    },

  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {/* เนื้อหาหน้าหลัก */}
    </div>
  );
};

export default AnouncePage;
