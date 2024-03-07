import React, { useEffect, useState } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Image , message, Popconfirm, DatePicker } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps, CheckboxProps } from 'antd';
import dayjs from 'dayjs';
import ApartmentService from '../../../../services/apartment.service';
import { useParams } from 'react-router-dom';


type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface SendBillTableProps {
    data: SendBillTableData[];
}

export interface SendBillTableData {
    key: React.Key;
    floor: string;
    roomName: string;
    tenantName: string;
    roomRent: number;
    dateSend: string;
    roomStatus: string;
}

interface ModalData {
    key: React.Key;
    floor: string;
    roomName: string;
    tenantName: string;
    roomRent: number;
    dateSend: string;
    roomStatus: string;
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
    bill_services: Service[];
    water_service: WaterService;
    electricity_service: ElectricityService;
  }

  interface ApartInfo {
    key: number;
    apartment_name: string;
    apartment_address: string;
    apartment_contact: string;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
  }

  interface SendBillRequset {
    bill_id: React.Key[];
  }

  const billTestData: Bill[] = [
    {
      key: 1,
      floor_name: "1",
      room_name: "A101",
      total_amount: 4120,
      bill_status: "รอการตรวจสอบข้อมูล", // "Waiting for data verification" in Thai
      tenant_name: "John Doe",
      tenant_address: "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
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
      bill_status: "ข้อมูลไม่ครบถ้วน", // "Incomplete information" in Thai
      tenant_name: "Jane Doesdsf",
        tenant_address: "123/456 ถนน สุขุมวิท แขวง คลองเตย เขต คลองเตย กรุงเทพมหานคร 10110",
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
  };

const SendBillTable: React.FC<SendBillTableProps> = ({ data }) => {
    const distinctFloors = Array.from(new Set(data.map(item => item.floor))); // สร้างอาร์เรย์ของชั้นที่มีอยู่จริง
    const floorFilters = distinctFloors.map(floor => ({ text: `ชั้น ${floor}`, value: floor })); // สร้างรายการตัวเลือกสำหรับการกรอง
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [monthDate, setMonthDate] = useState<string>('');
    const [billData, setBillData] = useState<Bill[]>([]);
    const [sendBillRequest, setSendBillRequest] = useState<SendBillRequset>({
        bill_id: [],
    });
    // const [apartInfo, setApartInfo] = useState<ApartInfo>({
    //     key: 0,
    //     apartment_name: '',
    //     apartment_address: '',
    //     apartment_contact: '',
    // });
    const [apartInfo, setApartInfo] = useState<ApartInfo>(apartInfoTestData);
    const { apartId } = useParams();
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);

        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
        setSendBillRequest({
            bill_id: selectedRowKeys
        })
    };
    
    const rowSelection: TableRowSelection<Bill> = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: record.bill_status === 'ข้อมูลไม่ครบถ้วน' || record.bill_status === 'ส่งใบแจ้งหนี้เรียบร้อย',
        }),
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<Bill>({
        key: 0,
        floor_name: '',
        room_name: '',
        total_amount: 0,
        bill_status: '',
        tenant_name: '',
        tenant_address: '',
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

    const showModal = (record : Bill) => {
        setModalData(record)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function statusColor(status: string) {
        let color;
        //let letter;
        switch (status) {
            case 'ข้อมูลไม่ครบถ้วน':
                color = 'red';
                break;
            case 'รอการตรวจสอบข้อมูล':
                color = 'blue';
                break;
            case 'ส่งใบแจ้งหนี้เรียบร้อย':
                color = 'green';
                break;
            default:
                color = 'inherit'; // Default color
        }
        return <span style={{ color }}>{status}</span>;
        //return <span style={{ color }}>{letter}</span>;
    }
    

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
            title: 'ค่าใช้จ่ายทั้งหมด',
            dataIndex: 'total_amount',
            key: 'total_amount',
        },
        // {
        //     title: 'วันที่ส่งบิล',
        //     dataIndex: 'date_send',
        //     key: 'date_send',
        // },
        {
            title: 'สถานะการส่งใบแจ้งหนี้',
            dataIndex: 'bill_status',
            key: 'bill_status',
            filters: [
                { text: 'ข้อมูลไม่ครบถ้วน', value: 'ข้อมูลไม่ครบถ้วน' },
                { text: 'รอการตรวจสอบข้อมูล', value: 'รอการตรวจสอบข้อมูล' },
                { text: 'ส่งใบแจ้งหนี้เรียบร้อย', value: 'ส่งใบแจ้งหนี้เรียบร้อย' },
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

    const handleSendBill = async () => {
        sendBillRequest.bill_id = selectedRowKeys
        console.log(sendBillRequest)
        if (sendBillRequest.bill_id.length === 0) {
            message.error('กรุณาเลือกใบแจ้งหนี้ที่ต้องการส่ง');
            return;
        } 
        sendBillRequest.bill_id.forEach(function (item) {
            // find the bill data that matches the selected row key
            const bill = billData.find(bill => bill.key === item);
            if (bill?.bill_status === "ข้อมูลไม่ครบถ้วน") {
                message.error('ไม่สามารถส่งใบแจ้งหนี้ได้ เนื่องจากมีใบแจ้งนี้ที่ข้อมูลไม่ครบถ้วน');
                return;
            }
        })
        try {
            const res = await ApartmentService.sendBillList(Number(apartId) ,sendBillRequest)
            console.log("res", res)
            if (res.status === 200) {
                message.success('ส่งใบแจ้งหนี้เรียบร้อย');
                const fetchBillData = async () => {
                    try {
                        const res = await ApartmentService.getBillList(Number(apartId), monthDate)
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
            console.log("error", error)
        }
        
    }

    useEffect(() => {
        const fetchBillData = async () => {
            try {
                const res = await ApartmentService.getBillList(Number(apartId), monthDate)
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
            components: {
                Modal: {
                  headerBg: ""
                },
              },
            token: {
              padding: 8,
            },
            
          }}
        >
          <Modal title={(<div className='text-2xl text-center mb-5'>ใบแจ้งหนี้</div>)} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
            
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
                    {/* <p className='font-bold text-right '>วันที่แจ้งหนี้: </p> */}
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
                    {/* <Image 
                        width={150}
                        height={150}
                        src= "public\picture\Screenshot 2024-03-05 162701.png"
                    /> */}
                    </p>
                </div>
            </div>
          </Modal>
            <div className='flex mb-3'>
                <div className='w-1/2'>
                <DatePicker onChange={handleChangeMonthDate} defaultValue={dayjs(currentDate, monthFormat)} format={monthFormat} picker="month" style={{ marginBottom: '0px' }}/>
                </div>
                <div className='flex w-1/2 justify-end'>
                <Button type="primary" onClick={handleSendBill}>
                    ส่งใบแจ้งหนี้
                </Button>
                </div>
            </div>
        
          {/* <DatePicker onChange={handleChangeMonthDate} defaultValue={dayjs(currentDate, monthFormat)} format={monthFormat} picker="month" style={{ marginBottom: '0px' }}/>

          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: "10px"}}>

          <Button type="primary">
            ส่งใบแจ้งหนี้
          </Button>
        </div> */}
          <div>
            <Table columns={columns} dataSource={billData} pagination={false} rowSelection={rowSelection} />
          </div>
        </ConfigProvider>
      );
    };
    
    export default SendBillTable;


