import React from 'react';
import { Card, Table } from 'antd';
import MobileDetect from 'mobile-detect';
import Constants from './carrerConstants';
import { getShortUUID } from '../timeline-section/helpers';
import SectionHeader from '../../section-header';


const CareerSection = () => {
  const md = new MobileDetect((window && window.navigator && window.navigator.userAgent) || '');
  const isMobile = md.mobile();
  const columns = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Contents',
      dataIndex: 'contents',
      key: 'contents',
    },
  ];

  return (
    <Card className="my-ant-card">
      <SectionHeader title="Career" />
      {isMobile && (
        <div className="my-career-table-warp">
          <ul className="my-career-mobile-ul">
            {Constants.CARRER_TABLE_VALUES.map(({ period, name, contents }) => {
              return (
                <div key={getShortUUID()}>
                  <li>{period.trim()}</li>
                  <ul>
                    <li>{contents.trim()}</li>
                  </ul>
                </div>
              );
            })}
          </ul>
        </div>
      )}
      {!isMobile && (
        <div className="my-career-table-warp">
          <Table
            columns={columns}
            dataSource={Constants.CARRER_TABLE_VALUES}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 1000 }}
          />
        </div>
      )}
    </Card>
  );
};

export default CareerSection;
