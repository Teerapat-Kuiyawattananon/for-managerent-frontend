import React, {useEffect, useState} from 'react'
import { Button, Form, Input,  List, Checkbox, message} from 'antd';
import PermissionDetailTable, { PermissionDetailTableData } from './permissionDetailTable';
import ProfileService from '../../../services/profile.service';
import { useNavigate, useParams } from 'react-router-dom';

  interface permissionDetailState {
    rolePermission: string

  }
  interface ProfileDetail {
    role: string;
    description: string;
    permissions: string;
  }

  interface PrefileRequest {
    role: string;
    description: string;
    permissions: string;
  }
  // interface PermissionData {
  //   key: React.Key;
  //   rolePermission: string;
  // }

const PermissionDetail : React.FC = () => {
    const { apartId, profileId } = useParams()
    const [form] = Form.useForm();
    const nevigate = useNavigate()
    const [formData, setFormData] = useState<permissionDetailState>({
        rolePermission: '',
      })
    const [profileData, setProfileData] = useState<ProfileDetail>({
      role: '',
      description: '',
      permissions: '',
    })
    const [keyData, setKeyData] = useState<React.Key[]>([]);
    const [requestData, setRequestData] = useState<PrefileRequest>({
        role: '',
        description: '',
        permissions: '',
      })
    const [permission, setPermission] = useState<PermissionDetailTableData[]>([
      {
        key: '1',
        rolePermission: 'หน้าหลัก',
      }
    ]);

      const data = [
        {
            key: 1,
            rolePermission: 'หน้าหลัก',
        },
        {
            key:  2,
            rolePermission: 'รายการห้องเช่า',
        },
        {
            key: 3,
            rolePermission: 'ใบแจ้งหนี้',
        },
        {
          key: 4,
          rolePermission: 'กรอกค่าน้ำค่าไฟ',
        },
        {
          key: 5,
          rolePermission: 'กำหนดค่าใช้จ่ายเพิ่มเติม',
        },
        {
          key: 6,
          rolePermission: 'ประกาศทั้งหมด',
        },
        {
          key: 7,
          rolePermission: 'ใบแจ้งหนี้ของคุณ',
        },
        {
          key: 8,
          rolePermission: 'ประกาศของคุณ',
        },
        {
          key: 9,
          rolePermission: 'หอพักของคุณ',
        },
        {
          key: 10,
          rolePermission: 'การจัดการผู้ใช้',
        },
        {
          key: 11,
          rolePermission: 'ตั้งค่าสิทธิ์การเข้าใช้งาน',
        },
      ];
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
      const formRef = React.useRef();
    
      const handleChange = (e: any) => {
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.type === "number" ? Number(e.target.value) : e.target.value
        })
      }
    
      useEffect(() => {
        // fetch data from API
        const fetchData = async () => {
          const res = await ProfileService.getProfileDetail(Number(apartId), Number(profileId));
          console.log(res.data)
          setProfileData(res.data);
          form.resetFields();
        setKeyData(getPermisionKeys(res.data));
          // setProfileData(res.data);
        }
        fetchData();
        
      }, []);
      
      const onFinish = async (values: any) => {
        // console.log('Success:', values);
        // console.log('Success:', formData);
        // console.log("permission", permission)
        let permissionStr = permission.map((item) => item.rolePermission).join(',')
        console.log("permissionStr", permissionStr)
        setRequestData({
          role: values['ชื่อตำแหน่ง'],
          description: values['คำอธิบายตำแหน่ง'],
          permissions: permissionStr,
        })
        requestData.description = values['คำอธิบายตำแหน่ง']
        requestData.role = values['ชื่อตำแหน่ง']
        requestData.permissions = permissionStr
        console.log("requestData", requestData)
          
          try {
            const res = await ProfileService.updateProfile(Number(apartId), Number(profileId), requestData)
            console.log(res)
            if (res.status === 200) {
              message.success('แก้ไขตำแหน่งเรียบร้อยแล้ว');
              nevigate(`/apartment/${apartId}/permission`)
            }
          }
          catch (error) {
            console.log(error)
            message.error('แก้ไขตำแหน่งไม่สำเร็จ');
        }
      }
    

    
     const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      console.log('Failed:', formData);
      message.error('แก้ไขตำแหน่งไม่สำเร็จ');
    }
    
      return (
        <Form  
        name="validateOnly" 
        layout="vertical" 
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <div className='flex  justify-start'>
            <div className='w-1/2 mr-3'>
            <div className='mr-3'>
                <Form.Item name="ชื่อตำแหน่ง" label="ชื่อตำแหน่ง" rules={[{ required: true }]}>
                    <Input 
                        name='ชื่อตำแหน่ง'
                        onChange={handleChange}
                        defaultValue={profileData.role}
                        style={{
                        width: '85%',
                        }} placeholder='ชื่อตำแหน่ง'/>
                </Form.Item>
            </div>
            <div className=' mr-3'>
                <Form.Item name="คำอธิบายตำแหน่ง" label="คำอธิบายตำแหน่ง" rules={[{ required: false }]}>
                    <Input.TextArea 
                        name='คำอธิบายตำแหน่ง'
                        onChange={handleChange}
                        defaultValue={profileData.description}
                        placeholder='คำอธิบายตำแหน่ง'
                        style={{
                        width: '85%',
                    }} />
                </Form.Item>
            </div>
            </div>
            <div className='w-1/2' >
              <PermissionDetailTable data={data} permissionData={permission} setPermission={setPermission} keyData={keyData}/>
            </div>
          </div>

          <div className=' justify-start mt4'>
            {/* <div className='w-1/2 mr-3'>
                <Form.Item name="คำอธิบายตำแหน่ง" label="คำอธิบายตำแหน่ง" rules={[{ required: true }]}>
                    <Input.TextArea 
                        name='คำอธิบายตำแหน่ง'
                        onChange={handleChange}
                        placeholder='คำอธิบายตำแหน่ง'
                        style={{
                        width: '85%',
                    }} />
                </Form.Item>
            </div> */}
          </div>
          
          <div className='flex justify-between' style={{ marginTop: "30px" }}>
              {/* ปุ่มย้อนกลับด้านล่างซ้าย */}
                <Button type="primary">
                   ย้อนกลับ
                </Button>
              {/* ปุ่มแก้ไข/บันทึกด้านล่างขวา */}
              <Button type="default" htmlType='submit' style={{ marginBottom: '10px', marginRight: '10px' }}>
                 บันทึก
              </Button>
            </div>
      </Form>
      )
    }
  
  export default PermissionDetail;
