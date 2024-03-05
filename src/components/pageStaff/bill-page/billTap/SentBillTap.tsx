import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SendBillTable from './SentbillTable';


interface Room {
  // key: number;
  id: number;
  floor_name: string;
  room_name: string;
  rent_amount: number;
  statue: string;
  information: string;
}

interface RoomData {
  key: string;
  floor: string;
  roomName: string;
  tenantName: string;
  roomRent: number;
  roomStatus: string;
}

const data = [
  {
    key: '1',
    floor: '1',
    roomName: '101',
    tenantName: 'สมโชค',
    roomRent: 5000,
    roomStatus: 'available',
  },
  {
    key: '2',
    floor: '1',
    roomName: '102',
    tenantName: 'สมหมาย',
    roomRent: 4500,
    roomStatus: 'unavailable',
  },
  {
    key: '3',
    floor: '1',
    roomName: '103',
    tenantName: 'สมชาย',
    roomRent: 5000,
    roomStatus: 'unavailable',
  },
  {
    key: '4',
    floor: '2',
    roomName: '104',
    tenantName: 'สมเพรช',
    roomRent: 5000,
    roomStatus: 'unavailable',
  },
  {
    key: '5',
    floor: '3',
    roomName: '104',
    tenantName: 'สมเพรช',
    roomRent: 5000,
    roomStatus: 'unavailable',
  },
];


const RoomListPage: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [roomsData, setRoomsData] = React.useState<RoomData[]>([]);
  const { apartId } = useParams()
  

  useEffect(() => {
    const fetchData = async () => {
      // const res = await RoomService.getRoomsList(Number(apartId));
      // setRoomsData(res.data);
      console.log("After Get", roomsData)
    }

    fetchData()
      .catch(console.error)
  }, [])
  return (
    <>
      <div>
        <SendBillTable data={roomsData}/>
      </div>

    </>
  );
};

export default RoomListPage;