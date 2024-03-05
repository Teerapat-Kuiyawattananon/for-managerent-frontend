import React, { useEffect, useState } from 'react';
import { Table, Button, ConfigProvider, Form , Modal ,Input , message, Popconfirm} from 'antd';
import { FileOutlined ,DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Link, useParams } from 'react-router-dom';
import ApartmentService from '../../../services/apartment.service'

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface ServiceTableProps {
    data: ServiceTableData[];
}

export interface ServiceTableData {
    key: React.Key;
    name: string;
    amount: number;
}

interface ModalData {
    key: React.Key;
    name: string;
    amount: number;
}

const SettingTable: React.FC<ServiceTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [form] = useForm()
    // const [tableData, setTableData] = useState<ServiceTableData[]>(data);
    const [modalData, setModalData] = useState<ModalData>({
        key: '',
        name: '',
        amount: 0
    });
    const [editData, setEditData] = useState<ServiceTableData>({
        key: '',
        name: '',
        amount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { apartId } = useParams();
    const showModal = (record : ServiceTableData) => {
        // console.log("before modal", modalData)
        console.log("form before", form.getFieldValue('ชื่อค่าใช้จ่ายเพิ่มเติม'))
        // form.resetFields()
        console.log("form after", form.getFieldValue('ชื่อค่าใช้จ่ายเพิ่มเติม'))
        console.log(record)
        setModalData(record)
        // console.log("after modal", modalData)
        setEditData({
            key: record.key,
            name: record.name,
            amount: record.amount
        })
        console.log("editData", editData)
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
        console.log("modal", modalData)
      };
    
      const handleCancel =  () => {
        // setModalData({
        //     name: '',
        //     amount: 0,
        //     key: ''
        // })
        // form.resetFields()
        setIsModalOpen(false);
        setModalData({
            name: '',
            amount: 0,
            key: ''
        })
        console.log("modal", modalData)
      };

      useEffect(() => {
        console.log("Modal in Effect", modalData)
        form.resetFields()
      }, [modalData, data])
    
    
      const cancel = () => {
        console.log("Canceled");
        message.error('Click on No');
      };

      const onDeleteRow = async (record: ServiceTableData) => {
        // const newData = data.filter(item => item.key !== record.key);
        // setTableData(newData);
        console.log("record", record)
        try {
            const res = await ApartmentService.deleteServiceDetail(Number(apartId), Number(record.key))
            console.log("res", res)
            if (res.status == 200) {
                window.location.reload()
            }
        }
        catch (error) {
            console.log("error", error)
        }
      };


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<ServiceTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e value", e.target.value)
        setModalData({
            ...modalData,
            [e.target.name] : 
                e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e value", e.target.value)
        setEditData({
            ...editData,
            [e.target.name] : 
                e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
    }

    // const createModal = (data : any) => {
    //     return (
    //         <Modal title="ค่าใช้จ่ายเพิ่มเติม" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    //                     <Form form={form}>
    //                         <Form.Item initialValue={modalData?.name} name="ชื่อค่าใช้จ่ายเพิ่มเติม" label="ชื่อค่าใช้จ่ายเพิ่มเติม" rules={[{ required: true }]}>
    //                             <Input 
    //                             name='ชื่อค่าใช้จ่ายเพิ่มเติม'
                                
    //                             // onChange={handleChange}
    //                             style={{ width: '100%' }} 
    //                             placeholder='ชื่อค่าใช้จ่ายเพิ่มเติม'
    //                             />
    //                         </Form.Item>
    //                         <Form.Item initialValue={modalData?.amount} name="ราคา/บาท" label="ราคา/บาท" rules={[{ required: true }]}>
    //                             <Input 
    //                                 name='ราคา/บาท'
        
    //                                 // onChange={handleChange}
    //                                 style={{ width: '100%' }} 
    //                                 placeholder='ราคา/บาท'
    //                             />
    //                         </Form.Item>
    //                      </Form>
    //         </Modal>
    //     )
    // }
    
    const columns: TableColumnsType<ServiceTableData> = [
        {
            title: 'ชื่อค่าใช้จ่ายเพิ่มเติม',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ค่าใช้จ่ายต่อเดือน',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record : ServiceTableData) => (
                <>
                    {/* <Modal title="ค่าใช้จ่ายเพิ่มเติม" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form >
                            <Form.Item initialValue={record.name} name="ชื่อค่าใช้จ่ายเพิ่มเติม" label="ชื่อค่าใช้จ่ายเพิ่มเติม" rules={[{ required: true }]}>
                                <Input 
                                name='ชื่อค่าใช้จ่ายเพิ่มเติม'
                                defaultValue={record.name}
                                // onChange={handleChange}
                                style={{ width: '100%' }} 
                                placeholder='ชื่อค่าใช้จ่ายเพิ่มเติม'
                                />
                                <Button onClick={() => { console.log("record", record) }}>TTT</Button>
                            </Form.Item>
                            <Form.Item initialValue={record.amount} name="ราคา/บาท" label="ราคา/บาท" rules={[{ required: true }]}>
                                <Input 
                                    name='ราคา/บาท'
                                    defaultValue={record.amount}
                                    // onChange={handleChange}
                                    style={{ width: '100%' }} 
                                    placeholder='ราคา/บาท'
                                />
                            </Form.Item>
                         </Form>
                    </Modal> */}
                    {/* <Button onClick={() => {showModal(record)}}>
                        <FileOutlined />
                    </Button> */}
                   <Link to={`/apartment/${apartId}/services/${Number(record.key)}`} >
                        <Button >
                        <UserAddOutlined />
                    </Button>
                    </Link>
                    <Popconfirm
                        title="ลบค่าใช้จ่ายเพิ่มเติม"
                        description="คุณแน่ใจที่จะลบค่าใช้จ่ายของคุณหรือไม่"
                        onConfirm={() => onDeleteRow(record)}
                        onCancel={cancel}
                        okText="ลบค่าใช้จ่ายเพิ่มเติม"
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
        <>
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
       
        <Modal title="ค่าใช้จ่ายเพิ่มเติม" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form form={form}>
                            <Form.Item name="ชื่อค่าใช้จ่ายเพิ่มเติม" label="ชื่อค่าใช้จ่ายเพิ่มเติม" rules={[{ required: true }]}>
                            <Input 
                                name='name'
                                defaultValue={editData?.name}
                                onChange={handleEditChange}
                                style={{ width: '100%' }} 
                                placeholder='ชื่อค่าใช้จ่ายเพิ่มเติม'
                                />
                            </Form.Item>
                            <Form.Item name="ราคา/บาท" label="ราคา/บาท" rules={[{ required: true }]}>
                                <Input 
                                    name='ราคา/บาท'
                                    defaultValue={editData?.amount}
                                    onChange={handleEditChange}
                                    style={{ width: '100%' }} 
                                    placeholder='ราคา/บาท'
                                />
                            </Form.Item>
                         </Form>
            </Modal>
        </>
        
    );
};

export default SettingTable;
