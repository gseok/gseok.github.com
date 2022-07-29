import React from 'react';
import { Card, Icon, Tooltip, Table } from 'antd';
import MobileDetect from 'mobile-detect';
import Constants from './Constants';
import { getShortUUID } from './timeline/helpers';

class Career extends React.Component {
  constructor(props) {
    super(props);

    const md = new MobileDetect((window && window.navigator && window.navigator.userAgent) || '');
    this.state = {
      label: 'Career',
      isMobile: md.mobile(),
    };
  }

  createContents() {
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

    if (this.state.isMobile) {
      return (
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
      );
    }

    return (
      <div className="my-career-table-warp">
        <Tooltip className="career-tooltip" placement="right" title={Constants.CARRER_SUMMARY_VALUES}>
          <Icon type="info-circle" />
          <span>&nbsp;summary</span>
        </Tooltip>
        <Table
          columns={columns}
          dataSource={Constants.CARRER_TABLE_VALUES}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 1000 }}
        />
      </div>
    );
  }

  render() {
    const contents = this.createContents();

    return (
      <Card className="my-ant-card" title={this.state.label}>
        {contents}
      </Card>
    );
  }
}

export default Career;
