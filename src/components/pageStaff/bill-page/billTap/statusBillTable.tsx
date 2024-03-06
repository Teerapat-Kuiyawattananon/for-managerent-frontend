import React, { useState } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Input , message, Popconfirm } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';



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

const StatusBillTable: React.FC<StatusBillTableProps> = ({ data }) => {
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
    
    const rowSelection: TableRowSelection<StatusBillTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const testSelectRow = (key: React.Key) => {
        const selectData = data.find(item => item.key === key);
        console.log('Selected Data: ', selectData);
    }

    const getId = (key: React.Key) => {
        const selectData = data.find(item => item.key === key);
        return selectData?.key;
    }

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
                {record.roomStatus === "ค้างชำระ" || record.roomStatus === "ค้างชำระ" && (
                        <Modal title="ใบเสร็จ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <span>
                                2
                            </span>
                        </Modal>
                    )}
                {record.roomStatus === "รอตรวจสอบการชำระ" || record.roomStatus === "รอตรวจสอบการชำระ" && (
                        <Modal title="ใบเสร็จ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                             <span>
                                3
                            </span>
                        </Modal>
                    )}
                {record.roomStatus === "ชำระค่าเช่าเรียบร้อยแล้ว" || record.roomStatus === "ชำระค่าเช่าเรียบร้อยแล้ว" && (
                        <Modal title="ใบเสร็จ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <span>
                                1
                            </span>
                        </Modal>
                    )}

                    <Button onClick={showModal}>
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
            }}
        >
            <div>
                <Table columns={columns} dataSource={data} pagination={false} rowSelection={rowSelection} />
            </div>
        </ConfigProvider>
    );
};

export default StatusBillTable
