import React, { useState } from 'react';
import { Collapse, Input } from 'antd';

interface FillBillTableProps {
    data: Floor[];
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

const FillBillTable: React.FC<FillBillTableProps> = ({ data }) => {
    const [editingKey, setEditingKey] = useState(false);

    return (
        <>
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
                                        <th scope="col" className="px-6 py-3">
                                            ชั้น
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ชื่อห้อง
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ค่าไฟ/หน่วย
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ค่าน้ำ/หน่วย
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {floor.rooms.map((room) => (
                                        <tr key={room.id} className="bg-white border-b dark:bg-white dark:border-gray-200">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                                {room.floor_name}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                                {room.room_name}
                                            </td>
                                            <td>
                                                {!editingKey ? (
                                                    <Input
                                                        type="number"
                                                        name="rent_amount"
                                                        className="my-3 w-1/2"
                                                        defaultValue={room.rent_amount.toFixed(2)}
                                                    />
                                                ) : (
                                                    <p>{room.rent_amount.toFixed(2)}</p>
                                                )}
                                            </td>
                                            <td>
                                                {!editingKey ? (
                                                    <Input
                                                        type="number"
                                                        name="rent_amount"
                                                        className="my-3 w-1/2"
                                                        defaultValue={room.rent_amount.toFixed(2)}
                                                    />
                                                ) : (
                                                    <p>{room.rent_amount.toFixed(2)}</p>
                                                )}
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
};

export default FillBillTable;


