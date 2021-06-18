import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import koKR from 'antd/lib/locale-provider/ko_KR';
import { LocaleProvider, Row, Col } from 'antd';

import AboutMe from './AboutMe';
import TimeLine from './TimeLine';
import Career from './Career';
import TechSkill from './TechSkill';
import TechPPT from './TechPPT';

class App extends React.Component {
    render() {
        return (
            <LocaleProvider locale={koKR}>
                <div>
                    <Row className='my-ant-row'><Col span={24}><AboutMe/></Col></Row>
                    <Row className='my-ant-row'><Col span={24}><TimeLine/></Col></Row>
                    <Row className='my-ant-row'><Col span={24}><Career/></Col></Row>
                    <Row className='my-ant-row'><Col span={24}><TechSkill/></Col></Row>
                    <Row className='my-ant-row'><Col span={24}><TechPPT/></Col></Row>
                </div>
            </LocaleProvider>
        );
    }
}

const aboutRoot = document.getElementById('root');
ReactDOM.render(<App />, aboutRoot);
