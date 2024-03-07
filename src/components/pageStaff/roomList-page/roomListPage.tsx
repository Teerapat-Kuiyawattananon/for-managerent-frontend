import React, { useEffect ,useState} from 'react';
import { Button, Space, Modal, Upload  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import RoomListTable from './roomListTable';
import RoomService from './../../../services/room.service';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useParams } from 'react-router-dom';

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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });




const RoomListPage: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [roomsData, setRoomsData] = React.useState<RoomData[]>([]);
  const { apartId } = useParams()

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
   

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  

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
        <p className =' mb-5 text-lg font-bold'>
            เพิ่มรูปภาพผังห้องพัก
        </p>
      <div className= "mb-5">
      <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      </div>
        {/* <Space style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />}>เพิ่มรูปภาพผังห้องพัก</Button>
        </Space> */}
        <RoomListTable data={roomsData}/>
      </div>

    </>
  );
};

export default RoomListPage;