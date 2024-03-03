import React from 'react';
import ReportTable from './reportTable';

const data = [
    {
      key: '1',
      placeName: 'ห้องน้ำห้อง 101',
      problemName: 'น้ำไม่ไหล',
      sentDate: new Date(),
      reportStatus: 'รอยืนยันปัญหา',
    },
    {
        key: '2',
        placeName: 'ห้องน้ำห้อง 101',
        problemName: 'น้ำไม่ไหล',
        sentDate: new Date(),
        reportStatus: 'ยืนยันปัญหา',
    },
    {
        key: '3',
        placeName: 'ห้องน้ำห้อง 101',
        problemName: 'น้ำไม่ไหล',
        sentDate: new Date(),
        reportStatus: 'แก้ไขเสร็จสิ้นรอยืนยัน',
    },
    
  ];

const ReportFormRenter: React.FC = () => {
    return (
        <div>
            <ReportTable data={data}/>
            {/* เนื้อหาหน้าหลัก */}
        </div>
    );
};

export default ReportFormRenter;