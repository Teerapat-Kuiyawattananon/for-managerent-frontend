import React from 'react';
import { Button, message, Steps, theme } from 'antd'
import { useState } from 'react';
import RoomListPageAdd1 from './roomaddpage/roomListPageAdd1';
import RoomListPageAdd2 from './roomaddpage/roomListPageAdd2';
import RoomListPageAdd3 from './roomaddpage/roomListPageAdd3';
import RoomListPageAdd4 from './roomaddpage/roomListPageAdd4';


const RoomListFromAdd : React.FC = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    }

    const prev = () => {
        setCurrent(current - 1);
    }
    const steps = [
            {
              title: 'กรอกรายละเอียด',
              content: <RoomListPageAdd1 next={next} currentState={current} />,
            },
            {
              title: 'เพิ่มบัตรประชาชน',
              content: <RoomListPageAdd2 next={next} currentState={current} />,
            },
            {
              title: 'ที่อยู่',
              content: <RoomListPageAdd3 next={next} currentState={current} />,
            },
            {
              title: 'สรุปผล',
              content: <RoomListPageAdd4 next={next} currentState={current} />,
            }
        ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    

    const contentStyle: React.CSSProperties = {
        lineHeight: '500px',
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
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px', background: "gray" , color: "white"}} onClick={() => prev()}>
            ย้อนกลับ
          </Button>
        )}
      </div>
    </>
    );
};

export default RoomListFromAdd;