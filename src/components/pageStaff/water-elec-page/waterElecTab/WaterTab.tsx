import React, { useEffect, useState } from 'react';
import { Collapse, Input, DatePicker, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ApartmentService from '../../../../services/apartment.service';
const dataRoom = [
    {
      "id": 1,
      "floor_name": "1",
      "rooms": [
        {
          "id": 1,
          "floor_name": "1",
          "room_name": "101",
          "start_reading": 123,
          "end_reading": 123,
          "used_amount": 123
        },
        {
          "id": 2,
          "floor_name": "1",
          "room_name": "102",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 3,
          "floor_name": "1",
          "room_name": "103",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 4,
          "floor_name": "1",
          "room_name": "104",
          "start_reading": 123,
        "end_reading": 123,
        "used_amount": 123
        },
        {
          "id": 5,
          "floor_name": "1",
          "room_name": "105",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
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
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 2,
          "floor_name": "2",
          "room_name": "202",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 3,
          "floor_name": "2",
          "room_name": "203",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 4,
          "floor_name": "2",
          "room_name": "204",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 5,
          "floor_name": "2",
          "room_name": "205",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
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
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 2,
          "floor_name": "3",
          "room_name": "302",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 3,
          "floor_name": "3",
          "room_name": "303",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 4,
          "floor_name": "3",
          "room_name": "304",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        },
        {
          "id": 5,
          "floor_name": "3",
          "room_name": "305",
          "start_reading": 123,
            "end_reading": 123,
            "used_amount": 123
        }
      ]
    }
  ]

  interface Room {
    id: number;
    floor_name: string;
    room_name: string;
    start_reading: number; // Assuming this represents a numerical reading
    end_reading: number; // Assuming this represents a numerical reading
    used_amount: number;
    water_service_id: number;
  }
  
  interface Floor {
    id: number;
    floor_name: string;
    rooms: Room[];
  }

const WaterTab = () => {
    const [editingKey, setEditingKey] = useState(false);
    const [data, setData] = useState<Floor[]>([]);
    const [monthDate, setMonthDate] = useState<string>('');
    const { apartId } = useParams()
    const date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}/${month.toString().padStart(2, '0')}`;
  const monthFormat = 'YYYY/MM';

  const handleChangeMonthDate = (values: any) => {
    console.log("values", values)
    setMonthDate(values.format(monthFormat));
    console.log(monthDate);
  }

  const handleChangeEndReading = (index: number, indexFloor: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...data];
    const floor = newData[indexFloor];
    const target = floor.rooms[index];
    console.log('event', event.target.name)
    if (target) {
        target.end_reading = Number(event.target.value);
        target.used_amount = target.end_reading - target.start_reading;
        // check if the used_amount is negative, if it is, set it to 0
        if (target.used_amount < 0) {
            target.used_amount = 0;
        }
        setData(newData);
        console.log("newData", newData)
    }
  }

  const handleSave = async () => {
    try {
        const res = await ApartmentService.updateRoomsWaterServices(Number(apartId), data)
        console.log("res",res.data);
        if (res.status === 200) {
            message.success('บันทึกข้อมูลสำเร็จ');
        }
    }
    catch (error) {
        console.log(error);
    }
    console.log("data", data)
  }
  useEffect(() => {
    const fenthWaterService = async () => {
        try {
            const res = await ApartmentService.getRoomsWaterServices(Number(apartId), monthDate)
            console.log("res",res.data);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    fenthWaterService();
    
    console.log('monthDate', monthDate);
  }, [monthDate]);

  return (
    <>
    <DatePicker onChange={handleChangeMonthDate} defaultValue={dayjs(currentDate, monthFormat)} format={monthFormat} picker="month" style={{ marginBottom: '10px' }}/>
    <div className='flex mb-2 justify-end'>
        <Button onClick={handleSave} type="primary" >บันทึก</Button>
    </div>
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
                            {floor.rooms.map((room, index) => (
                                <tr key={room.id} className="bg-white border-b dark:bg-white dark:border-gray-200">
                                    {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        {room.floor_name}
                                    </td> */}
                                    <td className=" px-6 py-4 font-black text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        {room.room_name}
                                    </td>
                                    
                                    <td className=" px-11 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        {room.start_reading}
                                    </td>
                                    <td className=''>
                                        {!editingKey ? (
                                            <Input
                                                type="number"
                                                name="end_reading"
                                                className="my-3 w-1/2 bg-blue-50"
                                                // defaultValue={room.end_reading}
                                                value={room.end_reading}
                                                onChange={(event) => handleChangeEndReading(index, indexFloor, event)}
                                            />
                                        ) : (
                                            <p>{room.end_reading}</p>
                                        )}
                                    </td>
                                    <td className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                        {room.used_amount}
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