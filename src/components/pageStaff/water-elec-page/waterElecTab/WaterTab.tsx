import React, { useState } from 'react';
import { Collapse, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
const data = [
    {
      "id": 1,
      "floor_name": "1",
      "rooms": [
        {
          "id": 1,
          "floor_name": "1",
          "room_name": "101",
          "rent_amount": 1000
        },
        {
          "id": 2,
          "floor_name": "1",
          "room_name": "102",
          "rent_amount": 1000
        },
        {
          "id": 3,
          "floor_name": "1",
          "room_name": "103",
          "rent_amount": 1000
        },
        {
          "id": 4,
          "floor_name": "1",
          "room_name": "104",
          "rent_amount": 1000
        },
        {
          "id": 5,
          "floor_name": "1",
          "room_name": "105",
          "rent_amount": 1000
        }
      ]
    },
    {
      "id": 2,
      "floor_name": "2",
      "rooms": [
        {
          "id": 1,
          "floor_name": "2",
          "room_name": "201",
          "rent_amount": 1000
        },
        {
          "id": 2,
          "floor_name": "2",
          "room_name": "202",
          "rent_amount": 1000
        },
        {
          "id": 3,
          "floor_name": "2",
          "room_name": "203",
          "rent_amount": 1000
        },
        {
          "id": 4,
          "floor_name": "2",
          "room_name": "204",
          "rent_amount": 1000
        },
        {
          "id": 5,
          "floor_name": "2",
          "room_name": "205",
          "rent_amount": 1000
        }
      ]
    },
    {
      "id": 3,
      "floor_name": "3",
      "rooms": [
        {
          "id": 1,
          "floor_name": "3",
          "room_name": "301",
          "rent_amount": 1000
        },
        {
          "id": 2,
          "floor_name": "3",
          "room_name": "302",
          "rent_amount": 1000
        },
        {
          "id": 3,
          "floor_name": "3",
          "room_name": "303",
          "rent_amount": 1000
        },
        {
          "id": 4,
          "floor_name": "3",
          "room_name": "304",
          "rent_amount": 1000
        },
        {
          "id": 5,
          "floor_name": "3",
          "room_name": "305",
          "rent_amount": 1000
        }
      ]
    }
  ]

const WaterTab = () => {
    const [editingKey, setEditingKey] = useState(false);

    const date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}/${month.toString().padStart(2, '0')}`;
        console.log(currentDate)
  const monthFormat = 'YYYY/MM';

  return (
    <>
    <DatePicker defaultValue={dayjs(currentDate, monthFormat)} format={monthFormat} picker="month" style={{ marginBottom: '20px' }}/>
    {data.map((floor, indexFloor) => (
        <Collapse key={indexFloor} bordered={false}>
            <Collapse.Panel
                header={'ชั้น ' + floor.floor_name}
                key={indexFloor.toString()}
            >
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 rounded dark:text-gray-700">
                            <tr>
                                {/* <th scope="col" className="px-6 py-3">
                                    ชั้น
                                </th> */}
                                <th scope="col" className="px-6 py-3 bg-blue-100">
                                    ชื่อห้อง
                                </th>
                                <th scope="col" className="px-6 py-3 bg-blue-100">
                                    เลขมิเตอร์น้ำก่อนหน้า <br /> กุมภาพันธ์/2024
                                </th>
                                <th scope="col" className="px-6 py-3 bg-blue-100">
                                    เลขมิเตอร์น้ำล่าสุด <br /> มีนาคม/2024
                                </th>
                                <th scope="col" className="px-6 py-3 bg-blue-100">
                                    ค่าน้ำหน่วยที่ใช้
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {floor.rooms.map((room) => (
                                <tr key={room.id} className="bg-white border-b dark:bg-white dark:border-gray-200">
                                    {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        {room.floor_name}
                                    </td> */}
                                    <td className=" px-6 py-4 font-black text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        {room.room_name}
                                    </td>
                                    
                                    <td className=" px-11 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        123
                                    </td>
                                    <td className=''>
                                        {!editingKey ? (
                                            <Input
                                                type="number"
                                                name="rent_amount"
                                                className="my-3 w-1/2 bg-blue-50"
                                                defaultValue={room.rent_amount}
                                            />
                                        ) : (
                                            <p>{room.rent_amount}</p>
                                        )}
                                    </td>
                                    <td className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        123
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Collapse.Panel>
        </Collapse>
    ))}
</>
);
    
  
}

export default WaterTab