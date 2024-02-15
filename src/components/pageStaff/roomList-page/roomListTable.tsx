import React, {useState} from 'react';
import { Table, Button, Tag, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];


interface RoomListTableProps {
    data: RoomListTableData[],
}

export interface RoomListTableData {
    key: React.Key;
    floor: string;
    roomName: string;
    tenantName: string;
    roomRent: number;
    roomStatus: string;
};

export const RoomListTable: React.FC<RoomListTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);

      // Show selected item.
      const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
      console.log('Selected Rows Data:', selectedRows);
    };

    const rowSelection: TableRowSelection<RoomListTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function statusColor(status: string) {
        let color;
        switch(status) {
            case 'ไม่ว่าง':
                color = 'red';
                break;
            case 'ว่าง':
                color = 'green';
                break;
            default: 
                return status
        }
        return <Tag color={color}>{status}</Tag>
    }


    const columns: TableColumnsType<RoomListTableData> = [
        {
            title: 'ชั้น',
            dataIndex: 'floor',
            key: 'floor',
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
                { text: 'ไม่ว่าง', value: 'ไม่ว่าง' }
            ],
            onFilter: (value, record: RoomListTableData) => {
                return record.roomStatus === value;
            },
            render: statusColor
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: () => (
                // record.RoomStatus === "ว่าง" 
                // <Link to=/add_roomList/>Edit</Link>

                // record.RoomStatus === "ไม่ว่าง"
                //  <Link to={`/add_roomList/${record.key}`}>Edit</Link>
                <Button>
                    Edit <PlusOutlined />
                </Button>
            ),
        },
    ];


    return (
        <ConfigProvider
        theme={{
            token: {
                padding: 8
            }
        }}
    >
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowSelection={rowSelection}
            />
        </div>
        </ConfigProvider>        
    );
};