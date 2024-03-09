import React, { useEffect, useState } from 'react';
import { Table, Button, ConfigProvider, message, Popconfirm } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import ProfileService from '../../../services/profile.service';
import { useParams } from 'react-router-dom';
type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface PermissionDetailTableProps {
    data: PermissionDetailTableData[];
    permissionData: PermissionDetailTableData[];
    setPermission: (permission: PermissionDetailTableData[]) => void;
    keyData: React.Key[];
}

export interface PermissionDetailTableData {
    key: React.Key;
    rolePermission: string;
}

const PermissionDetailTable: React.FC<PermissionDetailTableProps> = ({ data, permissionData, setPermission, keyData }) => {
    const { apartId, profileId } = useParams();
    const [tableData, setTableData] = useState<PermissionDetailTableData[]>(data);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(keyData);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
        console.log('Selected Rows Key: ', selectedRowKeys);
        permissionData = selectedRows;
        setPermission(selectedRows)
    };
    
    const rowSelection: TableRowSelection<PermissionDetailTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const getPermisionKeys = (profileData : any) => {
        const keys = [];
        for (let i = 0; i < data.length; i++) {
            if (profileData.permissions.includes(data[i].rolePermission)) {
                keys.push(data[i].key);
            }
        }
        console.log("keys", keys)
        return keys;
      }
    useEffect(() => {
        const fetchData = async () => {
            const res = await ProfileService.getProfileDetail(Number(apartId), Number(profileId));
            console.log(res.data)
            
            setSelectedRowKeys(getPermisionKeys(res.data));
            // setProfileData(res.data);
          }
          fetchData();
        // setSelectedRowKeys(keyData);
    }, []);
    
    const columns: TableColumnsType<PermissionDetailTableData> = [
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

export default PermissionDetailTable;
