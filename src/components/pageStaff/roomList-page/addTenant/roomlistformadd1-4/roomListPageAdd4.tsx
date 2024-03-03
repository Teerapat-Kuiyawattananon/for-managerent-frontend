import React, {useState} from 'react'
import { Button, Form, Input, InputNumber, Space, DatePicker } from 'antd';

interface RoomListPageAdd4Props {
    next : () => void
    currentState: number
    valueData : any
  }

const RoomListPageAdd4= ({next, currentState, valueData} : RoomListPageAdd4Props)  => {
    
      
    const date = new Date(valueData.form1.birth_day)
      return (
        <div className=' mx-10 mt-5 h-full block '>
        <div className='w-full '>
           <div className='bg-gray-800 h-10 pl-5 py-2 justify-start rounded' >
            <p className='text-white'>
                รายละเอียดผู้เช่า
            </p>
           </div>
           <div className='px-10 py-3 flex mt-2'>
            <div className='w-1/2'>
                <p className='text-gray-800 font-bold'>
                    ชื่อ
                </p>
                <p className='text-gray-500 mb-2'>
                    {valueData.form1.name ? valueData.form1.name : 'ไม่มีชื่อ'}
                </p>
                <p className='text-gray-800 font-bold'>
                    เบอร์โทรศัพท์
                </p>
                <p className='text-gray-500 mb-2'>
                    {valueData.form1.mobile_number ? valueData.form1.mobile_number : 'ไม่มีเบอร์โทรศัพท์'}   
                </p>
                <p className='text-gray-800 font-bold'>
                    วันเกิด
                </p>
                <p className='text-gray-500 mb-2'>
                   {date.getDate()+ "-" + (date.getMonth() + 1)+ "-" + date.getFullYear()}
                </p>
                <p className='text-gray-800 font-bold'>
                    Line ID 
                </p>
                <p className='text-gray-500'>
                   {valueData.form1.line_id ? valueData.form1.line_id : 'ไม่มี Line ID'}  
                </p>
            </div>
            <div>
            <p className='text-gray-800 font-bold'>
                    นามสกุล 
                </p>
                <p className='text-gray-500 mb-2'>
                   {valueData.form1.last_name ? valueData.form1.last_name : 'ไม่มีเบอร์ติดต่อพอหัก'}   
                </p>
                <p className='text-gray-800 font-bold'>
                    ชื่อเล่น 
                </p>
                <p className='text-gray-500 mb-2'>
                     {valueData.form1.nick_name ? valueData.form1.nick_name : 'ไม่มีชื่อเล่น'}   
                </p>
                <p className='text-gray-800 font-bold'>
                    เลขบัตรประชาชน 
                </p>
                <p className='text-gray-500 mb-2'>
                     {valueData.form1.id_card_number ? valueData.form1.id_card_number : 'ไม่มีเลขบัตรประชาชน'}   
                </p>
                <p className='text-gray-800 font-bold'>
                    Email 
                </p>
                <p className='text-gray-500 mb-2'>
                     {valueData.form1.email ? valueData.form1.email : 'ไม่มี Email'}
                </p>
            </div>
           </div>
        </div>
        <div className='bg-gray-800 h-10 pl-5 py-2 justify-start rounded' >
            <p className='text-white'>
                ที่อยู่ตามทะเบียนบ้าน
            </p>
        </div>
        <div className='px-10 py-3 flex mt-2'>
            <div className='w-1/2'>
                <p className='text-gray-800 font-bold'>
                    ที่อยู่
                </p>
                <p className='text-gray-500 mb-2'>
                    {valueData.form2.address_p1 ? valueData.form2.address_p1 : 'ไม่มีที่อยู่'}
                </p>
                <p className='text-gray-800 font-bold'>
                    อำเภอ/เขต
                </p>
                <p className='text-gray-500 mb-2'>
                  {valueData.form2.district_p ? valueData.form2.district_p : 'ไม่มีอำเภอ/เขต'}
                </p>
               
                <p className='text-gray-800 font-bold'>
                    รหัสไปรษณีย์
                </p>
                <p className='text-gray-500 '>
                    {valueData.form2.zipcode_p ? valueData.form2.zipcode_p : 'ไม่มีรหัสไปรษณีย์'}
                </p>
            </div>
            <div>
            <p className='text-gray-800 font-bold'>
                    ตำบล/แขวง
                </p>
                <p className='text-gray-500 mb-2'>
                    {valueData.form2.county_p ? valueData.form2.county_p : 'ไม่มีตำบล/แขวง'}
                </p>
        
                <p className='text-gray-800 font-bold'>
                    จังหวัด
                </p>
                <p className='text-gray-500 mb-2'>
                    {valueData.form2.province_p ? valueData.form2.province_p : 'ไม่มีจังหวัด'}
                </p>
            </div>
           </div>
           
    </div>
      )
    }
  
  export default RoomListPageAdd4;