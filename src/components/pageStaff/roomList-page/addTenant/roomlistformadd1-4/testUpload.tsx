import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import axios from 'axios';
import React from 'react'

const testUpload = () => {
    const [file, setFile] = React.useState<File[]>([]);
    const props: UploadProps = {
        beforeUpload: (file) => {
          const isPNG = file.type === 'image/png';
          if (!isPNG) {
            message.error(`${file.name} is not a png file`);
          }
          return isPNG || Upload.LIST_IGNORE;
        },
        onChange: async (info : any) => {
        //   console.log(info.file);
        //   console.log("type", info.file.type)
        //   console.log("info origin", info.file.originFileObj)
        //   console.log("check type", typeof info.file.originFileObj)
          const formData = new FormData();
          formData.append("userId", "1");
          formData.append('files', info.file.originFileObj);
          const res = await axios.post('http://localhost:3232/test-upload', formData);
          console.log("res", res)
          // add file to state
        //   const newData = ...file
          
        // formData.append('file', info.file.originFileObj);
        //   console.log("file", new File([info.file.originFileObj], info.file.name, { type: info.file.type })
        //   console.log("type file", typeof file)
        // let file = new File([info.file.originFileObj], info.file.name, { type: info.file.type });
        // setFile(file)
        },
      };

    // const handlerFileUpload = ({ file } : File) => {
    //     console.log(file)
    // }

    // const handleChange = (info: { file: File }) => {
    //     const file = info.file;
    //     console.log("file form handleChange", file)
    //   };
  return (
    <div>
      <Upload  {...props}>
    <Button icon={<UploadOutlined />}>Upload png only</Button>
  </Upload>
    </div>
  )
}

export default testUpload