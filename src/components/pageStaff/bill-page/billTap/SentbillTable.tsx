import React, { useState } from 'react';
import { Table, Button, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';
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
    roomStatus: string;
}

const SendBillTable: React.FC<SendBillTableProps> = ({ data }) => {
    const distinctFloors = Array.from(new Set(data.map(item => item.floor))); // สร้างอาร์เรย์ของชั้นที่มีอยู่จริง
    const floorFilters = distinctFloors.map(floor => ({ text: `ชั้น ${floor}`, value: floor })); // สร้างรายการตัวเลือกสำหรับการกรอง
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { apartId, roomId } = useParams();
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

    const testSelectRow = (key: React.Key) => {
        const selectData = data.find(item => item.key === key);
        console.log('Selected Data: ', selectData);
    }

    const getId = (key: React.Key) => {
        const selectData = data.find(item => item.key === key);
        return selectData?.key;
    }

    function statusColor(status: string) {
        let color;
        let letter;
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
        return <span style={{ color }}>{letter}</span>;
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
            render : (text) => (text === "" ? "ไม่มีผู้เช่า" : text)
        },
        {
            title: 'ค่าเช่าห้อง',
            dataIndex: 'roomRent',
            key: 'roomRent',
        },
        {
            title: 'วันที่ส่งบิล',
            dataIndex: 'roomRent',
            key: 'roomRent',
        },
        {
            title: 'สถานะการส่งใบแจ้งหนี้',
            dataIndex: 'roomStatus',
            key: 'roomStatus',
            filters: [
                { text: 'ข้อมูลไม่ครบถ้วน', value: 'available' },
                { text: 'รอการตรวจสอบข้อมูล', value: 'available1' },
                { text: 'ส่งใบแจ้งหนี้เรียบร้อย', value: 'un_available' },
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
                    {record.roomStatus === "ว่าง" || record.roomStatus === "available" && (
                        <Link to={`/apartment/${apartId}/roomlist/${getId(record.key)}/form`}> 
                            <Button onClick={() => testSelectRow(record.key)}>
                                <UserOutlined />
                            </Button>
                        </Link>
                    )}
                    {record.roomStatus === "ไม่ว่าง" || record.roomStatus === "un_available" && (
                        <Link to={`/apartment/${apartId}/roomlist/${getId(record.key)}/detail`}>
                            <Button onClick={() => testSelectRow(record.key)}>
                                <UserOutlined />
                            </Button>
                        </Link>
                    )}
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

export default SendBillTable


