import React from 'react';
import StatusBillTable from './statusBillTable';
import { Button } from 'antd';



const data = [
  {
    key: '1',
    floor: '1',
    roomName: '101',
    tenantName: 'สมโชค',
    roomRent: 5000,
    datePay: '2022',
    roomStatus: 'รอตรวจสอบการชำระ',
  },
  {
    key: '2',
    floor: '1',
    roomName: '102',
    tenantName: 'สมหมาย',
    roomRent: 4500,
    datePay: '2022',
    roomStatus: 'ชำระค่าเช่าเรียบร้อยแล้ว',
  },
  {
    key: '3',
    floor: '1',
    roomName: '103',
    tenantName: 'สมชาย',
    roomRent: 5000,
    datePay: '2022',
    roomStatus: 'ชำระค่าเช่าเรียบร้อยแล้ว',
  },
  {
    key: '4',
    floor: '2',
    roomName: '104',
    tenantName: 'สมเพรช',
    roomRent: 5000,
    datePay: '2022',
    roomStatus: 'ค้างชำระ',
  },
  {
    key: '5',
    floor: '3',
    roomName: '104',
    tenantName: 'สมเพรช',
    roomRent: 5000,
    datePay: '2022',
    roomStatus: 'ชำระค่าเช่าเรียบร้อยแล้ว',
  },
];


const StatusBillTap: React.FC = () => {

  return (
    <>
    <div>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px"}}>
          <Button type="primary">
            เพิ่มผู้ใช้
          </Button>
      </div> */}
        <StatusBillTable data={data}/>
      </div>
    </>
  );
};

export default  StatusBillTap;