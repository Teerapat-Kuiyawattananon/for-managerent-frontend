import React, { useState } from 'react';
import { Table, Button, ConfigProvider, message, Popconfirm } from 'antd';
import { FileOutlined ,DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface PermissionTableProps {
    data: PermissionTableData[];
}

export interface PermissionTableData {
    key: React.Key;
    roleName: string;
}

const PermissionTable: React.FC<PermissionTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableData, setTableData] = useState<PermissionTableData[]>(data);
    
      const cancel = () => {
        console.log("Canceled");
        message.error('Click on No');
      };

      const onDeleteRow = (record: PermissionTableData) => {
        const newData = tableData.filter(item => item.key !== record.key);
        setTableData(newData);
        message.success('ลบหน้าที่ออกแล้ว');
      };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<PermissionTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    

    const columns: TableColumnsType<PermissionTableData> = [
        {
            title: 'ชื่อตำแหน่ง',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Link to= "/permission/detail"> 
                        <Button>
                            <FileOutlined />
                         </Button>
                    </Link>
                    
                    <Popconfirm
                        title="ลบตำแหน่ง"
                        description="คุณแน่ใจที่จะลบตำแหน่งของคุณหรือไม่"
                        onConfirm={() => onDeleteRow(record)}
                        onCancel={cancel}
                        okText="ลบตำแหน่ง" 
                        cancelText="ยกเลิก"
                    >
                        <Button>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
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
                <Table columns={columns} dataSource={tableData} pagination={undefined} rowSelection={rowSelection} />
            </div>
        </ConfigProvider>
    );
};

export default PermissionTable;
