import React, { useEffect, useState } from 'react';
import { Collapse, Input, DatePicker, message, Button } from 'antd';
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
  interface Room {
    id: number;
    floor_name: string;
    room_name: string;
    start_reading: number; // Assuming this represents a numerical reading
    end_reading: number; // Assuming this represents a numerical reading
    used_amount: number;
    electric_service_id: number;
  }
  
  interface Floor {
    id: number;
    floor_name: string;
    rooms: Room[];
  }

const ElecTab = () => {
    const [editingKey, setEditingKey] = useState(false);
    const [data, setData] = useState<Floor[]>([]);
    const [monthDate, setMonthDate] = useState<string>('');
    const { apartId } = useParams()

    const date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}/${month.toString().padStart(2, '0')}`;
        console.log(currentDate)
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
  const handleChangeStartReading = (index: number, indexFloor: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...data];
    const floor = newData[indexFloor];
    const target = floor.rooms[index];
    console.log('event', event.target.name)
    if (target) {
        target.start_reading = Number(event.target.value);
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
        const res = await ApartmentService.updateRoomsElecServices(Number(apartId), data)
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
    const fetchElectricService = async () => {
        try {
        const res = await ApartmentService.getRoomsElecServices(Number(apartId), monthDate)
        console.log("res", res.data)
        setData(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    fetchElectricService();
    console.log('monthDate', monthDate);
  }, [monthDate])

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
                                <th scope="col" className="px-6 py-3 bg-yellow-100">
                                    ชื่อห้อง
                                </th>
                                <th scope="col" className="px-6 py-3 bg-yellow-100">
                                    เลขมิเตอร์ไฟเดือนก่อนหน้า <br /> 
                                </th>
                                <th scope="col" className="px-6 py-3 bg-yellow-100">
                                    เลขมิเตอร์ไฟเดือนปัจจุบัน <br />
                                </th>
                                <th scope="col" className="px-6 py-3 bg-yellow-100">
                                    ค่าไฟหน่วยที่ใช้
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
                                    <td className="">
                                    {/* {room.start_reading} */}
                                    <Input
                                                type="number"
                                                name="rent_amount"
                                                className="my-3 w-1/2 bg-yellow-50"
                                                // defaultValue={room.end_reading}
                                                value={room.start_reading}
                                                onChange={(event) => handleChangeStartReading(index, indexFloor, event)}
                                            />
                                    </td>
                                    <td className=''>
                                        {!editingKey ? (
                                            <Input
                                                type="number"
                                                name="rent_amount"
                                                className="my-3 w-1/2 bg-yellow-50"
                                                // defaultValue={room.end_reading}
                                                value={room.end_reading}
                                                onChange={(event) => handleChangeEndReading(index, indexFloor, event)}
                                            />
                                        ) : (
                                            <p>{room.end_reading}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
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

export default ElecTab