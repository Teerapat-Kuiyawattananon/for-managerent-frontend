import React from 'react';
import { Button, message, Steps, theme } from 'antd'
import { useState } from 'react';
import RoomListPageAdd1 from './roomlistformadd1-4/roomListPageAdd1';
import RoomListPageAdd2 from './roomlistformadd1-4/roomListPageAdd2';
import RoomListPageAdd3 from './roomlistformadd1-4/roomListPageAdd3';
import RoomListPageAdd4 from './roomlistformadd1-4/roomListPageAdd4';
import { Link, useParams } from 'react-router-dom';

interface FormRenterData {
  form1 : {
    name: string
    last_name: string
    nick_name: string
    birth_day: Date
    id_card_number: string
    email: string
    line_id : string
    address: string

    full_name: string;
    mobile_number: string;
    username: string; // same as email
    permanent_address : string;

    renter_id: number
}
  form2 :{
  address_p1: string;
  province_p: string;
  district_p: string;
  county_p: string;
  zipcode_p: string;
}
  }



const RoomListFromAdd : React.FC = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const { apartId, roomId} = useParams()
    const [ valueData, setValueData ] = useState<FormRenterData>({
       form1: {
        name: '',
        last_name: '',
        nick_name: '',
        birth_day: new Date(),
        id_card_number: '',
        email: '',
        line_id : '',
        address: '',
    
        full_name: '',
        mobile_number: '',
        username: '', // same as email
        permanent_address: '',

        renter_id: 0
      },  
      form2: {
        address_p1: '',
        province_p: '',
        district_p: '',
        county_p: '',
        zipcode_p: '',
      }
      });

    const next = () => {
        setCurrent(current + 1);
    }

    const prev = () => {
        setCurrent(current - 1);
    }
    const steps = [
            {
              title: 'กรอกรายละเอียด',
              content: <RoomListPageAdd1 next={next} currentState={current} valueData={valueData} />,
            },
            {
              title: 'ที่อยู่',
              content: <RoomListPageAdd2 next={next} currentState={current} valueData={valueData} />,
            },
            {
              title: 'เพิ่มบัตรประชาชน',
              content: <RoomListPageAdd3 next={next} currentState={current} valueData={valueData} />,
            },
            {
              title: 'สรุปผล',
              content: <RoomListPageAdd4 next={next} currentState={current} valueData={valueData} />,
            }
        ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    

    const contentStyle: React.CSSProperties = {
        // lineHeight: '500px',
        // textAlign: 'center',
        color: token.colorTextTertiary,
        // backgroundColor: token.colorFillAlter,
        // borderRadius: token.borderRadiusLG,
        // border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
      };


    return (
        <>
      <Steps current={current} items={items} />
      <div className='h-0.5 text-center bg-purple-theme my-3 w-full'>
        
        </div>
          {/* <FormApartment handleNext={next} /> */}
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {/* {current < steps.length - 1 && (
          <Button type="primary" style={{
            // background: "711DB0",
            // backgroundColor: "yellow"
          }} onClick={() => next() }>
            ต่อไป
          </Button>
        )} */}
        {current === steps.length - 1 && (
        <Link to={`/apartment/${apartId}/roomlist`}>
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        </Link>
        )}
        {/* {current > 0 && (
          <Button style={{ margin: '0 8px', background: "gray" , color: "white"}} onClick={() => prev()}>
            ย้อนกลับ
          </Button>
        )} */}
      </div>
    </>
    );
};

export default RoomListFromAdd;