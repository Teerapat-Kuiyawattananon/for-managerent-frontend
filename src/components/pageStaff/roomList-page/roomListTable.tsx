import React, { useState } from 'react';
import { Table, Button, ConfigProvider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
    const { apartId, roomId } = useParams();
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
            case 'ไม่ว่าง':
                color = 'red';
                break;
            case 'ว่าง':
                color = 'green';
                break;
            case 'available':
                color = 'green';
                letter = 'ว่าง'
                break;
            case 'un_available':
                color = 'red';
                letter = 'ไม่ว่าง'
                break;
            default:
                color = 'inherit'; // Default color
        }
        return <span style={{ color }}>{letter}</span>;
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
            render : (text) => (text === "" ? "ไม่มีผู้เช่า" : text)
        },
        {
            title: 'ค่าเช่าห้อง',
            dataIndex: 'roomRent',
            key: 'roomRent',
            render : (text) => (text.toFixed(2))
        },
        {
            title: 'สถานะห้องเช่า',
            dataIndex: 'roomStatus',
            key: 'roomStatus',
            filters: [
                { text: 'ว่าง', value: 'available' },
                { text: 'ไม่ว่าง', value: 'un_available' },
                // { text: 'available', value: 'available' },
                // { text: 'unavailable', value: 'unavailable' },
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

export default RoomListTable