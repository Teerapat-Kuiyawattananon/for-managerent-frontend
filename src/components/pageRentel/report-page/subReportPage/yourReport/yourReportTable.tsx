import React, { useState } from 'react';
import { Table, Button, ConfigProvider } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface ReportTableProps {
    data: ReportTableData[];
}

export interface ReportTableData {
    key: React.Key;
    placeName: string;
    problemName: string;
    sentDate: Date;
    reportStatus: string;
}


const YourReportTable: React.FC<ReportTableProps> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        // Show selected item.
        const selectedRows = data.filter(item => newSelectedRowKeys.includes(item.key));
        console.log('Selected Rows Data: ', selectedRows);
    };
    
    const rowSelection: TableRowSelection<ReportTableData> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function statusColor(status: string) {
        let color;
        switch (status) {
            case 'ยังไม่รับแจ้งปัญหา':
            case 'รับแจ้งปัญหาแแล้ว':
            case 'กำลังดำเนินการแก้ไข':
                color = 'red';
                break;
            case 'แก้ไขเสร็จสิ้นรอยืนยัน':
                color = 'blue'
                break;
            case 'แก้ไขเสร็จสิ้น':
                color = 'green';
                break;
            default:
                color = 'inherit'; // Default color
        }
        return <span style={{ color }}>{status}</span>;
    }
    

    const columns: TableColumnsType<ReportTableData> = [
        {
            title: 'สถานที่ที่เกิดปัญหา',
            dataIndex: 'placeName',
            key: 'placeName',
        },
        {
            title: 'ชื่อปัญหา',
            dataIndex: 'problemName',
            key: 'problemName',
        },
        {
            title: 'วันที่แจ้ง',
            dataIndex: 'sentDate',
            key: 'sentDate',
        },
        {
            title: 'สถานะการดำเนินการ',
            dataIndex: 'reportStatus',
            key: 'reportStatus',
            filters: [
                { text: 'ยังไม่รับแจ้งปัญหา', value: 'ยังไม่รับแจ้งปัญหา' },
                { text: 'รับแจ้งปัญหาแแล้ว', value: 'รับแจ้งปัญหาแแล้ว' },
                { text: 'กำลังดำเนินการแก้ไข', value: 'กำลังดำเนินการแก้ไข' },
                { text: 'แก้ไขเสร็จสิ้นรอยืนยัน', value: 'แก้ไขเสร็จสิ้นรอยืนยัน' },
                { text: 'แก้ไขเสร็จสิ้น', value: 'แก้ไขเสร็จสิ้น' },
            ],
            onFilter: (value, record: ReportTableData) => {
                return record.reportStatus === value;
            },
            render: statusColor,
        },
        {
            title: 'การกระทำ',
            dataIndex: 'action',
            key: 'action',
            render: () => (
                <>
                        <Link to="/anouncn/reportstate"> 
                            <Button>
                                <FileOutlined />
                            </Button>
                        </Link>
                    
                </>
            ),
        }
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    padding: 8,
                },
            }}
        >
            <div>
                <Table columns={columns} dataSource={data} pagination={undefined} rowSelection={rowSelection} />
            </div>
        </ConfigProvider>
    );
};

export default YourReportTable