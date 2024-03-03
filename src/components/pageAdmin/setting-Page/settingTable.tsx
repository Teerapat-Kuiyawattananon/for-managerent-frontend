import React, { useState } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Input , message, Popconfirm} from 'antd';
import { FileOutlined ,DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface SettingTableProps {
    data: SettingTableData[];
}

export interface SettingTableData {
    key: React.Key;
    expressName: string;
    expressPermonth: number;
}

const SettingTable: React.FC<SettingTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [tableData, setTableData] = useState<SettingTableData[]>(data);
    
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
    
    
      const cancel = () => {
        console.log("Canceled");
        message.error('Click on No');
      };

      const onDeleteRow = (record: SettingTableData) => {
        const newData = tableData.filter(item => item.key !== record.key);
        setTableData(newData);
      };


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<SettingTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    
    
    
    const columns: TableColumnsType<SettingTableData> = [
        {
            title: 'ชื่อค่าใช้จ่ายเพิ่มเติม',
            dataIndex: 'expressName',
            key: 'expressName',
        },
        {
            title: 'ค่าใช้จ่ายต่อเดือน',
            dataIndex: 'expressPermonth',
            key: 'expressPermonth',
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Modal title="ค่าใช้จ่ายเพิ่มเติม" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form>
                            <Form.Item name="ชื่อค่าใช้จ่ายเพิ่มเติม" label="ชื่อค่าใช้จ่ายเพิ่มเติม" rules={[{ required: true }]}>
                                <Input 
                                name='ชื่อค่าใช้จ่ายเพิ่มเติม'
                                // onChange={handleChange}
                                style={{ width: '100%' }} 
                                placeholder='ชื่อค่าใช้จ่ายเพิ่มเติม'
                                />
                            </Form.Item>
                            <Form.Item name="ราคา/บาท" label="ราคา/บาท" rules={[{ required: true }]}>
                                <Input 
                                    name='ราคา/บาท'
                                    // onChange={handleChange}
                                    style={{ width: '100%' }} 
                                    placeholder='ราคา/บาท'
                                />
                            </Form.Item>
                         </Form>
                    </Modal>
                    <Button onClick={showModal}>
                        <FileOutlined />
                    </Button>
                    <Popconfirm
                        title="ลบค่าใช้จ่ายเพิ่มเติม"
                        description="คุณแน่ใจที่จะลบค่าใช้จ่ายของคุณหรือไม่"
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

export default SettingTable;
