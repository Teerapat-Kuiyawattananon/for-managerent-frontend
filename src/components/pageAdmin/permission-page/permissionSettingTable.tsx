import React, { useState } from 'react';
import { Table, Button, ConfigProvider, message, Popconfirm } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface PermissionSettingTableProps {
    data: PermissionSettingTableData[];
    permissionData: PermissionSettingTableData[];
    setPermission: (permission: PermissionSettingTableData[]) => void;
}

export interface PermissionSettingTableData {
    key: React.Key;
    rolePermission: string;
}

const PermissionSettingTable: React.FC<PermissionSettingTableProps> = ({ data, permissionData, setPermission }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableData, setTableData] = useState<PermissionSettingTableData[]>(data);
    

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
        console.log('Selected Rows Key: ', selectedRowKeys);
        permissionData = selectedRows;
        setPermission(selectedRows)
        console.log('Selected Rows Data Permission: ', permissionData);
    };
    
    const rowSelection: TableRowSelection<PermissionSettingTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    

    const columns: TableColumnsType<PermissionSettingTableData> = [
        {
            title: 'ตำแหน่งการเข้าถึง',
            dataIndex: 'rolePermission',
            key: 'rolePermission',
        },
       
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
                <Table columns={columns} dataSource={tableData} pagination={false} rowSelection={rowSelection} />
            </div>
        </ConfigProvider>
    );
};

export default PermissionSettingTable;
