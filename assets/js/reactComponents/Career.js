import React from 'react';
import ReactDOM from 'react-dom';
import Constants from './Constants';
import { Card, Icon, Tooltip, Table } from 'antd';

class Career extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Career'
        }
    }

    createContents() {
        const columns = [{
            title: 'Period',
            dataIndex: 'period',
            key: 'period'
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Contents',
            dataIndex: 'contents',
            key: 'contents'
        }];

        return (
            <div className='my-career-table-warp'>
                <Tooltip className='career-tooltip' placement='right'
                         title={Constants.CARRER_SUMMARY_VALUES}>
                    <Icon type='info-circle'/><span>&nbsp;summary</span>
                </Tooltip>
                <Table columns={columns}
                       dataSource={Constants.CARRER_TABLE_VALUES}/>
            </div>
        );
    }

    render() {
        let contents = this.createContents();

        return (
            <Card className='my-ant-card' title={this.state.label}>
                {contents}
            </Card>
        );
    }
}

module.exports = Career;