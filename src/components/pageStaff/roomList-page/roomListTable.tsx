import React, { useState } from 'react';
import { Table, Button, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface RoomListTableProps {
    data: RoomListTableData[];
}

export interface RoomListTableData {
    key: React.Key;
    floor: string;
    roomName: string;
    tenantName: string;
    roomRent: number;
    roomStatus: string;
}

const RoomListTable: React.FC<RoomListTableProps> = ({ data }) => {
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
    
    const rowSelection: TableRowSelection<RoomListTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function statusColor(status: string) {
        let color;
        switch (status) {
            case 'ไม่ว่าง':
                color = 'red';
                break;
            case 'ว่าง':
                color = 'green';
                break;
            default:
                color = 'inherit'; // Default color
        }
        return <span style={{ color }}>{status}</span>;
    }
    

    const columns: TableColumnsType<RoomListTableData> = [
        {
            title: 'ชั้น',
            dataIndex: 'floor',
            key: 'floor',
            filters: floorFilters, // ใช้รายการตัวเลือกในการกรอง
            onFilter: (value, record: RoomListTableData) => {
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
            title: 'สถานะห้องเช่า',
            dataIndex: 'roomStatus',
            key: 'roomStatus',
            filters: [
                { text: 'ว่าง', value: 'ว่าง' },
                { text: 'ไม่ว่าง', value: 'ไม่ว่าง' },
            ],
            onFilter: (value, record: RoomListTableData) => {
                return record.roomStatus === value;
            },
            render: statusColor,
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record : RoomListTableData) => (
                <>
                    {record.roomStatus === "ว่าง" && (
                        <Link to="/roomlist/add"> 
                            <Button>
                                <UserOutlined />
                            </Button>
                        </Link>
                    )}
                    {record.roomStatus === "ไม่ว่าง" && (
                        <Link to="/roomlist/detail">
                            <Button>
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

export default RoomListTable