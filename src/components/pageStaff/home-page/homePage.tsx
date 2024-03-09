import React, { useEffect, useState }  from 'react';
import { NotificationOutlined , UploadOutlined } from '@ant-design/icons';
import { Button , Modal , Form, Input, Upload, Image, message} from 'antd';
import './HomePage.css';
import { useParams } from 'react-router-dom';
import ApartmentService from '../../../services/apartment.service';
import authHeader from '../../../services/auth-header';
import dayjs from 'dayjs';


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


const HomePage: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<Announcement[]>([]);
    const { apartId } = useParams();

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
                <span className='text-xl ' ><NotificationOutlined /> ข้อมูลข่าวสาร</span>
              
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
                                    
                                </div>
                            </div>
                        </div>
                    )
             })}
            
        </div>
    );
};

export default HomePage;
