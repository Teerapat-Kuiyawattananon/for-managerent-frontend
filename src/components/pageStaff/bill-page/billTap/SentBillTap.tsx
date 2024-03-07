import React from 'react';
import SendBillTable from './SentbillTable';
import { Button } from 'antd';



const data = [
  {
    key: '1',
    floor: '1',
    roomName: '101',
    tenantName: 'สมโชค',
    roomRent: 5000,
    dateSend: '2022',
    roomStatus: 'ข้อมูลไม่ครบถ้วน',
  },
  {
    key: '2',
    floor: '1',
    roomName: '102',
    tenantName: 'สมหมาย',
    roomRent: 4500,
    dateSend: '2022',
    roomStatus: 'ข้อมูลไม่ครบถ้วน',
  },
  {
    key: '3',
    floor: '1',
    roomName: '103',
    tenantName: 'สมชาย',
    roomRent: 5000,
    dateSend: '2022',
    roomStatus: 'ข้อมูลไม่ครบถ้วน',
  },
  {
    key: '4',
    floor: '2',
    roomName: '104',
    tenantName: 'สมเพรช',
    roomRent: 5000,
    dateSend: '2022',
    roomStatus: 'รอการตรวจสอบข้อมูล',
  },
  {
    key: '5',
    floor: '3',
    roomName: '104',
    tenantName: 'สมเพรช',
    roomRent: 5000,
    dateSend: '2022',
    roomStatus: 'ส่งใบแจ้งหนี้เรียบร้อย',
  },
];


const SentBillTap: React.FC = () => {

  return (
    <>
    <div>
        <SendBillTable data={data}/>
      </div>
    </>
  );
};

export default SentBillTap;