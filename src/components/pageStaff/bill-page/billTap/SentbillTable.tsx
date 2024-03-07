import React, { useState } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Image , message, Popconfirm } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';



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


const SendBillTable: React.FC<SendBillTableProps> = ({ data }) => {
    const distinctFloors = Array.from(new Set(data.map(item => item.floor))); // สร้างอาร์เรย์ของชั้นที่มีอยู่จริง
    const floorFilters = distinctFloors.map(floor => ({ text: `ชั้น ${floor}`, value: floor })); // สร้างรายการตัวเลือกสำหรับการกรอง
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    // const { apartId, roomId } = useParams();
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);

        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<SendBillTableData> = {
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<ModalData>({
        key: '',
        floor: '',
        roomName: '',
        tenantName: '',
        roomRent: 0,
        dateSend: '',
        roomStatus: '',
    });

    const showModal = (record : SendBillTableData) => {
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
    

    const columns: TableColumnsType<SendBillTableData> = [
        {
            title: 'ชั้น',
            dataIndex: 'floor',
            key: 'floor',
            filters: floorFilters, // ใช้รายการตัวเลือกในการกรอง
            onFilter: (value, record: SendBillTableData) => {
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
            title: 'วันที่ส่งบิล',
            dataIndex: 'dateSend',
            key: 'dateSend',
        },
        {
            title: 'สถานะการส่งใบแจ้งหนี้',
            dataIndex: 'roomStatus',
            key: 'roomStatus',
            filters: [
                { text: 'ข้อมูลไม่ครบถ้วน', value: 'ข้อมูลไม่ครบถ้วน' },
                { text: 'รอการตรวจสอบข้อมูล', value: 'รอการตรวจสอบข้อมูล' },
                { text: 'ส่งใบแจ้งหนี้เรียบร้อย', value: 'ส่งใบแจ้งหนี้เรียบร้อย' },
                // { text: 'available', value: 'available' },
                // { text: 'unavailable', value: 'unavailable' },
            ],
            onFilter: (value, record: SendBillTableData) => {
                return record.roomStatus === value;
            },
            render: statusColor,
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record :SendBillTableData) => (
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
          <Modal title="ใบแจ้งหนี้" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
          <div className='flex  justify-start'>
                <div className='w-1/2 mr-3'>
                    <p className='font-bold text-lg'>ชื่อหอพัก </p>
                    <p className='font-bold'>ที่อยู่หอพัก </p>
                    <p className='font-bold'>โทรศัพท์</p>
                </div>
                <div className='w-1/2 h-1'>
                    <p className='font-bold text-right text-xl '>ใบแจ้งหนี้ห้อง {modalData.roomName}</p>
                    <p className='font-bold text-right '>วันที่แจ้งหนี้: {modalData.dateSend}</p>
                    <p className='font-bold text-right '>ชำระภายในวันที่: xx-xx-xxxx</p>
                </div>
            </div>
            <div className='flex  justify-start mt-10'>
                <div className='w-1/2 mr-3'>
                    <p className='font-bold'>ชื่อผู้เช่า xxxxxxxx-xxxxxxx</p>
                    <p className='font-bold'>ที่อยู่ผู้เช่า xxxxxxx</p>
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
                    <p className=''>ค่าน้ำ ( xxx - xxx ) = x หน่วย</p>
                    <p className=''>ค่าไฟ ( xxx - xxx ) = x หน่วย</p>
                    {[].map((item, index) => (
                        <p>{item}</p>
                    ))}
                </div>
                <div className='w-1/2 h-1'>
                    <p className=' text-right '>5000.00</p>
                    <p className='text-right '>5000.00</p>
                    <p className='text-right '>5000.00</p>
                    {[].map((item, index) => (
                        <p className='text-right '>{item}</p>
                    ))}
                </div>
            </div>
            <div className='flex  justify-start mt-4 border-t border-black   border-b border-black py-3'>
                <div className='w-1/2 mr-3'>
                    <p className='font-bold'>รวมทั้งสิ้น</p>
                </div>
                <div className='w-1/2 h-1'>
                    <p className='font-bold text-right '>15000.00</p>
                </div>
            </div>
            <div className='flex  justify-start py-3'>
                <div className='w-1/2 mr-3'>
                    {/* <p className='font-bold'>หมายเหตุ:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p> */}

                </div>
                <div className='w-1/2 '>
                    <p className='font-bold text-right '>ชื่อบัญชีธนาคาร ปปปปปปปป</p>
                    <p className='font-bold text-right '>ธนาคาร ปปปปปปปป</p>
                    <p className='font-bold text-right '>เลขบัญชี xxxxxxxxxxxxxxxx</p>
                    <p className='text-right '>
                    <Image 
                        width={150}
                        height={150}
                        src= "public\picture\Screenshot 2024-03-05 162701.png"
                    />
                    </p>
                </div>
            </div>
          </Modal>

 
          <div>
            <Table columns={columns} dataSource={data} pagination={false} rowSelection={rowSelection} />
          </div>
        </ConfigProvider>
      );
    };
    
    export default SendBillTable;


