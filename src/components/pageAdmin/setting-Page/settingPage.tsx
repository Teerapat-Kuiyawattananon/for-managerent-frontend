import React, { useEffect, useState } from 'react';
// import ReportTable from './reportTable';
import SettingTable from './settingTable';
import { Button , Modal , Form, Input, } from 'antd';
// import './allAnnounce.css';
import ApartmentService from '../../../services/apartment.service'
import { useParams } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

interface ServiceData {
    key: string
    name: string
    amount: number
}

interface ServiceRequest {
    service_name: string
    amount: number
}

const data = [
    {
      key: '1',
      expressName: 'ค่าเน็ต',
      expressPermonth: 500,
      sentDate: new Date(),
      reportStatus: 'รอยืนยันปัญหา',
    },
    {
        key: '2',
        expressName: 'ค่าที่จอดรถ',
        expressPermonth: 200,
        sentDate: new Date(),
        reportStatus: 'ยืนยันปัญหา',
    },
    {
        key: '3',
        expressName: 'ค่าเคเบิ้ลทีวี',
        expressPermonth: 150,
        sentDate: new Date(),
        reportStatus: 'แก้ไขเสร็จสิ้นรอยืนยัน',
    },
    
    
  ];

const SettingPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceData, setServiceData] = useState<ServiceData[]>([]);
    const [serviceRequest, setServiceRequest] = useState<ServiceRequest>({
        service_name: '',
        amount: 0,
    });
    const { apartId } = useParams()
    const [form] = useForm()
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        console.log()
        form.submit()
        // setIsModalOpen(false);
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e target type",e.target.type)
        console.log("e target value", e.target.value)
        console.log("e target name", e.target.name)
        setServiceRequest({
            ...serviceRequest,
            [e.target.name] : 
                e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
        // setServiceRequest({
            
        // })
        console.log(serviceRequest)
      }
      const handleSumbit = async (values : any) => {
        try {
            console.log(values)
            // setServiceRequest({
            //     service_name: values['ชื่อค่าใช้จ่ายเพิ่มเติม'],
            //     amount: Number(values['ราคา/บาท'])
            // })
            console.log("service resquest", serviceRequest)
            if (serviceRequest.service_name === "" || serviceRequest.amount === 0) {
                console.log("empty")
                return
            }
            const res = await ApartmentService.addServiceDetail(Number(apartId), serviceRequest)
            console.log("res", res)
            if (res.status == 200) {
                window.location.reload()
                setIsModalOpen(false)
            }
        }
        catch (error) {
            console.log("error", error)
        }
      }
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      }
    
      useEffect(() => {
        const fectchData = async () => {
            const res = await ApartmentService.getServiceDetail(Number(apartId))
            setServiceData(res.data)
            console.log("res", res)
            console.log("Afer get", serviceData)
        }
        fectchData()
            .catch(console.error)
      }, [])

      return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px"}}>
                <Button type="primary" onClick={showModal} >
                    เพิ่มค่าใช้จ่าย
                </Button>
            </div>
            <Modal title="ค่าใช้จ่ายเพิ่มเติม" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} name='addService' onFinish={handleSumbit} onFinishFailed={onFinishFailed} >
                    <Form.Item name="ชื่อค่าใช้จ่ายเพิ่มเติม" label="ชื่อค่าใช้จ่ายเพิ่มเติม" rules={[{ required: true }]}>
                        <Input 
                            name='service_name'
                            type='text'
                            onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='ชื่อค่าใช้จ่ายเพิ่มเติม'
                        />
                    </Form.Item>
                    <Form.Item name="ราคา/บาท" label="ราคา/บาท" rules={[{ required: true }]}>
                        <Input 
                            name='amount'
                            type='number'
                            onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='ราคา/บาท'
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <SettingTable data={serviceData}/>
            {/* เนื้อหาหน้าหลัก */}
        </div>
    );
};

export default SettingPage;