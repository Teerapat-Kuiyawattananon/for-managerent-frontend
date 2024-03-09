import React, { useEffect, useState }  from 'react';
import { NotificationOutlined , UploadOutlined } from '@ant-design/icons';
import { Button , Modal , Form, Input, Upload, Image, message} from 'antd';
import './annoucePage.css';
import { useParams } from 'react-router-dom';
import ApartmentService from '../../../services/apartment.service';
import authHeader from '../../../services/auth-header';
import dayjs from 'dayjs';

const dataTest = [
    {
      id: 1,
      title: 'หัวข้อประกาศ',
      description: 'คำอธิบาย',
      images: [{
        id: 1,
        file_paht: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
      },
      {
        id: 2,
        file_paht: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
      }],
    },
    {
      id: 2,
      title: 'หัวข้อประกาศ 2',
      description: 'คำอธิบาย 2',
      images: [{
        id: 1,
        file_paht: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
      },
      {
        id: 2,
        file_paht: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
      }],
    },
    {
      id: 3,
      title: 'หัวข้อประกาศ 3',
      description: 'คำอธิบาย 3',
      images: [{
        id: 1,
        file_paht: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
      },
      {
        id: 2,
        file_paht: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
      }]
    },
  ]
  interface Announcement {
    id: number;
    title: string;
    description: string;
    role :string;
    author_name: string;
    created_at: string;
    images: ImageFile[];
  }
  
  interface ImageFile {
    id: number;
    file_path: string;
  }
const AnnoucePage: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<Announcement[]>([]);
    const [fileList, setFileList] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { apartId } = useParams();

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = async (values : any) => {
        form.submit();
        console.log("auth")
        const postData = {
            title: form.getFieldValue('หัวข้อประกาศ'),
            description: form.getFieldValue('คำอธิบาย'),
            status: "Announcement",
            user_id: 0,
        }
        // console.log("file", fileList)
        if (postData.title === "" || postData.title === undefined || postData.title === null) {
            return
        }
        if (postData.description === "" || postData.description === undefined || postData.description === null) {
            return
        }
        const formData = new FormData();
        formData.append('title', postData.title)
        formData.append('description', postData.description)
        for (let i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i].originFileObj)
        }
        try {
            const res = await ApartmentService.postAnnounce(Number(apartId), formData)
            console.log('res', res)
            if (res.status === 200) {
                // console.log('Success:', postData);
                message.success('เพิ่มประกาศสำเร็จ');
                // fecch data
                const fetchData = async () => {
                    const resData = await ApartmentService.getAnnounce(Number(apartId))
                    console.log("resData", resData)
                    setData(resData.data)
                    form.resetFields()
                }
                fetchData()
                setIsModalOpen(false);
            }
        }
        catch (error) {
            message.error('เพิ่มประกาศไม่สำเร็จ');
            console.log('Failed:', postData);
        }
        
        // setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const handlerDelete = async (id: number) => {
        console.log("id", id)
        try {
            const res = await ApartmentService.deleteAnnounce(Number(apartId), id)
            console.log('res', res)
            if (res.status === 200) {
                message.success('ลบประกาศสำเร็จ');
                const fetchData = async () => {
                    const resData = await ApartmentService.getAnnounce(Number(apartId))
                    console.log("resData", resData)
                    setData(resData.data)
                    form.resetFields()
                }
                fetchData()
            } 
        }
        catch (error) {
            message.error('ลบประกาศไม่สำเร็จ');
        }   
      }
    
      const normFile = (e: any) => {
        console.log('Upload event:', e);
        console.log("file list", e?.fileList)
        setFileList(e?.fileList)
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };

      useEffect(() => {
        // โค้ดสำหรับดึงข้อมูลประกาศจาก API
        const fetchData = async () => {
            const resData = await ApartmentService.getAnnounce(Number(apartId))
            console.log("resData", resData)
            setData(resData.data)
            form.resetFields()
        }
        fetchData()
        // form.resetFields()
        console.log("formData", data)
      }, []);
    return (
        <div>
            <div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className='text-xl '><NotificationOutlined /> ข้อมูลข่าวสาร</span>
                <Button type="primary" onClick={showModal}>
                    เพิ่มประกาศ
                </Button>
                <Modal title="เพิ่มประกาศ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                form={form}>
                    <Form.Item name="หัวข้อประกาศ" label="หัวข้อประกาศ" rules={[{ required: true }]}>
                        <Input
                            name='หัวข้อประกาศ'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='หัวข้อประกาศ'
                        />
                    </Form.Item>
                    <Form.Item name="คำอธิบาย" label="คำอธิบาย" rules={[{ required: true }]}>
                        <Input.TextArea
                            name='คำอธิบาย'
                            // onChange={handleChange}
                            style={{ width: '100%' }} 
                         placeholder='คำอธิบาย'
                        />
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        label="รูปภาพของคุณ"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
                </Modal>
            </div>
            <div className="dividerUnder"> <style> </style> </div>

            {data.length === 0 ? 
            <div className="dataContainer">
                <h2>ไม่มีประกาศในขณะนี้</h2>
                <p></p>
                <div className="imageContainer">
                    <p>คำอธิบาย</p>
                    {/* รูปภาพจะอยู่ในสี่เหลี่ยมผืนผ้า */}
                </div>
            </div>
            : 
            null}

            {data.map((data, indexPost) => {
                    return (
                        <div className="dataContainer" key={indexPost}>
                            <div className='flex border-b border-violet-700 py-5 mb-5 '>
                                <div className='w-1/2'>
                                    <p className='text-lg'>ตำแหน่ง: {data.role} </p>
                                    <p className=''>ชื่อผู้ประกาศ: {data.author_name}</p>
                                    <p className=''>วันที่ประกาศ: {dayjs(data.created_at).format('DD/MM/YYYY')}</p>
                                </div>
                            <div className='flex w-1/2 justify-end '>
                                <Button className='' danger onClick={() => handlerDelete(data.id)}>ลบประกาศ</Button>
                            </div>    
                            </div>
                            
                            
                            <h2 className=''>หัวข้อประกาศ: {data.title}</h2>
                            <p className=''>{data.description}</p>
                            <div className="imageContainer">
                                {/* <p>คำอธิบาย</p> */}
                                {/* รูปภาพจะอยู่ในสี่เหลี่ยมผืนผ้า */}
                                {/* <img src={data.image} alt="รูปภาพ" /> */}
                                
                                <div className='flex '>
                                    {data.images.map((image, index) => {
                                        return (
                                            <div className='mx-2' key={index}>
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={`http://localhost:3232/api/file-image?file=${image.file_path}`}
                                                />
                                            </div>
                                        )
                                    })}
                                                                         {/* <div className='mx-2'>
                                    <Image
                                        width={200}
                                        height={200}
                                        src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
                                    />
                                    </div> */}
                                    
                                    
                                </div>
                            </div>
                        </div>
                    )
             })}
        </div>
    );
};

export default AnnoucePage;
