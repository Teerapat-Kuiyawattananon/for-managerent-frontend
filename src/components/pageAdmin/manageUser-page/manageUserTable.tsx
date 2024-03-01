import React, { useState } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Input} from 'antd';
import { FileOutlined ,DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import './manageUserTable.css';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface manageUserTableProps {
    data: manageUserTableData[];
}

export interface manageUserTableData {
    key: React.Key;
    roleName: string;
    roomName: string;
    name: string;
    email: string;
}

const ManageUserTable: React.FC<manageUserTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableData, setTableData] = useState<manageUserTableData[]>(data);
    
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
    

    const onDeleteRow = (record: manageUserTableData) => {
        const newData = tableData.filter(item => item.key !== record.key);
        // Update data state to re-render the table without the deleted row
        setTableData(newData);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<manageUserTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    

    
    const columns: TableColumnsType<manageUserTableData> = [
        {
            title: 'ชื่อตำแหน่ง',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'ห้อง',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name',
            key: 'name',
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
            align: 'left',
            render: (_, record) => (
                <div className="action-buttons">
                  <Modal title="ค่าใช้จ่ายเพิ่มเติม" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form>
                      <Form.Item name="ชื่อค่าใช้จ่ายเพิ่มเติม" label="ชื่อค่าใช้จ่ายเพิ่มเติม" rules={[{ required: true }]}>
                        <Input 
                          name='ชื่อค่าใช้จ่ายเพิ่มเติม'
                          style={{ width: '100%' }} 
                          placeholder='ชื่อค่าใช้จ่ายเพิ่มเติม'
                        />
                      </Form.Item>
                      <Form.Item name="ราคา/บาท" label="ราคา/บาท" rules={[{ required: true }]}>
                        <Input 
                          name='ราคา/บาท'
                          style={{ width: '100%' }} 
                          placeholder='ราคา/บาท'
                        />
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Button onClick={showModal}>
                    <FileOutlined />
                  </Button>
                  <Button onClick={() => onDeleteRow(record)}>
                    <DeleteOutlined />
                  </Button>
                </div>
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
                <Table columns={columns} dataSource={data} pagination={undefined} rowSelection={rowSelection} />
            </div>
        </ConfigProvider>
    );
};

export default ManageUserTable;
