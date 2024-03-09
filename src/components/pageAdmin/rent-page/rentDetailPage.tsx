import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApartmentService from '../../../services/apartment.service';

interface ApartmentDetail {
  id: number;
  name: string;
  address: string;
  contact_number: string;
  number_of_floor: number;
  number_of_room: number;
  max_room: number;
  min_room: number;
  max_rent_amount: number;
  min_rent_amount: number;
  water_amount: number;
  electricity_amount: number;
  due_date: string;
  information: string;
}


const RentDetailPage = () => {
  const {apartId} = useParams();
  const [apartData, setApartData] = useState<ApartmentDetail>({
    id: 0,
    name: '',
    address: '',
    contact_number: '',
    number_of_floor: 0,
    number_of_room: 0,
    max_room: 0,
    min_room: 0,
    max_rent_amount: 0,
    min_rent_amount: 0,
    water_amount: 0,
    electricity_amount: 0,
    due_date: '',
    information: '',
  })


useEffect(() => {
  const fetchData = async () => {
    // โค้ดสำหรับดึงข้อมูลหอพักจาก API
    const res = await ApartmentService.getApartmentDetail(Number(apartId))
    console.log(res)
    setApartData(res.data)
  }
  fetchData()

}, [])
  return (
    <div>
        <div className ='flex justify-end'>
        <Link to= {`/apartment/${apartId}/fixElecwater`}>
            <Button type="primary">
                แก้ไขค่าน้ำค่าไฟ
            </Button>
        </Link>
        </div>
      <div className=' mx-10 mt-5 h-full block '>
        <div className='w-full '>
          <div className='bg-gray-800 h-10 pl-5 py-2 justify-start rounded' >
            <p className='text-white'>
              สรุปข้อมูล
            </p>
          </div>
          <div className='px-10 py-3 flex mt-2'>
            <div className='w-1/2'>
              <p className='text-gray-800 font-bold'>
                ชื่อหอพัก
              </p>
              <p className='text-gray-500 mb-2'>
                {apartData.name ? apartData.name : 'ไม่มีชื่อหอพัก'}
              </p>
              <p className='text-gray-800 font-bold'>
                เบอร์ติดต่อพอหัก
              </p>
              <p className='text-gray-500 mb-2'>
                {apartData.contact_number ? apartData.contact_number : 'ไม่มีเบอร์ติดต่อพอหัก'}   
              </p>
            </div>
            <div>
              <p className='text-gray-800 font-bold'>
                ที่อยู่หอพัก
              </p>
              <p className='text-gray-500'>
                {apartData.address ? apartData.address : 'ไม่มีที่อยู่หอพัก'}
              </p>
            </div>
          </div>
        </div>
        <div className='bg-gray-800 h-10 pl-5 py-2 justify-start rounded' >
          <p className='text-white'>
            รายละเอียดหอพัก
          </p>
        </div>
        <div className='px-10 py-3 flex mt-2'>
          <div className='w-1/2'>
            <p className='text-gray-800 font-bold'>
              จำนวนชั้น
            </p>
            <p className='text-gray-500 mb-2'>
              {apartData.number_of_floor} ชั้น
            </p>
            <p className='text-gray-800 font-bold'>
              จำนวนห้องพักต่ำสุดในแต่ละชั้น
            </p>
            <p className='text-gray-500 mb-2'>
              {apartData.number_of_room} ห้องต่อชั้น   
            </p>
          </div>
          <div>
            <p className='text-gray-800 font-bold'>
              จำนวนห้องพักสูงสุดในแต่ละชั้น
            </p>
            <p className='text-gray-500 mb-2'>
              {apartData.number_of_room} ห้องต่อชั้น
            </p>
            <p className='text-gray-800 font-bold'>
              จำนวนห้องพักทั้งหมด
            </p>
            <p className='text-gray-500 '>
              {apartData.max_room} ห้อง
            </p>
          </div>
        </div>
        <div className='bg-gray-800 h-10 pl-5 py-2 justify-start rounded' >
          <p className='text-white'>
            รายละเอียดค่าใช้จ่าย
          </p>
        </div>
        <div className='px-10 py-3 flex mt-2'>
          <div className='w-1/2'>
            <p className='text-gray-800 font-bold'>
              ค่าเช่าต่ำสุด
            </p>
            <p className='text-gray-500 mb-2'>
              {apartData.min_rent_amount} บาท
            </p>
            <p className='text-gray-800 font-bold'>
              ค่าไฟ/หน่วย
            </p>
            <p className='text-gray-500 mb-2'>
              {apartData.electricity_amount} บาท
            </p>
            {/* <p className='text-gray-800 font-bold'>
              วันที่เรียกเก็บเงิน
            </p> */}
            <p className='text-gray-500'>
              {/* ทุกวันที่ {date.getDate()} ของเดือน */}
            </p>
          </div>
          <div>
            <p className='text-gray-800 font-bold'>
              ค่าเช่าสูงสุด
            </p>
            <p className='text-gray-500 mb-2'>
              {apartData.max_rent_amount} บาท 
            </p>
            <p className='text-gray-800 font-bold'>
              ค่าน้ำ/หน่วย
            </p>
            <p className='text-gray-500'>
              {apartData.water_amount} บาท
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentDetailPage;
