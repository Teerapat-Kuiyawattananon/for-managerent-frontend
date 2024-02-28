import React from 'react'

interface SummaryApartmentProps {
    valueData: any
    }

const SummaryApartment = ({valueData} : SummaryApartmentProps) => {
    const FLOORS = valueData.form2;
    const totalRoom = valueData.form1.number_of_floor * valueData.form1.number_of_room
    const maxRent = () => {
        let max = 0
        FLOORS.forEach((floor: any) => {
            floor.rooms.forEach((room: any) => {
                if (room.rent_amount > max) {
                    max = room.rent_amount
                }
            })
        })
        return max
    }
    const minRent = () => {
        let min = 0
        if (FLOORS.length > 0 && FLOORS[0].rooms.length > 0) {
            min = FLOORS[0].rooms[0].rent_amount
        }
        FLOORS.forEach((floor: any) => {
            floor.rooms.forEach((room: any) => {
                if (room.rent_amount < min) {
                    min = room.rent_amount
                }
            })
        })
        return min
    }
    const date = new Date(valueData.form1.bill_date)
  return (
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
                {valueData.form1.name ? valueData.form1.name : 'ไม่มีชื่อหอพัก'}
            </p>
            <p className='text-gray-800 font-bold'>
                เบอร์ติดต่อพอหัก
            </p>
            <p className='text-gray-500 mb-2'>
                {valueData.form1.contact_number ? valueData.form1.contact_number : 'ไม่มีเบอร์ติดต่อพอหัก'}   
            </p>
        </div>
        <div>
        <p className='text-gray-800 font-bold'>
                ที่อยู่หอพัก
            </p>
            <p className='text-gray-500'>
                {valueData.form1.address ? valueData.form1.address : 'ไม่มีที่อยู่หอพัก'}
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
                {valueData.form1.number_of_floor} ชั้น
            </p>
            <p className='text-gray-800 font-bold'>
                จำนวนห้องพักต่ำสุดในแต่ละชั้น
            </p>
            <p className='text-gray-500 mb-2'>
                {valueData.form1.number_of_room} ห้องต่อชั้น   
            </p>
        </div>
        <div>
        <p className='text-gray-800 font-bold'>
                จำนวนห้องพักสูงสุดในแต่ละชั้น
            </p>
            <p className='text-gray-500 mb-2'>
            {valueData.form1.number_of_room} ห้องต่อชั้น
            </p>
            <p className='text-gray-800 font-bold'>
                จำนวนห้องพักทั้งหมด
            </p>
            <p className='text-gray-500 '>
                {totalRoom} ห้อง
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
                {minRent()} บาท
            </p>
            <p className='text-gray-800 font-bold'>
                ค่าไฟ/หน่วย
            </p>
            <p className='text-gray-500 mb-2'>
                {valueData.form1.electricity_unit_price} บาท
            </p>
            <p className='text-gray-800 font-bold'>
                วันที่เรียกเก็บเงิน
            </p>
            <p className='text-gray-500'>
                ทุกวันที่ {date.getDate()} ของเดือน
            </p>
        </div>
        <div>
        <p className='text-gray-800 font-bold'>
                ค่าเช่าสูงสุด
            </p>
            <p className='text-gray-500 mb-2'>
                {maxRent()} บาท 
            </p>
            <p className='text-gray-800 font-bold'>
                ค่าน้ำ/หน่วย
            </p>
            <p className='text-gray-500'>
                {valueData.form1.water_unit_price} บาท
            </p>
        </div>
       </div>
</div>
  )
}

export default SummaryApartment