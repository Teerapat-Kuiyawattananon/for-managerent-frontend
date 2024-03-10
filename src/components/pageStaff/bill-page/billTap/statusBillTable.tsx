import React, { useState, useEffect } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Image , message, Popconfirm, Input ,Upload, DatePicker} from 'antd';
import { FileOutlined , UploadOutlined} from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './statusBillTable.css' 
import ApartmentService from '../../../../services/apartment.service'



type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface StatusBillTableProps {
    data: StatusBillTableData[];
}

export interface StatusBillTableData {
    key: React.Key;
    floor: string;
    room_name: string;
    tenant_name: string;
    total_amount: number;
    due_date: string;
    bill_status: string;
}

interface ModalData {
    key: React.Key;
    floor: string;
    room_name: string;
    tenant_name: string;
    total_amount: number;
    due_date: string;
    bill_status: string;
}

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
  }

  interface BillPaymentSubmit {
    message: string
  }

  interface BillPaymentReject {
    message: string
  }

  const billTestData: Bill[] = [
    {
      key: 1,
      floor_name: "1",
      room_name: "A101",
      total_amount: 4120,
      bill_status: "รอตรวจสอบการชำระ", // "Waiting for data verification" in Thai
      tenant_name: "John Doe",
      tenant_address: "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
      evidence: "",
      payment_date: new Date(),
        payment_amount: 0,
      created_at: new Date(),
      bill_services: [
        { key: 16, service_name: "Rent", amount: 3000 },
        { key: 119, service_name: "ค่าเน็ต", amount: 400 }, // "Internet fee" in Thai
      ],
      water_service: {
        key: 112,
        service_name: "",
        amount: 320,
        start_reading: 0,
        end_reading: 40,
        usage_amount: 40,
      },
      electricity_service: {
        key: 112,
        service_name: "",
        amount: 400,
        start_reading: 0,
        end_reading: 50,
        usage_amount: 50,
      },
    },
    {
      key: 2,
      floor_name: "1",
      room_name: "A102",
      total_amount: 4180,
      bill_status: "ค้างชำระ", // "Incomplete information" in Thai
      tenant_name: "Jane Doesdsf",
        tenant_address: "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
        evidence: "",
        payment_date: new Date(),
        payment_amount: 0,
        created_at: new Date(),
      bill_services: [
        { key: 17, service_name: "Rent", amount: 3000 },
        { key: 120, service_name: "ค่าเน็ต", amount: 400 }, // "Internet fee" in Thai
        { key: 121, service_name: "ค่าจอดรถ", amount: 500 }, // "Parking fee" in Thai
      ],
      water_service: {
        key: 113,
        service_name: "",
        amount: 280,
        start_reading: 0,
        end_reading: 35,
        usage_amount: 35,
      },
      electricity_service: {
        key: 113,
        service_name: "",
        amount: 0,
        start_reading: 0,
        end_reading: 0,
        usage_amount: 0,
      },
    },
    {
        key: 3,
        floor_name: "1",
        room_name: "A103",
        total_amount: 4180,
        bill_status: "ชำระค่าเช่าเรียบร้อยแล้ว", // "Incomplete information" in Thai
        tenant_name: "Jane Doesdsf",
          tenant_address: "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
          evidence: "",
          payment_date: new Date(),
          payment_amount: 0,
          created_at: new Date(),
        bill_services: [
          { key: 17, service_name: "Rent", amount: 3000 },
          { key: 120, service_name: "ค่าเน็ต", amount: 400 }, // "Internet fee" in Thai
          { key: 121, service_name: "ค่าจอดรถ", amount: 500 }, // "Parking fee" in Thai
        ],
        water_service: {
          key: 113,
          service_name: "",
          amount: 280,
          start_reading: 0,
          end_reading: 35,
          usage_amount: 35,
        },
        electricity_service: {
          key: 113,
          service_name: "",
          amount: 0,
          start_reading: 0,
          end_reading: 0,
          usage_amount: 0,
        },
      },
  ];

  const apartInfoTestData: ApartInfo = {
    key: 1,
    apartment_name: "The Apartment",
    apartment_address: "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
    apartment_contact: "02-123-4567",
    bank_name: "ไทยพาณิชย์",
    bank_account_name: "นายสมชาย ใจดี",
    bank_account_number: "123-4-56789-0",
    qr_code_path: "",
  };
