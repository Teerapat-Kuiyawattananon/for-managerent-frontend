import React , {useState}from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Button} from 'antd';
import FillBillTable from './fillBillTable';
import dayjs from 'dayjs';



const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

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
  const date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}/${month.toString().padStart(2, '0')}`;
        console.log(currentDate)
  const monthFormat = 'YYYY/MM';

  

const FillBillTap: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

  const handleEditSave = () => {
    if (isEditing) {
      // โค้ดสำหรับบันทึกข้อมูลหลังจากการแก้ไข
    } else {
      // โค้ดสำหรับเปิดโหมดแก้ไข
    }
    setIsEditing(!isEditing);
  };
    return (
        <div>
            <DatePicker defaultValue={dayjs(currentDate, monthFormat)} format={monthFormat} picker="month" style={{ marginBottom: '20px' }}/>
            <FillBillTable data={data}/>
            {isEditing ? 
                <Button type={"primary"} onClick={handleEditSave} style={{ marginTop: '20px', marginRight: '10px' }}>
                {'บันทึก'}
              </Button> 
              :
                <Button htmlType='submit' type={"default"} onClick={handleEditSave} style={{ marginTop: '20px', marginRight: '10px' }}>
                {'แก้ไข'}
              </Button>
            }
            
        </div>
    );
};

export default FillBillTap;