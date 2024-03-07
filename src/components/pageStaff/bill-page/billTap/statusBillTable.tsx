import React, { useState } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Image , message, Popconfirm, Input ,Upload} from 'antd';
import { FileOutlined , UploadOutlined} from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import './statusBillTable.css' 



type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface StatusBillTableProps {
    data: StatusBillTableData[];
}

export interface StatusBillTableData {
    key: React.Key;
    floor: string;
    roomName: string;
    tenantName: string;
    roomRent: number;
    datePay: string;
    roomStatus: string;
}

interface ModalData {
    key: React.Key;
    floor: string;
    roomName: string;
    tenantName: string;
    roomRent: number;
    datePay: string;
    roomStatus: string;
}

const StatusBillTable: React.FC<StatusBillTableProps> = ({ data }) => {
    const distinctFloors = Array.from(new Set(data.map(item => item.floor))); // สร้างอาร์เรย์ของชั้นที่มีอยู่จริง
    const floorFilters = distinctFloors.map(floor => ({ text: `ชั้น ${floor}`, value: floor })); // สร้างรายการตัวเลือกสำหรับการกรอง
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);

        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<StatusBillTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // const testSelectRow = (key: React.Key) => {
    //     const selectData = data.find(item => item.key === key);
    //     console.log('Selected Data: ', selectData);
    // }

    // const getId = (key: React.Key) => {
    //     const selectData = data.find(item => item.key === key);
    //     return selectData?.key;
    // }
    const [modalData, setModalData] = useState<ModalData>({
        key: '',
        floor: '',
        roomName: '',
        tenantName: '',
        roomRent: 0,
        datePay: '',
        roomStatus: '',
    });

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    
    const showModal = (record : StatusBillTableData) => {
        setModalData(record)
        console.log(isModalOpen1)
        if (record.roomStatus === "ค้างชำระ"){
            setIsModalOpen1(true);
        }else if (record.roomStatus === "รอตรวจสอบการชำระ" ) {
            setIsModalOpen2(true);
        }else if (record.roomStatus === "ชำระค่าเช่าเรียบร้อยแล้ว" ) {
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
        setIsModalOpen1(false)
        setIsModalOpen2(false)
        setIsModalOpen3(false)
        ;
    };

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
    

    const columns: TableColumnsType<StatusBillTableData> = [
        {
            title: 'ชั้น',
            dataIndex: 'floor',
            key: 'floor',
            filters: floorFilters, // ใช้รายการตัวเลือกในการกรอง
            onFilter: (value, record: StatusBillTableData) => {
                return record.floor === value;
            },
        },
        {
            title: 'ชื่อห้อง',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'ชื่อผู้อยู่อาศัย',
            dataIndex: 'tenantName',
            key: 'tenantName',
        },
        {
            title: 'ค่าเช่าห้อง',
            dataIndex: 'roomRent',
            key: 'roomRent',
        },
        {
            title: 'วันที่จ่ายบิล',
            dataIndex: 'datePay',
            key: 'datePay',
        },
        {
            title: 'สถานะการส่งใบแจ้งหนี้',
            dataIndex: 'roomStatus',
            key: 'roomStatus',
            filters: [
                { text: 'ค้างชำระ', value: 'ค้างชำระ' },
                { text: 'รอตรวจสอบการชำระ', value: 'รอตรวจสอบการชำระ' },
                { text: 'ชำระค่าเช่าเรียบร้อยแล้ว', value: 'ชำระค่าเช่าเรียบร้อยแล้ว' },
                // { text: 'available', value: 'available' },
                // { text: 'unavailable', value: 'unavailable' },
            ],
            onFilter: (value, record: StatusBillTableData) => {
                return record.roomStatus === value;
            },
            render: statusColor,
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record :StatusBillTableData) => (
                <>
                   <Button onClick={() => {showModal(record)}}>
                        <FileOutlined />
                    </Button>
                </>
            ),
        }
    ];

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
            <Modal title="ใบเสร็จ" visible={isModalOpen1} onOk={handleOk} onCancel={handleCancel} width={600}>
                <div className='flex justify-start'>
                    <div className='w-1/2 mr-3'>
                        <p className='font-bold text-lg'>ชื่อหอพัก</p>
                        <p className='font-bold'>ที่อยู่หอพัก</p>
                        <p className='font-bold'>โทรศัพท์</p>
                    </div>
                    <div className='w-1/2 h-1'>
                        <p className='font-bold text-right text-xl'>ใบแจ้งหนี้ห้อง {modalData.roomName}</p>
                        <p className='font-bold text-right'>วันที่แจ้งหนี้: {modalData.datePay}</p>
                        <p className='font-bold text-right'>ชำระภายในวันที่: xx-xx-xxxx</p>
                    </div>
                </div>
                <div className='flex justify-start mt-10'>
                    <div className='w-1/2 mr-3'>
                        <p className='font-bold'>ชื่อผู้เช่า xxxxxxxx-xxxxxxx</p>
                        <p className='font-bold'>ที่อยู่ผู้เช่า xxxxxxx</p>
                    </div>
                </div>
                <div className='flex justify-start mt-4 border-t border-black border-b border-black py-3'>
                    <div className='w-1/2 mr-3'>
                        <p className='font-bold'>รายการ</p>
                    </div>
                    <div className='w-1/2 h-1'>
                        <p className='font-bold text-right'>จำนวนเงิน</p>
                    </div>
                </div>
                <div className='flex justify-start py-3'>
                    <div className='w-1/2 mr-3'>
                        <p>ค่าเช่ารายเดือน</p>
                        <p>ค่าน้ำ ( xxx - xxx ) = x หน่วย</p>
                        <p>ค่าไฟ ( xxx - xxx ) = x หน่วย</p>
                        {[].map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                    <div className='w-1/2 h-1'>
                        <p className='text-right'>5000.00</p>
                        <p className='text-right'>5000.00</p>
                        <p className='text-right'>5000.00</p>
                        {[].map((item, index) => (
                            <p key={index} className='text-right'>{item}</p>
                        ))}
                    </div>
                </div>
                <div className='flex justify-start mt-4 border-t border-black border-b border-black py-3'>
                    <div className='w-1/2 mr-3'>
                        <p className='font-bold'>รวมทั้งสิ้น</p>
                    </div>
                    <div className='w-1/2 h-1'>
                        <p className='font-bold text-right'>15000.00</p>
                    </div>
                </div>
                <div className='flex justify-start py-3'>
                    <div className='w-1/2 mr-3'>
                        {/* <p className='font-bold'>หมายเหตุ:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p> */}
                    </div>
                    <div className='w-1/2'>
                        <p className='font-bold text-right'>ชื่อบัญชีธนาคาร ปปปปปปปป</p>
                        <p className=' text-right'> ปปปปปปปป</p>
                        <p className='font-bold text-right'>ธนาคาร ปปปปปปปป</p>
                        <p className='font-bold text-right'>เลขบัญชี xxxxxxxxxxxxxxxx</p>
                        <p className='text-right'>
                            <Image 
                                width={150}
                                height={150}
                                src= "public\picture\Screenshot 2024-03-05 162701.png"
                            />
                        </p>
                    </div>
                </div>
            </Modal>


            <Modal 
                title= {(<div className='flex justify-center text-2xl font-bold '>ตรวจสอบสถานะการจ่ายเงินห้อง {modalData.roomName} </div>)} 
                open={isModalOpen2} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                okText="ยืนยันยอดเงิน" 
                cancelText="ปฎิเสธการชำระเงิน"
                cancelButtonProps={{ className: 'custom-cancel-button' }}
                >
                <div className='flex text-lg'>
                    <p className='ml-12 '> วันเวลาที่โอนเงิน: </p>
                    <p className=' ml-1'> x</p>
                </div>
                
                <div className='flex text-lg'>
                    <p className='ml-12   '> ยอดเงินทั้งหมด:  </p>
                    <p className=' ml-1'> x</p> 
                </div>
                <p className='flex justify-center mt-4 mb-10'>
                    <Image 
                        width={350}
                        height={450}
                        src= "public\picture\Screenshot 2024-03-05 162701.png"
                    />
                </p>
            </Modal>



            <Modal title= {(<div className='flex justify-center text-2xl font-bold'>รายละเอียดการชำระเงินห้อง {modalData.roomName} </div>)} 
                open={isModalOpen3} 
                footer={null} // เซ็ตเป็น null เพื่อไม่ให้แสดง footer
                onCancel={handleCancel} 
                >
                <div className='flex text-lg'>
                    <p className='ml-12 '> วันเวลาที่โอนเงิน: </p>
                    <p className=' ml-1'> x</p>
                </div>
                
                <div className='flex text-lg'>
                    <p className='ml-12   '> ยอดเงินทั้งหมด:  </p>
                    <p className=' ml-1'> x</p> 
                </div>
                <p className='flex justify-center mt-4 mb-10'>
                    <Image 
                        width={350}
                        height={450}
                        src= "public\picture\Screenshot 2024-03-05 162701.png"
                    />
                </p>
            </Modal>




            <div>
                <Table columns={columns} dataSource={data} pagination={false} rowSelection={rowSelection} />
            </div>
        </ConfigProvider>
    );
};

export default StatusBillTable
