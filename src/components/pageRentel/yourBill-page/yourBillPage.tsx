import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Card, Image, DatePicker ,Button, Modal,Input,Form , message, Upload } from 'antd'; 
import type { UploadProps, UploadFile } from 'antd';
import { useParams } from 'react-router-dom';
import ApartmentService from '../../../services/apartment.service';
import dayjs from 'dayjs';

// ส่วนของ interface
export interface BillStatus {
  status: string;
}
  
  const singleBillData: Bill = {
    key: 0,
    floor_name: "3",
    room_name: "C303",
    total_amount: 2500,
    bill_status: "ค้างชำระ", // "Pending payment" in Thai
    tenant_name: "Alice Lee",
    tenant_address: "789 Oak Avenue sdflkjadfkj kdjsaf",
    evidence: "",
    payment_date: new Date(2024, 3, 20), // Payment date is in the future
    payment_amount: 0,
    bill_services: [
      { key: 18, service_name: "Rent", amount: 2000 },
      { key: 122, service_name: "ค่าทำความสะอาด", amount: 500 }, // "Cleaning fee" in Thai
    ],
    water_service: {
      key: 114,
      service_name: "",
      amount: 0, // No water bill this month
      start_reading: 55,
      end_reading: 55,
      usage_amount: 0,
    },
    electricity_service: {
      key: 114,
      service_name: "",
      amount: 0, // No electricity bill this month
      start_reading: 100,
      end_reading: 100,
      usage_amount: 0,
    },
    created_at: new Date(2024, 2, 20), // Created in the middle of last month
  };
  