const StatusBillTable: React.FC<StatusBillTableProps> = ({ data }) => {
    const distinctFloors = Array.from(new Set(data.map(item => item.floor))); // สร้างอาร์เรย์ของชั้นที่มีอยู่จริง
    const floorFilters = distinctFloors.map(floor => ({ text: `ชั้น ${floor}`, value: floor })); // สร้างรายการตัวเลือกสำหรับการกรอง
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [monthDate, setMonthDate] = useState<string>('');
    const [billData, setBillData] = useState<Bill[]>([]);
    const [apartInfo, setApartInfo] = useState<ApartInfo>(apartInfoTestData);
    const [submitRequset, setSubmitRequest] = useState<BillPaymentSubmit>({message: ""});
    const [rejectRequset, setRejectRequest] = useState<BillPaymentReject>({message: ""});
    const { apartId } = useParams();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);

        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<Bill> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}/${month.toString().padStart(2, '0')}`;
        // console.log(currentDate)
  const monthFormat = 'YYYY/MM';

  const handleChangeMonthDate = (values: any) => {
    console.log("values", values)
    setMonthDate(values.format(monthFormat));
    console.log(monthDate);
  }

    // const testSelectRow = (key: React.Key) => {
    //     const selectData = data.find(item => item.key === key);
    //     console.log('Selected Data: ', selectData);
    // }

    // const getId = (key: React.Key) => {
    //     const selectData = data.find(item => item.key === key);
    //     return selectData?.key;
    // }
    const [modalData, setModalData] = useState<Bill>({
        key: 0,
        floor_name: '',
        room_name: '',
        total_amount: 0,
        bill_status: '',
        tenant_name: '',
        tenant_address: '',
        evidence: '',
        payment_date: new Date(),
        payment_amount: 0,
        created_at: new Date(),
        bill_services: [
            {
                key: 0,
                service_name: '',
                amount: 0,
            },
        ],
        water_service: {
            key: 0,
            service_name: '',
            amount: 0,
            start_reading: 0,
            end_reading: 0,
            usage_amount: 0,
        },
        electricity_service: {
            key: 0,
            service_name: '',
            amount: 0,
            start_reading: 0,
            end_reading: 0,
            usage_amount: 0,
        },
    });

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    
    const showModal = (record : Bill) => {
        setModalData(record)
        console.log(isModalOpen1)
        if (record.bill_status === "ค้างชำระ"){
            setIsModalOpen1(true);
        }else if (record.bill_status === "รอตรวจสอบการชำระ" ) {
            setIsModalOpen2(true);
        }else if (record.bill_status === "ชำระค่าเช่าเรียบร้อยแล้ว" ) {
            setIsModalOpen3(true);
        }
    };
    
    const handleOk = () => {
        setIsModalOpen1(false)
        setIsModalOpen2(false)
        setIsModalOpen3(false)
        ;
    };
    
    const handleCancel = () => {
        console.log('cancel')
        setIsModalOpen1(false)
        setIsModalOpen2(false)
        setIsModalOpen3(false)
        ;
    };

    const handleSubmitBill = async () => {
        console.log("bill payment id", modalData.key)
        submitRequset.message = "ยืนยันการชำระเงิน"
        // setSubmitRequest({message: "ยืนยันการชำระเงิน"})
        try {
            const res = await ApartmentService.submitMessageBillPayment(Number(apartId), Number(modalData.key), submitRequset)
            console.log("res", res)
            if (res.status === 200){
                message.success('ยืนยันการชำระเงินสำเร็จ');
                setMonthDate(monthDate)
                const fetchBillData = async () => {
                    try {
                        const res = await ApartmentService.getBillPaymentList(Number(apartId), monthDate)
                        console.log("res", res)
                        setBillData(res.data)
                        setApartInfo(res.apart_info)
                    } catch (error) {
                        console.log("error", error)
                    }
                }
                fetchBillData()
            }
        }
        catch (error) {
            message.error('ยืนยันการชำระเงินไม่สำเร็จ')
            console.log("error", error)
        }

        setIsModalOpen2(false)
    }

    const handleRejectBill = async () => {
        console.log("bill payment id", modalData.key)
        rejectRequset.message = "ปฎิเสธการชำระเงิน"
        // setRejectRequest({message: "ปฎิเสธการชำระเงิน"})
        console.log("reject request", rejectRequset)
        try {
            const res = await ApartmentService.submitMessageBillPayment(Number(apartId), Number(modalData.key), rejectRequset)
            console.log("res", res)
            if (res.status === 200){
                message.success('ปฎิเสธการชำระเงินสำเร็จ');
                setMonthDate(monthDate)
                const fetchBillData = async () => {
                    try {
                        const res = await ApartmentService.getBillPaymentList(Number(apartId), monthDate)
                        console.log("res", res)
                        setBillData(res.data)
                        setApartInfo(res.apart_info)
                    } catch (error) {
                        console.log("error", error)
                    }
                }
                fetchBillData()
            }
        }
        catch (error) {
            message.error('ปฎิเสธการชำระเงินไม่สำเร็จ')
            console.log("error", error)
        }
        setIsModalOpen2(false)
    }

    function statusColor(status: string) {
        let color;
        //let letter;
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
        //return <span style={{ color }}>{letter}</span>;
    }
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
    

    const columns: TableColumnsType<Bill> = [
        {
            title: 'ชั้น',
            dataIndex: 'floor_name',
            key: 'floor_name',
            filters: floorFilters, // ใช้รายการตัวเลือกในการกรอง
            onFilter: (value, record: Bill) => {
                return record.floor_name === value;
            },
        },
        {
            title: 'ชื่อห้อง',
            dataIndex: 'room_name',
            key: 'room_name',
        },
        {
            title: 'ชื่อผู้อยู่อาศัย',
            dataIndex: 'tenant_name',
            key: 'tenant_name',
        },
        {
            title: 'ค่าเช่าห้อง',
            dataIndex: 'total_amount',
            key: 'total_amount',
        },
        {
            title: 'วันที่จ่ายบิล',
            dataIndex: 'due_date',
            key: 'due_date',
            render : (_, record :Bill) => (
                record.bill_status === "ค้างชำระ" ? "ยังไม่ได้จ่าย" : dayjs().format('DD/MM/YYYY')
            )
        },
        {
            title: 'สถานะการส่งใบแจ้งหนี้',
            dataIndex: 'bill_status',
            key: 'bill_status',
            filters: [
                { text: 'ค้างชำระ', value: 'ค้างชำระ' },
                { text: 'รอตรวจสอบการชำระ', value: 'รอตรวจสอบการชำระ' },
                { text: 'ชำระค่าเช่าเรียบร้อยแล้ว', value: 'ชำระค่าเช่าเรียบร้อยแล้ว' },
                // { text: 'available', value: 'available' },
                // { text: 'unavailable', value: 'unavailable' },
            ],
            onFilter: (value, record: Bill) => {
                return record.bill_status === value;
            },
            render: statusColor,
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record :Bill) => (
                <>
                   <Button onClick={() => {showModal(record)}}>
                        <FileOutlined />
                    </Button>
                </>
            ),
        }
    ];

    useEffect(() => {
        const fetchBillData = async () => {
            try {
                const res = await ApartmentService.getBillPaymentList(Number(apartId), monthDate)
                console.log("res", res)
                setBillData(res.data)
                setApartInfo(res.apart_info)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchBillData()

    }, [monthDate]);
    return (
        <ConfigProvider
            theme={{
                token: {
                    padding: 8,
                    
                },
                components: {
                    Modal: {
                        headerBg:"#ffffff"
                    },
                  },
            }}
        >   
            <DatePicker onChange={handleChangeMonthDate} defaultValue={dayjs(currentDate, monthFormat)} format={monthFormat} picker="month" style={{ marginBottom: '12px' }}/>

            <Modal title={(<div className='text-2xl text-center mb-5'>ใบเสร็จ</div>)} open={isModalOpen1} onOk={handleOk} onCancel={handleCancel} width={600}>
            
            <div className='flex  justify-start '>
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
                      <p className='font-bold text-right text-xl '>ใบแจ้งหนี้ห้อง {modalData.room_name}</p>
                      <div className='flex justify-end'>
                            <p className='font-bold text-right '>วันที่แจ้งหนี้: </p>
                            <p className='ml-1'>{dayjs(modalData.created_at).format('DD/MM/YYYY')}</p>
                      </div>
                      <div className='flex justify-end'>
                            <p className='font-bold text-right '>ชำระภายในวันที่: </p>
                            <p className='ml-1'>{dayjs(modalData.created_at).add(7, 'day').format('DD/MM/YYYY')}</p>
                      </div>
                      
                      {/* <p className='font-bold text-right '>ชำระภายในวันที่: xx-xx-xxxx</p> */}
                  </div>
              </div>
              <div className='flex  justify-start mt-10'>
                  <div className='w-1/2 mr-3'>
                          <div className='flex'>
                              <p className='font-bold'>ชื่อผู้เช่า</p> 
                              <p className='ml-1'> {modalData.tenant_name}</p>
                          </div>
  
                      <div className='flex'>
                          <p className='font-bold w-1/2'>ที่อยู่ผู้เช่า </p>
                          <p className='ml-1'> {modalData.tenant_address}</p>
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
                      <p className=''>ค่าน้ำ ( {modalData.water_service.start_reading} - {modalData.water_service.end_reading} ) = {modalData.water_service.usage_amount} หน่วย</p>
                      <p className=''>ค่าไฟ ( {modalData.electricity_service.start_reading} - {modalData.electricity_service.end_reading} ) = {modalData.electricity_service.usage_amount} หน่วย</p>
                      {modalData.bill_services.map((item, index) => (
                          (item.service_name === "Rent" ? null : <p>{item.service_name}</p>)
                      ))}
                  </div>
                  <div className='w-1/2 h-1'>
                      <p className=' text-right '>{modalData.bill_services[0].amount.toFixed(2)}</p>
                      <p className='text-right '>{modalData.water_service.amount.toFixed(2)}</p>
                      <p className='text-right '>{modalData.electricity_service.amount.toFixed(2)}</p>
                      {modalData.bill_services.map((item, index) => (
                          (item.service_name === "Rent" ? null : <p className='text-right '>{item.amount.toFixed(2)}</p>)
                      ))}
                  </div>
              </div>
              <div className='flex  justify-start mt-4 border-t border-black   border-b border-black py-3'>
                  <div className='w-1/2 mr-3'>
                      <p className='font-bold'>รวมทั้งสิ้น</p>
                  </div>
                  <div className='w-1/2 h-1'>
                      <p className='font-bold text-right '>{modalData.total_amount.toFixed(2)}</p>
                  </div>
              </div>
              <div className='flex  justify-start py-3'>
                  <div className='w-1/2 mr-3'>
                      {/* <p className='font-bold'>หมายเหตุ:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p> */}
  
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
                      <Image 
                        //   width={150}
                        //   height={150}
                          src={`http://localhost:3232/api/file-image?file=${apartInfo.qr_code_path}`}
                      />
                      </p>
                  </div>
              </div>
            </Modal>

            <Modal 
                title= {(<div className='flex justify-center text-2xl font-bold '>ตรวจสอบสถานะการจ่ายเงินห้อง {modalData.room_name} </div>)} 
                open={isModalOpen2} 
                onOk={handleSubmitBill} 
                onCancel={handleCancel} 
                okText="ยืนยันยอดเงิน" 
                cancelText="ปฎิเสธการชำระเงิน"
                cancelButtonProps={{ className: 'custom-cancel-button' }}
                footer={[
                    <Button key="reject" onClick={handleRejectBill} className="custom-cancel-button" >ปฎิเสธการชำระเงิน</Button>,
                    <Button key="ok" type="primary" onClick={handleSubmitBill}>ยืนยันยอดเงิน</Button>
                  ]}
                >
                <div className='flex text-lg'>
                    <p className='ml-12 '> วันเวลาที่โอนเงิน: </p>
                    <p className=' ml-1'>{dayjs(modalData.payment_date).format('DD/MM/YYYY') + " " + dayjs(modalData.payment_date).hour() + ":" + 
                    dayjs(modalData.payment_date).minute() + ":" + dayjs(modalData.payment_date).second()}</p>
                    {/* <p className=' ml-1'>{new Date(modalData.payment_date).getHours()}: {new Date(modalData.payment_date).getMinutes()}</p> */}
                </div>
                
                <div className='flex text-lg'>
                    <p className='ml-12   '> ยอดเงินทั้งหมด:  </p>
                    <p className=' ml-1'>{modalData.payment_amount.toFixed(2)}</p> 
                </div>
                <p className='flex justify-center mt-4 mb-10'>
                    <Image 
                        // width={350}
                        // height={450}
                        src={`http://localhost:3232/api/file-image?file=${modalData.evidence}`}
                    />
                </p>
            </Modal>



            <Modal title= {(<div className='flex justify-center text-2xl font-bold'>รายละเอียดการชำระเงินห้อง {modalData.room_name} </div>)} 
                open={isModalOpen3} 
                footer={null} // เซ็ตเป็น null เพื่อไม่ให้แสดง footer
                onCancel={handleCancel} 
                >
                <div className='flex text-lg'>
                    <p className='ml-12 '> วันเวลาที่โอนเงิน: </p>
                    <p className=' ml-1'>{dayjs(modalData.payment_date).format('DD/MM/YYYY') + " " + dayjs(modalData.payment_date).hour() + ":" + 
                    dayjs(modalData.payment_date).minute() + ":" + dayjs(modalData.payment_date).second()}</p>
                </div>
                
                <div className='flex text-lg'>
                    <p className='ml-12   '> ยอดเงินทั้งหมด:  </p>
                    <p className=' ml-1'>{modalData.payment_amount.toFixed(2)}</p> 
                </div>
                <p className='flex justify-center mt-4 mb-10'>
                    <Image 
                        width={350}
                        height={450}
                        src={`http://localhost:3232/api/file-image?file=${modalData.evidence}`}
                    />
                </p>
            </Modal>




            <div>
                <Table columns={columns} dataSource={billData} pagination={false} rowSelection={rowSelection} />
            </div>
        </ConfigProvider>
    );
};

export default StatusBillTable
