import React, { useEffect, useState } from 'react';
import { Table, Button, ConfigProvider, message, Popconfirm } from 'antd';
import { FileOutlined ,DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Link, useParams } from 'react-router-dom';
import ProfileService from '../../../services/profile.service';
type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface PermissionTableProps {
    data: PermissionTableData[];
}

export interface PermissionTableData {
    key: React.Key;
    profile_name: string;
}

const PermissionTable: React.FC<PermissionTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableData, setTableData] = useState<PermissionTableData[]>([]);
    const { apartId } = useParams();
      const cancel = () => {
        console.log("Canceled");
        message.error('Click on No');
      };

      const onDeleteRow = (record: PermissionTableData) => {
        const newData = tableData.filter(item => item.key !== record.key);
        setTableData(newData);
        message.success('ลบหน้าที่ออกแล้ว');
        try {
            const res = ProfileService.deleteProfile(Number(apartId), Number(record.key));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
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
    
    useEffect(() => {
        // fetch data from API
        const fetchData = async () => {
            const res = await ProfileService.getProfileList(Number(apartId));
            console.log(res.data)
            setTableData(res.data);
            // setProfileData(res.data);
        }
        fetchData();
        
      }, []);

    const columns: TableColumnsType<PermissionTableData> = [
        {
            title: 'ชื่อตำแหน่ง',
            dataIndex: 'profile_name',
            key: 'profile_name',
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Link to= {`/apartment/${apartId}/permission/${record.key}/detail`}> 
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
