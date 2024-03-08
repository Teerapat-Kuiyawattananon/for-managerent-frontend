import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Card, Image, DatePicker ,Button, Modal,Input,Form , message, Upload } from 'antd'; 
import type { UploadProps } from 'antd';

import dayjs from 'dayjs';

// ส่วนของ interface
export interface BillStatus {
  status: string;
}

const status: BillStatus[] = [
  { status: 'ค้างชำระ' },
  { status: 'รอตรวจสอบการชำระ' },
  { status: 'ชำระค่าเช่าเรียบร้อยแล้ว' },
];

// ส่วนของ function
function statusColor(status: string) {
  let color;
  switch (status) {
    case 'ค้างชำระ':
      color = 'red';
      break;
    case 'รอตรวจสอบการชำระ':
      color = 'blue';
      break;
    case 'ชำระค่าเช่าเรียบร้อยแล้ว':
      color = 'green';
      break;
    default:
      color = 'inherit'; // Default color
  }
  return <span style={{ color }}>{status}</span>;
}

const props: UploadProps = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

  const YourBillPage: React.FC = () => {
  // ส่วนของ state
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // ฟังก์ชัน handleDatePickerChange
  const handleDatePickerChange = ( dateString: string) => {
    const [year, month] = dateString.split('/');
    setSelectedMonth(Number(month));
    setSelectedYear(Number(year));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // ส่วนของ return
  return (
    <div>
      <p className='mb-1 text-lg font-bold'>
        ใบแจ้งหนี้เดือน {selectedMonth} ปี {selectedYear}
      </p>


      <div>
        <DatePicker
          defaultValue={dayjs(`${selectedYear}/${selectedMonth.toString().padStart(2, '0')}`, 'YYYY/MM')}
          format='YYYY/MM'
          picker='month'
          style={{ marginBottom: '20px' }}
          onChange={(values : any) => handleDatePickerChange(dayjs(values).format('YYYY/MM'))}
        />
      </div>
     
     
      <div style={{ display: 'flex' }}>
        <Card
          className="border-b border-black"
          title={
            <div>
              <span>ใบแจ้งหนี้ของคุณ - </span>
              {status.map((billStatus, index) => (
                <span key={index}>
                  {statusColor(billStatus.status)}
                  {index !== status.length - 1 && ', '}
                </span>
              ))}
            </div>
          }
          bordered={true}
          style={{ width: '90%', maxWidth: 600, margin: '20px 0' }}
          
        >
          <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <div className='flex'>
                    <p className='font-bold text-lg'>ชื่อหอพัก </p>
                    {/* <p className='ml-1 text-lg'> {apartInfo.apartment_name}</p> */}
                </div>
              <div className='flex '>
                  <p className='font-bold w-1/2'>ที่อยู่หอพัก </p>
                  {/* <p className='ml-1 '>{apartInfo.apartment_address}</p> */}
              </div>
              <div className='flex'>
                  <p className='font-bold'>โทรศัพท์</p>
                  {/* <p className='ml-1'>{apartInfo.apartment_contact}</p> */}
              </div>
            </div>

            <div className='w-1/2 h-1'>
              {/* <p className='font-bold text-right text-xl '>ใบแจ้งหนี้ห้อง {modalData.room_name}</p> */}
              <div className='flex justify-end'>
                <p className='font-bold text-right '>วันที่แจ้งหนี้: </p>
                {/* <p className='ml-1'>{dayjs(modalData.created_at).format('DD/MM/YYYY')}</p> */}
              </div>
              <div className='flex justify-end'>
                <p className='font-bold text-right '>ชำระภายในวันที่: </p>
                {/* <p className='ml-1'>{dayjs(modalData.created_at).add(7, 'day').format('DD/MM/YYYY')}</p> */}
              </div>
              {/* <p className='font-bold text-right '>ชำระภายในวันที่: xx-xx-xxxx</p> */}
            </div>
          </div>

          <div className='flex  justify-start mt-10'>
            <div className='w-1/2 mr-3'>
              <div className='flex'>
                <p className='font-bold'>ชื่อผู้เช่า</p>
                {/* <p className='ml-1'> {modalData.tenant_name}</p> */}
              </div>
              <div className='flex'>
                <p className='font-bold w-1/2'>ที่อยู่ผู้เช่า </p>
                {/* <p className='ml-1'> {modalData.tenant_address}</p> */}
              </div>
            </div>
          </div>

          <div className='flex  justify-start mt-4 border-t border-black   border-b border-black py-3'>
            <div className='w-1/2 mr-3'>
              <p className='font-bold'>รายการ</p>
            </div>
            <div className='w-1/2 h-1'>
              <p className='font-bold text-right '>จำนวนเงิน</p>
            </div>
          </div>
          <div className='flex  justify-start py-3'>
            <div className='w-1/2 mr-3'>
              <p className=''>ค่าเช่ารายเดือน</p>
              {/* <p className=''>ค่าน้ำ ( {modalData.water_service.start_reading} - {modalData.water_service.end_reading} ) = {modalData.water_service.usage_amount} หน่วย</p>
              <p className=''>ค่าไฟ ( {modalData.electricity_service.start_reading} - {modalData.electricity_service.end_reading} ) = {modalData.electricity_service.usage_amount} หน่วย</p>
              {modalData.bill_services.map((item, index) => (
                (item.service_name === "Rent" ? null : <p>{item.service_name}</p>)
              ))} */}
            </div>
            <div className='w-1/2 h-1'>
              {/* <p className=' text-right '>{modalData.bill_services[0].amount.toFixed(2)}</p>
              <p className='text-right '>{modalData.water_service.amount.toFixed(2)}</p>
              <p className='text-right '>{modalData.electricity_service.amount.toFixed(2)}</p>
              {modalData.bill_services.map((item, index) => (
                (item.service_name === "Rent" ? null : <p className='text-right '>{item.amount.toFixed(2)}</p>)
              ))} */}
            </div>
          </div>
          <div className='flex  justify-start mt-4 border-t border-black   border-b border-black py-3'>
            <div className='w-1/2 mr-3'>
              <p className='font-bold'>รวมทั้งสิ้น</p>
            </div>
            <div className='w-1/2 h-1'>
              {/* <p className='font-bold text-right '>{modalData.total_amount.toFixed(2)}</p> */}
            </div>
          </div>
          
          <div className='flex  justify-start py-3'>
            <div className='w-1/2 mr-3'>
              {/* <p className='font-bold'>หมายเหตุ:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p> */}
            </div>
            <div className='w-1/2 '>
              <div className='flex justify-end'>
                <p className='font-bold text-right'>ชื่อบัญชีธนาคาร </p>
                {/* <p className='ml-1 text-right'> {apartInfo.bank_account_name}</p> */}
              </div>
              <div className='flex justify-end'>
                <p className='font-bold '>ธนาคาร </p>
                {/* <p className=' ml-1 text-right'> {apartInfo.bank_name}</p> */}
              </div>
              <div className='flex justify-end'>
                <p className='font-bold text-right '>เลขบัญชี </p>
                {/* <p className='ml-1'> {apartInfo.bank_account_number}</p> */}
              </div>
              <p className='text-right '>
                <Image
                  width={150}
                  height={150}
                  // src={`http://localhost:3232/api/file-image?file=${apartInfo.qr_code_path}`}
                />
              </p>
            </div>
          </div>
          <div className='flex justify-center'style={{ marginTop: 'auto' }}>
              <Button >
                  บันทึกรูปภาพ
              </Button>
              <Button className='ml-2'type='primary'onClick={showModal}>
                  ยืนยันการชำระ
              </Button>
              <Modal 
                  title="รายละเอียดการชำระเงิน" 
                  open={isModalOpen} 
                  onOk={handleOk} 
                  onCancel={handleCancel}
                  cancelText="ยกเลิก"
                  okText="ยืนยันการชำระเงิน"
                  >
                    <Form.Item name="วันเวลาที่โอนเงิน" label="วันเวลาที่โอนเงิน" rules={[{ required: true }]}>
                        <Input
                            name='tel'
                            style={{ width: '85%' }} 
                            placeholder='วันเวลาที่โอนเงิน'
                        />
                    </Form.Item>
                    <Form.Item name="ยอดเงินทั้งหมด" label="ยอดเงินทั้งหมด" rules={[{ required: true }]}>
                        <Input
                            name='tel'
                            style={{ width: '85%' }} 
                            placeholder='ยอดเงินทั้งหมด'
                        />
                    </Form.Item>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}> เพิ่มรูปภาพหลักฐานการชำระเงิน </Button>
                    </Upload>
              </Modal>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default YourBillPage;
