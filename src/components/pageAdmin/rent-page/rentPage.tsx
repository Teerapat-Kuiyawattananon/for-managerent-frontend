import React from 'react';
import { Button, Steps, theme, Modal } from 'antd'
import { useState } from 'react';
import './rentPage.css'
import FormApartment from './formApartment/FormApartment';
import FormRoomCreate from './formApartment/FormRoomCreate';
import FormBankAccount from './formApartment/FormBankAccount';
import SummaryApartment from './formApartment/SummaryApartment';
import {  useNavigate } from 'react-router-dom';


interface Form1ApartmentState {
    apartment_id: number
    name: string
    address: string
    contact_number: string
    number_of_floor: number
    number_of_room: number
    rent_amount: number
    water_unit_price: number
    information: string
    electricity_unit_price: number
    late_bill_price: number
    bill_date: Date
    late_bill_free_day: number
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

  interface FormBankAccount {
    apartment_id: number
    bank_name: string
    bank_account_name: string
    bank_account_number: string
}

interface FormCreateApartment {
    form1 : Form1ApartmentState
    form2 : Floor[]
    form3 : FormBankAccount
}

const RentPage: React.FC = () => {
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [modal, contextHolder] = Modal.useModal();
    const [valueData, setValueData] = useState<FormCreateApartment>({
        form1: {
            apartment_id: 0,
            name: '',
            address: '',
            contact_number: '',
            number_of_floor: 0,
            number_of_room: 0,
            rent_amount: 0,
            water_unit_price: 0,
            information: '',
            electricity_unit_price: 0,
            late_bill_price: 0,
            bill_date: new Date(),
            late_bill_free_day: 0
        },
        form2: [
            // {
            //     id: 0,
            //     floor_name: '',
            //     rooms: [
            //         {
            //             id: 0,
            //             floor_name: '',
            //             room_name: '',
            //             rent_amount: 0
            //         }
            //     ]
            // }
        ],
        form3: {
            apartment_id: 0,
            bank_name: '',
            bank_account_name: '',
            bank_account_number: ''
        }
    
    })

    const next = () => {
        console.log("valueData in rentPage", valueData)
        setCurrent(current + 1);
    }

    const prev = () => {
        setCurrent(current - 1);
    }

    const countDown = () => {
        let secondsTogo = 5;
        const instance = modal.success({
            title: 'ทำการสร้างหอพักสำเร็จเรียบร้อย',
            content: `ระบบจะทำการเปลี่ยนหน้าไปยังหอพักของท่านภายใน ${secondsTogo} วินาที`,
        });

        const timer = setInterval(() => {
            secondsTogo -= 1;
            instance.update({
                content: `ระบบจะทำการเปลี่ยนหน้าไปยังหอพักของท่านภายใน ${secondsTogo} วินาที`,
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            instance.destroy();
            navigate(`/apartment/${valueData.form1.apartment_id}/home`)
        }, secondsTogo * 1000);
    }
    const steps = [
            {
            title: 'กรอกรายละเอียดหอพัก',
            content: <FormApartment next={next} currentState={current} valueData={valueData}/>,
            },
            {
            title: 'กำหนดรายละเอียดห้องพัก',
            content: <FormRoomCreate next={next} currentState={current} valueData={valueData}/>,
            },
            {
            title: 'ช่องทางการชำระเงิน',
            content: <FormBankAccount next={next} prev={prev} currentState={current} valueData={valueData}/>,
            },
            {
                title: 'สรุปข้อมูล',
                content: <SummaryApartment valueData={valueData}/>,
            }
        ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    

    const contentStyle: React.CSSProperties = {
        // minHeight: 360,
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
        {/* {current === steps.length - 2 && (
          <Button type="primary" onClick={() => next()}>
            เสร็จสิ้น
          </Button>
        )} */}
        {current < steps.length - 2 && !(current === 0) && (
          <Button type="primary" style={{
            // background: "711DB0",
            // backgroundColor: "yellow"
          }} onClick={() => next() }>
            ต่อไป
          </Button>
        )}
        {current === steps.length - 1 && (
            <>
            <Button type="primary" onClick={countDown}>
            เสร็จสิ้น
          </Button>
          {contextHolder}
            </>
        )}
        {/* {current > 0 && !(current === steps.length - 2) && (
          <Button style={{ margin: '0 8px', background: "gray" , color: "white"}} onClick={() => prev()}>
            ย้อนกลับ
          </Button>
        )} */}
        
      </div>
    </>
    );
};

export default RentPage;