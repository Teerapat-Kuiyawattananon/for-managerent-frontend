import React, { useEffect, useState } from 'react';
import { Button, Space, Modal, Upload, message, Image } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import RoomListTable from './roomListTable';
import RoomService from './../../../services/room.service';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useParams } from 'react-router-dom';

interface Room {
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

const RoomListPage: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [roomsData, setRoomsData] = React.useState<RoomData[]>([]);
  const { apartId } = useParams()
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setFileList([info.file]);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await RoomService.getRoomsList(Number(apartId));
      setRoomsData(res.data);
      console.log("After Get", roomsData)
    }

    fetchData()
      .catch(console.error)
  }, [])


  return (
    <>
      <div>
        <div className="mb-5">
        <Upload {...props} showUploadList={false}>
          <Button type ="primary"icon={<UploadOutlined />}>เพิ่มรูปภาพผังห้องพัก</Button>
        </Upload>

          {fileList.length > 0 && <Image src={fileList[0].thumbUrl} />}
        </div>
        <RoomListTable data={roomsData} />
      </div>
    </>
  );
};

export default RoomListPage;
