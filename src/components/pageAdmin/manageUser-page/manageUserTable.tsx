import React, { useEffect, useState } from 'react';
import { Table, Button, ConfigProvider, message, Popconfirm} from 'antd';
import { FileOutlined ,DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import ProfileService from '../../../services/profile.service';
import { Link, useParams } from 'react-router-dom';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface ManageUserTableProps {
    data: ManageUserTableData[];
}

export interface ManageUserTableData {
    key: React.Key;
    role_name: string;
    room_name: string;
    name: string;
    email: string;
}

const ManageUserTable: React.FC<ManageUserTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableData, setTableData] = useState<ManageUserTableData[]>([]);
    const { apartId } = useParams();
const cancel = () => {
    console.log("Canceled");
  };

  const onDeleteRow = (record: ManageUserTableData) => {
    const newData = tableData.filter(item => item.key !== record.key);
    setTableData(newData);
    message.success('ลบผู้ใช้ออกแล้ว');
  };

const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    // Show selected item.
    const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
    console.log('Selected Rows Data: ', selectedRows);
};

const rowSelection: TableRowSelection<ManageUserTableData> = {
    selectedRowKeys,
    onChange: onSelectChange,
};

    useEffect(() => {
       const fetchData = async () => {
        const res = await ProfileService.getProfileUserList(Number(apartId))
        console.log(res)
        setTableData(res.data)
       }
       fetchData()
    }, []);

    
    const columns: TableColumnsType<ManageUserTableData> = [
        {
            title: 'ชื่อตำแหน่ง',
            dataIndex: 'role_name',
            key: 'role_name',
        },
        {
            title: 'ห้อง',
            dataIndex: 'room_name',
            key: 'room_name',
        },
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'อีเมล',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                  <Link to= {`/apartment/${apartId}/manageUser/${record.key}/detail`}> 
                        <Button>
                            <FileOutlined />
                         </Button>
                    </Link>

                    <Popconfirm
                        title="ลบผู้ใช้"
                        description="คุณแน่ใจที่จะลบผู้ใช้หรือไม่"
                        onConfirm={() => onDeleteRow(record)}
                        onCancel={cancel}
                        okText="ลบผู้ใช้"
                        cancelText="ยกเลิก"
                    >
                        {/* <Button>
                            <DeleteOutlined />
                        </Button> */}
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

export default ManageUserTable;
