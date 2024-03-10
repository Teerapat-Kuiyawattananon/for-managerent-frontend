import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Table, Button, Tabs, message, } from 'antd'
import ApartmentService from '../../../services/apartment.service'
import { UserOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import RoomService from '../../../services/room.service';

type TableRowSelection<T> = TableProps<T>['rowSelection'];


interface ServiceRoomData {
    key: string
    name: string
    amount: number
}

interface RoomListTableData {
    key: number;
    floor: string;
    roomName: string;
    tenantName: string;
    roomRent: number;
    roomStatus: string;
  }

interface AddServiceRequest {
    service_id: number
    room_id: React.Key[]
}

const ServiceRoomSetting = () => {
    const { apartId, serviceId } = useParams()
    const [serviceData, setServiceData] = useState<ServiceRoomData>()
    const [roomData, setRoomData] = useState<RoomListTableData[]>([])
    const [roomUsed, setRoomUsed] = useState<number[]>([])
    const distinctFloors = Array.from(new Set(roomData.map(item => item.floor))); // สร้างอาร์เรย์ของชั้นที่มีอยู่จริง
    const floorFilters = distinctFloors.map(floor => ({ text: `ชั้น ${floor}`, value: floor })); // สร้างรายการตัวเลือกสำหรับการกรอง
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isUse, setIsUse] = useState<boolean>(false)
    const [formData, setFormData] = useState<AddServiceRequest>({
        service_id: Number(serviceId),
        room_id: []
    })

    useEffect(() => {
        const fetch = async () => {
            const resService = await ApartmentService.getServiceDetailById(Number(apartId), Number(serviceId))
            console.log("res", resService)
            setServiceData(resService.data)
            setRoomUsed(resService.room_list)
        }
        const fetchRoom = async () => {
            const resRoom = await RoomService.getRoomsList(Number(apartId))
            console.log("resRoom", resRoom)
            setRoomData(resRoom.data)
        }
        fetch()
        fetchRoom()
        console.log("ServiceRoomSetting")
    }, [])

    const columns: TableColumnsType<RoomListTableData> = [
        {
            title: 'ชั้น',
            dataIndex: 'floor',
            key: 'floor',
            filters: floorFilters, // ใช้รายการตัวเลือกในการกรอง
            onFilter: (value, record: RoomListTableData) => {
                return record.floor === value;
            },
        },
        {
            title: 'ชื่อห้อง',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'ชื่อผู้อยู่อาศัย',
            dataIndex: 'tenantName',
            key: 'tenantName',
            render : (text) => (text === "" ? "ไม่มีผู้เช่า" : text)
        },
        {
            title: 'ค่าเช่าห้อง',
            dataIndex: 'roomRent',
            key: 'roomRent',
            render : (text) => (text.toFixed(2))
        },
        {
            title: 'สถานะห้องเช่า',
            dataIndex: 'roomStatus',
            key: 'roomStatus',
            filters: [
                { text: 'ว่าง', value: 'available' },
                { text: 'ไม่ว่าง', value: 'un_available' },
                // { text: 'available', value: 'available' },
                // { text: 'unavailable', value: 'unavailable' },
            ],
            onFilter: (value, record: RoomListTableData) => {
                return record.roomStatus === value;
            },
            render: statusColor,
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: (_, record : RoomListTableData) => (
                <>
                    {record.roomStatus === "ว่าง" || record.roomStatus === "available" && (
                        // <Link to={`/apartment/${apartId}/roomlist/${getId(record.key)}/form`}> 
                            <Button >
                                <UserOutlined />
                            </Button>
                        // </Link>
                    )}
                    {record.roomStatus === "ไม่ว่าง" || record.roomStatus === "un_available" && (
                        // <Link to={`/apartment/${apartId}/roomlist/${getId(record.key)}/detail`}>
                            <Button>
                                <UserOutlined />
                            </Button>
                        // </Link>
                    )}
                </>
            ),
        }
    ];

    function statusColor(status: string) {
        let color;
        let letter;
        switch (status) {
            case 'ไม่ว่าง':
                color = 'red';
                break;
            case 'ว่าง':
                color = 'green';
                break;
            case 'available':
                color = 'green';
                letter = 'ว่าง'
                break;
            case 'un_available':
                color = 'red';
                letter = 'ไม่ว่าง'
                break;
            default:
                color = 'inherit'; // Default color
        }
        return <span style={{ color }}>{letter}</span>;
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);

        // Show selected item.
        const selectedRows = roomData.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
        setFormData({
            service_id: Number(serviceId),
            room_id: selectedRowKeys
        })
    };

    const rowSelection: TableRowSelection<RoomListTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleIsUse = () => {
        setIsUse(!isUse)
        setSelectedRowKeys([])
    }

    const handleAddService = async () => {
        console.log("Select row", selectedRowKeys)
        formData.room_id = selectedRowKeys
        console.log("formData", formData)
        if (formData.room_id.length === 0) {
            message.error('กรุณาเลือกห้องที่ใช้ค่าบริการ')
            // message.success('เพิ่มค่าบริการสำเร็จ')
            // window.location.reload()
            return
        }
        try {
            const res = await ApartmentService.addServiceToRoom(Number(apartId), Number(serviceId), formData)
            console.log("res", res)
            if (res.status === 200) {
                console.log("Success")
                message.success('เพิ่มค่าบริการสำเร็จ', 5)
                const fetch = async () => {
                    const resService = await ApartmentService.getServiceDetailById(Number(apartId), Number(serviceId))
                    console.log("res", resService)
                    setServiceData(resService.data)
                    setRoomUsed(resService.room_list)
                }
                const fetchRoom = async () => {
                    const resRoom = await RoomService.getRoomsList(Number(apartId))
                    console.log("resRoom", resRoom)
                    setRoomData(resRoom.data)
                }
                fetch()
                fetchRoom()
                setIsUse(!isUse)

                // window.location.reload()
            }
        }
        catch (error){
            console.log("error", error)
        }
        // console.log("formData after", {data : serviceId, room_id : selectedRowKeys})
    }
    const handleCancelService = async () => {
        formData.room_id = selectedRowKeys
        if (formData.room_id.length === 0) {
            message.error('กรุณาเลือกห้องที่ใช้ค่าบริการ')
            // message.success('เพิ่มค่าบริการสำเร็จ')
            // window.location.reload()
            return
        }
        console.log("formData", formData)
        try {
            const res = await ApartmentService.removeServiceFromRoom(Number(apartId), Number(serviceId), formData)
            console.log("res", res)
            if (res.status === 200) {
                console.log("Success")
                message.success('ยกเลิกค่าบริการสำเร็จ', 5)
                const fetch = async () => {
                    const resService = await ApartmentService.getServiceDetailById(Number(apartId), Number(serviceId))
                    console.log("res", resService)
                    setServiceData(resService.data)
                    setRoomUsed(resService.room_list)
                }
                const fetchRoom = async () => {
                    const resRoom = await RoomService.getRoomsList(Number(apartId))
                    console.log("resRoom", resRoom)
                    setRoomData(resRoom.data)
                }
                fetch()
                fetchRoom()
                setIsUse(!isUse)
                // window.location.reload()
            }
        }
        catch (error){
            console.log("error", error)
        }
    }

    function removeByKeys(data: RoomListTableData[], keysToRemove: number[]): RoomListTableData[] {
        return data.filter((room) => !keysToRemove.includes(room.key));
      }
      function filterByKeys(data: RoomListTableData[], desiredKeys: number[]): RoomListTableData[] {
        return data.filter((room) => desiredKeys.includes(room.key));
      }
      

  return (
    <div>
        <div className='flex'>
            <h1 className='text-xl'>ตั้งค่าค่าบริการเพิ่มเติม</h1>
        </div>
        <div className='flex mt-2'>
            <h2 className='mr-2'>ชื่อค่าบริการ: {serviceData?.name}</h2>
            <h2>ค่าบริการ: {serviceData?.amount} บาท/เดือน</h2>  
        </div>
        <div className='flex mt-2 mb-3 justify-center'>
            {/* <h2 className='text-lg'>{!isUse ? "กำหนดห้องที่ใช้ค่าบริการ" : "ห้องที่ใช้ค่าบริการนี้อยู่"}</h2> */}
            {!isUse ? <p className='text-rose-600 text-2xl font-bold' > ห้องที่ไม่ได้ใช้ค่าบริการนี้ </p>: <p className='text-green-500 text-2xl font-bold'> ห้องที่ใช้ค่าบริการนี้อยู่ </p>}
        </div>
        <div className='flex w-full justify-end'>
            <div className='flex justify-end mb-2'>
                {!isUse ? <Button type='primary' onClick={handleAddService}>เพิ่มค่าบริการ</Button>
                :
                <Button danger onClick={handleCancelService}>ยกเลิกค่าบริการ</Button>}
            </div>
            {/* <div className='flex justify-start mb-2'>
                <Button type='primary' onClick={handleTest} >Test</Button>
            </div> */}
            {!isUse ?  <Button onClick={handleIsUse}>ห้องที่ใช้ค่าบริการนี้อยู่</Button> : <Button onClick={handleIsUse}>เพิ่มห้องที่ใช้ค่าบริการ</Button>}
        </div>
        
        <div>
            {!isUse ?
                <Table className='bg-yellow-100' columns={columns} dataSource={removeByKeys(roomData, roomUsed)} pagination={false} rowSelection={rowSelection} />
                :
                <Table columns={columns} dataSource={filterByKeys(roomData, roomUsed)} pagination={false} rowSelection={rowSelection} />
                }
        </div>
        {/* <div>
        <Table columns={columns} dataSource={removeByKeys(roomData, roomUsed)} pagination={false} rowSelection={rowSelection} />
        </div>
        <div>
        <Table columns={columns} dataSource={filterByKeys(roomData, roomUsed)} pagination={false} rowSelection={rowSelection} />
        </div> */}
    </div>
  )
}

export default ServiceRoomSetting