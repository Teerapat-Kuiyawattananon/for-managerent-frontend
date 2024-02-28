import { Button, Input, InputNumber, Collapse } from 'antd';
import React, {useEffect, useState} from 'react'
// import './test.css'

interface FormRoomCreateProps {
  next : () => void
  currentState: number
  valueData : any
}

interface Room {
    id: number;
    floor_name: string;
    room_name: string;
    rent_amount: number;
  }

  interface Floor {
    id: number;
    floor_name: string;
    rooms: Room[];
  }
  
  // for (let i = 1; i <= 0; i++) {
  //   let RoomData: Room[] = [];
  //   for (let j = 1; j <= 5; j++) {
  //       RoomData.push({
  //           id: j,
  //           floor_name: `${i}`,
  //           room_name: `${i}0${j}`,
  //           rent_amount: 5000,
  //         });
  //   }
  //   FLOORS.push({
  //       id: i,
  //       floor_name: `${i}`,
  //       rooms: RoomData
  //   });
  // }



  
const FormRoomCreate = ({next, currentState, valueData} : FormRoomCreateProps) => {
  // const [data, setData] = useState(FLOORS);
  console.log("number floor", valueData.form1.number_of_floor)
  console.log("number room", valueData.form1.number_of_room)
  const FLOORS: Floor[] = valueData.form2;
  // const FLOORS: Floor[] = [];
  // for (let i = 1; i <= valueData.form1.number_of_floor ; i++) {
  //   let RoomData: Room[] = [];
  //   for (let j = 1; j <= valueData.form1.number_of_room; j++) {
  //       RoomData.push({
  //           id: j,
  //           floor_name: `${i}`,
  //           room_name: `${i}${j.toString().padStart(2, '0')}`,
  //           rent_amount: valueData.form1.rent_amount,
  //         });
  //   }
  //   FLOORS.push({
  //       id: i,
  //       floor_name: `${i}`,
  //       rooms: RoomData
  //   });
  // }
  
  // valueData.form2 = FLOORS;

  const [data, setData] = useState(valueData.form2);
  const [editingKey, setEditingKey] = useState(false);
  const handleChanges = (index: number, indexFloor: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...data];
    const floor = newData[indexFloor];
    const target = floor.rooms[index];
    console.log('event', event.target.name)
    if (target) {
        let name = event.target.name;
        if (name === 'room_name') {
            target.room_name = event.target.value;
            console.log('room_name', target.room_name)
            console.log(newData)
            
        } else if (name === 'rent_amount') {
            target.rent_amount = Number(event.target.value);
        }
        setData(newData);
        valueData.form2 = newData;
        console.log("newData", newData)
        console.log('valueData', valueData.form2)
        // console.log('newData', target)
        // target.room_name = event.target.value;
    //   setData(newData);
    }
  }

  // useEffect(() => {
  //   // create room
  //   console.log('valueData', valueData.form2)
  //   console.log('data', data)
  // }, [data])

  const handleEdit = () => {
    setEditingKey(!editingKey);
  }

  return (
    <>
    <div className='relative overflow-x-auto'>
        <div className='flex w-full justify-end mb-3'>
            {/* <Button onClick={handleEdit}>{editingKey ? 'Save' : 'Edit'}</Button> */}
            <Button type='primary' onClick={ () => {
                console.log("data", JSON.stringify(data))
                // valueData.form2 = data;
                console.log("valueData", valueData.form2)
            }} >Send</Button>
        </div>
        {FLOORS.map((item, indexFloor) => (
            <Collapse
            key={indexFloor}
            items={[{ key: '1', label: 'ชั้น ' +  item.floor_name, 
            children: <div> 
                <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-700">
                        {/* Added dark: prefix for dark mode classes */}
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 rounded dark:text-gray-700">
                            <tr>
                            <th scope="col" className="px-6 py-3">
                                ชั้น
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ชื่อห้อง
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ค่าเช่าห้อง/เดือน (บาท)
                            </th>
                            {/* <th scope='col' className='px-6 py-3'>
                                Input
                            </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {item.rooms.map((item, index) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-white dark:border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                {item.floor_name}
                                </th>
                                <td>
                                {!editingKey ? <Input name='room_name' className='my-3 w-1/2' defaultValue={item.room_name} onChange={(event) => handleChanges(index, indexFloor, event)}/> : <p>{item.room_name}</p> }
                                {/* <Input className='my-3 w-1/2' value={item.room_name} onChange={(event) => handleChanges(index, event)}/> */}
                                </td>
                                <td>
                                {!editingKey ? (<Input 
                                // step="0.01"
                                type='number' name='rent_amount' className='my-3 w-1/2' defaultValue={item.rent_amount.toFixed(2)} onChange={(event) => handleChanges(index, indexFloor, event)}/>) : <p>{item.rent_amount.toFixed(2)}</p>}
                
                
                                {/* <Input 
                                // step="0.01"
                                type='number' className='my-3 w-1/2' value={item.rent_amount.toFixed(2)} onChange={(event) => handleChanges(index, event)}/> */}
                                </td>
                                {/* <td className="px-6 py-4">{item.rent_amount.toFixed(2)}</td> */}
                                {/* <input value={item.floor_name} name='test' onChange={(event) => handleChanges(index, event)}
                                type="text" id="first_name" className="h-full w-1/2 p-1 mx-6 my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-theme focus:border-purple-theme block justify-center " required />              <td className="px-6 py-4">{`$${room.price.toFixed(2)}`}</td> */}
                                <td>
                                {/* <Input className='my-3 w-1/2' value={item.floor_name} onChange={(event) => handleChanges(index, event)}/> */}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
         </div>
         }]}
          />
        )) }
        
    </div>
    </>
  )
}

export default FormRoomCreate
