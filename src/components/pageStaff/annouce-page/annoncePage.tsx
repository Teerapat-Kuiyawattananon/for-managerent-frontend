import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const AnouncePage: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'ประกาศทั้งหมด',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'แจ้งปัญหาจากลูกบ้าน',
      children: 'Content of Tab Pane 2',
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