interface Service {
    key: number;
    service_name: string;
    amount: number;
  }
  
  interface WaterService {
    key: number;
    service_name: string; // Optional as it's an empty string in the provided data
    amount: number;
    start_reading: number;
    end_reading: number;
    usage_amount: number;
  }
  
  interface ElectricityService {
    key: number;
    service_name: string; // Optional as it's an empty string in the provided data
    amount: number;
    start_reading: number;
    end_reading: number;
    usage_amount: number;
  }
  
  interface Bill {
    key: number;
    floor_name: string;
    room_name: string;
    total_amount: number;
    bill_status: string; // Assuming "bill_status" is always a string
    tenant_name: string;
    tenant_address: string;
    evidence: string;
    payment_date: Date;
    payment_amount: number;
    bill_services: Service[];
    water_service: WaterService;
    electricity_service: ElectricityService;
    created_at : Date;
  }

  interface ApartInfo {
    key: number;
    apartment_name: string;
    apartment_address: string;
    apartment_contact: string;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
    qr_code_path: string;
    apartment_info?: string;
  }

  interface BillRequest {

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



const normFile = (e: any) => {
    console.log("fileList1", e?.fileList)
    if (Array.isArray(e)) {
      return e;
    }
    console.log("fileList", e?.fileList)
    return e?.fileList;
  };

const apartInfoTestData: ApartInfo = {
    key: 1,
    apartment_name: "The Apartment",
    apartment_address: "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
    apartment_contact: "02-123-4567",
    bank_name: "ไทยพาณิชย์",
    bank_account_name: "นายสมชาย ใจดี",
    bank_account_number: "123-4-56789-0",
    qr_code_path: "",
    apartment_info: "หอพักสุดหรู ใกล้รถไฟฟ้า สะดวกสบายมากๆ",
  };
  const YourBillPage: React.FC = () => {
  // ส่วนของ state
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileUp, setFileUp] = useState<File>();
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [monthDate, setMonthDate] = useState<string>('');
  const { apartId } = useParams();
  const [form] = Form.useForm();
    // const [apartInfo, setApartInfo] = useState<ApartInfo>({
    //     key: 0,
    //     apartment_name: '',
    //     apartment_address: '',
    //     apartment_contact: '',
    //     bank_name: '',
    //     bank_account_name: '',
    //     bank_account_number: '',
    //     qr_code_path: '',
    // });
    const [apartInfo, setApartInfo] = useState<ApartInfo>(apartInfoTestData)
    const [billData, setBillData] = useState<Bill>(singleBillData);
    // setBillData(singleBillData);
  // ฟังก์ชัน handleDatePickerChange

  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
        setFileUp(info.file.originFileObj);
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

  const handleDatePickerChange = ( values : any) => {
    const [year, month] = dayjs(values).format('YYYY/MM').split('/');
    setSelectedMonth(Number(month));
    setSelectedYear(Number(year));
    // console.log('Selected Month:', dayjs(values).format('YYYY/MM'));
    setMonthDate(dayjs(values).format('YYYY/MM'));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (values : any) => {
    form.submit();
    // console.log(form.getFieldsValue()['วันเวลาที่โอนเงิน']);
    // console.log(form.getFieldsValue()['ยอดเงินทั้งหมด']);
    const paymentData = {
        payment_date: dayjs(form.getFieldsValue()['วันเวลาที่โอนเงิน']).format('YYYY-MM-DDTHH:mm:ssZ'),
        payment_amount: form.getFieldsValue()['ยอดเงินทั้งหมด'],
        }
    
    // Check is empty
    if (paymentData.payment_date === null || paymentData.payment_amount === undefined || paymentData.payment_amount === '') {
        message.error('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }
    if (fileUp === undefined) {
        message.error('กรุณาอัพโหลดหลักฐานการชำระเงิน');
        return;
    }
    console.log("request",paymentData);
    // return
    const formData = new FormData();
    formData.append('payment_date', paymentData.payment_date);
    formData.append('payment_amount', paymentData.payment_amount);
    formData.append('files', fileUp);
    try {
        const res = await ApartmentService.payYourBill(Number(apartId), billData.key, formData)
        console.log("res", res)
        if (res.status === 200) {
            message.success('ชำระเงินเรียบร้อยแล้ว');
            setIsModalOpen(false);
            const fetchData = async () => {
                try {
                    const res = await ApartmentService.getYourBillPayment(Number(apartId), monthDate)
                    console.log(res)
                    if (res.statsu === 200 && res.message !== "Bill not found") {
                        setBillData(res.data);
                        setApartInfo(res.apart_info)
                    }
                }
                catch (err) {
                    console.error(err)
                    // message.error('เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง');
                }
            }
            fetchData();
        }
    }
    catch (error) {
        console.error(error)
        message.error('เกิดข้อผิดพลาดในการชำระเงิน กรุณาลองใหม่อีกครั้ง');
    }
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // fetch data from API
    const fetchData = async () => {
        try {
            const res = await ApartmentService.getYourBillPayment(Number(apartId), monthDate)
            console.log("res",res)
            setBillData(res.data);
            setApartInfo(res.apart_info)
            if (res.message === "Bill not found") {
                setBillData(singleBillData);
                setApartInfo(apartInfoTestData)
            }
            // if (res.statsu === 200 ) {
            //     setBillData(res.data);
            //     setApartInfo(res.apart_info)
            //     console.log("true ------------- ")
            // }
        }
        catch (err) {
            console.error(err)
            message.error('เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง');
        }
    }
    fetchData();
    console.log("bill", billData)
    console.log("key", billData.key)
  }, [monthDate]);
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
            hidden={(billData.key === 0)}
          className="border-b border-black"
          title={
            <div>
              <span>ใบแจ้งหนี้ของคุณ - </span>
                <span>{statusColor(billData.bill_status)}</span>
            </div>
          }
          bordered={true}
          style={{ width: '90%', maxWidth: 600, margin: '20px 0' }}
          
        >
            
          <div className='flex  justify-start'>
              <div className='w-1/2 mr-3'>
                <div className='flex'>
                    <p className='font-bold text-lg'>ชื่อหอพัก </p>
                    <p className='ml-1 text-lg'> {apartInfo.apartment_name}</p>
                </div>
              <div className='flex '>
                  <p className='font-bold w-1/2'>ที่อยู่หอพัก </p>
                  <p className='ml-1 '>{apartInfo.apartment_address}</p>
              </div>
              <div className='flex'>
                  <p className='font-bold'>โทรศัพท์</p>
                  <p className='ml-1'>{apartInfo.apartment_contact}</p>
              </div>
            </div>

            <div className='w-1/2 h-1'>
              <p className='font-bold text-right text-xl '>ใบแจ้งหนี้ห้อง {billData.room_name}</p>
              <div className='flex justify-end'>
                <p className='font-bold text-right '>วันที่แจ้งหนี้: </p>
                <p className='ml-1'>{dayjs(billData.created_at).format('DD/MM/YYYY')}</p>
              </div>
              <div className='flex justify-end'>
                <p className='font-bold text-right '>ชำระภายในวันที่: </p>
                <p className='ml-1'>{dayjs(billData.created_at).add(7, 'day').format('DD/MM/YYYY')}</p>
              </div>
            </div>
          </div>

          <div className='flex  justify-start mt-10'>
            <div className='w-1/2 mr-3'>
              <div className='flex'>
                <p className='font-bold'>ชื่อผู้เช่า</p>
                <p className='ml-1'> {billData.tenant_name}</p>
              </div>
              <div className='flex justify-start'>
                <p className='font-bold w-1/2'>ที่อยู่ผู้เช่า </p>
                <p className='ml-1 '> {billData.tenant_address}</p>
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
              <p className=''>ค่าเช่ารายเดือน </p>
              <p className=''>ค่าน้ำ ( {billData.water_service.start_reading} - {billData.water_service.end_reading} ) = {billData.water_service.usage_amount} หน่วย</p>
              <p className=''>ค่าไฟ ( {billData.electricity_service.start_reading} - {billData.electricity_service.end_reading} ) = {billData.electricity_service.usage_amount} หน่วย</p>
              {billData.bill_services.map((item, index) => (
                (item.service_name === "Rent" ? null : <p>{item.service_name}</p>)
              ))}
            </div>
            <div className='w-1/2 h-1'>
              <p className=' text-right '>{billData.bill_services[0].amount.toFixed(2)}</p>
              <p className='text-right '>{billData.water_service.amount.toFixed(2)}</p>
              <p className='text-right '>{billData.electricity_service.amount.toFixed(2)}</p>
              {billData.bill_services.map((item, index) => (
                (item.service_name === "Rent" ? null : <p className='text-right '>{item.amount.toFixed(2)}</p>)
              ))}
            </div>
          </div>
          <div className='flex  justify-start mt-4 border-t border-black   border-b border-black py-3'>
            <div className='w-1/2 mr-3'>
              <p className='font-bold'>รวมทั้งสิ้น</p>
            </div>
            <div className='w-1/2 h-1'>
              <p className='font-bold text-right '>{billData.total_amount.toFixed(2)}</p>
            </div>
          </div>
          <div className='flex  justify-start py-3'>
                <div className='w-1/2 mr-3'>
                    <p className='font-bold'>หมายเหตุ:</p>
                    <p>{apartInfo.apartment_info}</p>
                </div>
                <div className='w-1/2 '>
                    <div className='flex justify-end'>
                        <p className='font-bold text-right'>ชื่อบัญชีธนาคาร </p>
                        <p className='ml-1 text-right'> {apartInfo.bank_account_name}</p>
                    </div>
                    <div className='flex justify-end'>
                        <p className='font-bold '>ธนาคาร </p>
                        <p className=' ml-1 text-right'> {apartInfo.bank_name}</p>
                    </div>
                    <div className='flex justify-end'>
                        <p className='font-bold text-right '>เลขบัญชี </p>
                        <p className='ml-1'> {apartInfo.bank_account_number}</p>
                    </div>
                    
                    <p className='text-right '>
                    {(apartInfo.qr_code_path === "" ? null : <Image 
                        // width={150}
                        // height={150}
                        src={`http://localhost:3232/api/file-image?file=${apartInfo.qr_code_path}`}
                        />)}
                    </p>
                </div>
            </div>
          <div className='flex justify-end'style={{ marginTop: 'auto' }}>
            {billData.bill_status === 'ชำระค่าเช่าเรียบร้อยแล้ว' ? null :
              <Button className='ml-2'type='primary'onClick={showModal}>
                  ยืนยันการชำระ
              </Button>
            }
              <Modal 
                  title="รายละเอียดการชำระเงิน" 
                  open={isModalOpen} 
                  onOk={handleOk} 
                  onCancel={handleCancel}
                  cancelText="ยกเลิก"
                  okText="ยืนยันการชำระเงิน"
                  >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}>
                    <Form.Item name="วันเวลาที่โอนเงิน" label="วันเวลาที่โอนเงิน" rules={[{ required: true }]}>
                        {/* <Input
                            name='tel'
                            style={{ width: '85%' }} 
                            placeholder='วันเวลาที่โอนเงิน'
                        /> */}
                        <DatePicker
                            showTime
                            style={{ width: '85%' }}
                            />
                    </Form.Item>
                    <Form.Item name="ยอดเงินทั้งหมด" label="ยอดเงินทั้งหมด" rules={[{ required: true }]}>
                        <Input
                            type='number'
                            name='payment_amount'
                            style={{ width: '85%' }} 
                            placeholder='ยอดเงินทั้งหมด'
                        />
                    </Form.Item>
                        <Upload {...props} >
                        <Button icon={<UploadOutlined />}> เพิ่มรูปภาพหลักฐานการชำระเงิน </Button>
                    </Upload>
                    
                </Form>
                    
              </Modal>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default YourBillPage;
