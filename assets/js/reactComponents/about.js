import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Constants from './Constants';
import SyntaxHighlighter from 'react-syntax-highlighter';
import QRCode from 'qrcode.react';
import HorizontalTimeline from './timeline/Components/HorizontalTimeline';
import SwipeableViews from 'react-swipeable-views';
import { github } from 'react-syntax-highlighter/dist/styles';
import { Flex, Box } from 'reflexbox';
import koKR from 'antd/lib/locale-provider/ko_KR';
import { LocaleProvider, Card, Icon, Tooltip, Row, Col } from 'antd';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'About Me'
        }
    }

    getChildContext () {
        return {
            reflexbox: {
                breakpoints: {
                    sm: '(min-width: 30em)',
                    md: '(min-width: 48em)',
                    lg: '(min-width: 77.5em)'
                }
            }
        };
    }

    createContents() {
        const aboutMeCodeString = Constants.ABOUT_ME_CODE_STRING;
        const aboutMeString = Constants.ABOUT_ME_STRING;
        const aboutMeStringEn = Constants.ABOUT_ME_STRING_EN;
        const aboutMeLikesString = Constants.ABOUT_ME_LIKES;

        return (
            <Flex wrap>
                <Box col={12} lg={4} md={4} sm={12}>
                    <img src='./images/gseok.jpg' alt='gyeongseok seo'/>
                    <div>
                        <Icon type='mail'/>
                        <a href="mailto:gseok.seo@gmail.com">
                            &nbsp;&nbsp;gseok.seo@gmail.com
                        </a>
                    </div>
                    <div>
                        <Icon type='home'/>
                        <a href="http://gseok.tistory.com">
                            &nbsp;&nbsp;Blog
                        </a>
                    </div>
                    <div>
                        <Icon type='github'/>
                        <a href="https://github.com/gseok">
                            &nbsp;&nbsp;Github
                        </a>
                    </div>
                    <div>
                        <Icon type='book'/>
                        <a href="https://www.gitbook.com/@gseok">
                            &nbsp;&nbsp;GitBook
                        </a>
                    </div>
                    <div>
                        <Icon type='heart'/>
                        <Tooltip placement='rightTop' title={aboutMeLikesString}>
                            <span>&nbsp;&nbsp;Like & Love</span>
                        </Tooltip>
                    </div>
                    <div>
                        <Icon type='barcode'/>
                        <span>&nbsp;&nbsp;QRCode</span>
                        <div>
                            <QRCode size={64} value='http://gseok.github.io' level='L'/>
                        </div>
                    </div>
                </Box>
                <Box col={12} lg={8} md={8} sm={12}>
                    <li>Introduction</li>
                    <SyntaxHighlighter language='javascript' style={github}>
                        {aboutMeCodeString}
                    </SyntaxHighlighter>
                    <br></br>
                    <SyntaxHighlighter language='tex' style={github}>
                        {aboutMeString}
                    </SyntaxHighlighter>
                </Box>
            </Flex>
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
AboutMe.childContextTypes = {
    reflexbox: PropTypes.object
}

class TimeLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Time Line',
            value: (Constants.TIME_LINE_VALUES.length - 1),
            previous: (Constants.TIME_LINE_VALUES.length - 1),

            // timelineConfig
            minEventPadding: 20,
            maxEventPadding: 120,
            linePadding: 100,
            labelWidth: 100,
            fillingMotionStiffness: 150,
            fillingMotionDamping: 25,
            slidingMotionStiffness: 150,
            slidingMotionDamping: 25,
            stylesBackground: '#f8f8f8',
            stylesForeground: '#7b9d6f',
            stylesOutline: '#dfdfdf',
            isTouchEnabled: true,
            isKeyboardEnabled: true,
            isOpenEnding: true,
            isOpenBeginning: true,
        };

        this.onClickIndex = this.onClickIndex.bind(this);
    }

    componentWillMount() {
        this.dates = Constants.TIME_LINE_VALUES.map((entry) => entry.date);
        this.views = Constants.TIME_LINE_VALUES.map((entry, index) => {
            return (
                <div className='my-timeline-desc-container' key={index}>
                    <h4>{entry.title}</h4>
                    <hr/>
                    <p>TODO</p>
                </div>
            );
        });
    }

    onClickIndex(index) {
        this.setState((prevState) => {
            return {
                value: index,
                previous: prevState.value
            }
        });
    }

    createContents() {
        return (
            <div>
                <div className='my-timeline'>
                    <HorizontalTimeline
                        values={this.dates}
                        index={this.state.value}
                        indexClick={this.onClickIndex}

                        minEventPadding={this.state.minEventPadding}
                        maxEventPadding={this.state.maxEventPadding}
                        linePadding={this.state.linePadding}
                        labelWidth={this.state.labelWidth}
                        fillingMotion={{
                            stiffness: this.state.fillingMotionStiffness,
                            damping: this.state.fillingMotionDamping
                        }}
                        slidingMotion={{
                            stiffness: this.state.slidingMotionStiffness,
                            damping: this.state.slidingMotionDamping
                        }}
                        styles={{
                            background: this.state.stylesBackground,
                            foreground: this.state.stylesForeground,
                            outline: this.state.stylesOutline
                        }}
                        isTouchEnabled={this.state.isTouchEnabled}
                        isKeyboardEnabled={this.state.isKeyboardEnabled}
                        isOpenEnding={this.state.isOpenEnding}
                        isOpenBeginning={this.state.isOpenBeginning}
                    />
                </div>
                <div className='my-timeline-desc'>
                    <SwipeableViews
                        index={this.state.value}
                        resistance>
                        {this.views}
                    </SwipeableViews>
                </div>
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

class Career extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Career'
        }
    }

    createContents() {
        return (
            <div>TODO</div>
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
class TechSkill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Tech Skill'
        }
    }

    createContents() {
        return (
            <div>TODO</div>
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
class TechPPT extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Tech PPT'
        }
    }

    createContents() {
        return (
            <div>TODO</div>
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