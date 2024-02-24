import React ,{ useState } from 'react';
import { NotificationOutlined } from '@ant-design/icons';
import './homePage.css';

const HomePage: React.FC = () => {
    
    return (
        <div>
            <span><NotificationOutlined />  ข้อมูลข่าวสาร </span>
            <div className="dividerUnder"> <style> </style> </div>
             
      <div className="dataContainer">
        <h2>ไม่มีประกาศในขณะนี้</h2>
        <p></p>
        <div className="imageContainer">
          {/* รูปภาพจะอยู่ในสี่เหลี่ยมผืนผ้า */}
          <img src="path_to_image" alt="รูปภาพ" />
        </div>
      </div>
        </div>
        
    );
};

export default HomePage;