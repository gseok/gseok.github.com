import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Constants from './Constants';
import SyntaxHighlighter from 'react-syntax-highlighter';
import QRCode from 'qrcode.react';
import HorizontalTimeline from './timeline/Components/HorizontalTimeline';
import SwipeableViews from 'react-swipeable-views';
import Graph from 'react-graph-vis';
import Iframe from 'react-iframe';
import { github } from 'react-syntax-highlighter/dist/styles';
import { Flex, Box } from 'reflexbox';
import koKR from 'antd/lib/locale-provider/ko_KR';
import { LocaleProvider, Card, Icon, Tooltip, Row, Col, Table, Carousel } from 'antd';

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

    componentWillMount() {
        this.dates = Constants.TIME_LINE_VALUES.map((entry) => entry.date);
        this.views = Constants.TIME_LINE_VALUES.map((entry, index) => {
            const imageExists = (
                <Flex wrap align='center' justify="center">
                    <Box col={12} lg={6} md={6} sm={12}>
                        <div className='my-timeline-desc-image-warp'>
                            <img src={'./images/about/' + entry.image} 
                                 className='my-timeline-desc-image'></img>
                        </div>
                    </Box>
                    <Box col={12} lg={6} md={6} sm={12}>
                        <div className='my-timeline-descs-warp'
                             style={{'textAlign': 'center'}}>
                            <h4>{entry.term}</h4>
                            <h5>{entry.title}</h5>
                            <p></p>
                            <p>{entry.desc}</p>
                        </div>
                    </Box>
                </Flex>
            );
            const noImageExists = (
                <Flex wrap align='center' justify="center">
                    <Box col={12} lg={12} md={12} sm={12}>
                        <div className='my-timeline-descs-warp'
                             style={{'textAlign': 'center'}}>
                            <h4>{entry.term}</h4>
                            <h5>{entry.title}</h5>
                            <p></p>
                            <p>{entry.desc}</p>
                        </div>
                    </Box>
                </Flex>
            );
            return (
                <div className='my-timeline-desc-container' key={index}>
                    {(entry.image && entry.image.length > 0) ? (
                        imageExists
                    ) : (
                        noImageExists
                    )}
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
TimeLine.childContextTypes = {
    reflexbox: PropTypes.object
}

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
class TechSkill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Tech Skill'
        }
    }

    createContents() {
        const graph = {
            nodes: [
            { id: 1, label: 'My Tech Skills' },
                { id: 2, label: 'Programing Language' },
                    { id: 20, label: 'Javascript' },
                    { id: 21, label: 'Typescript' },
                    { id: 22, label: 'Java' },
                    { id: 23, label: 'C, C++' },
                { id: 3, label: 'Dev Tool' },
                    { id: 30, label: 'Code Editor' },
                        { id: 301, label: 'vscode' },
                        { id: 302, label: 'atom' },
                        { id: 303, label: 'eclipse' },
                        { id: 304, label: 'visual studio' },
                        { id: 305, label: 'sublime' },
                        { id: 306, label: 'vim' },
                    { id: 31, label: 'CI' },
                        { id: 310, label: 'jenkins' },
                    { id: 32, label: 'Version Control' },
                        { id: 320, label: 'git, gerrit' },
                        { id: 321, label: 'svn' },
                    { id: 33, label: 'Issue Control' },
                        { id: 330, label: 'jira' },
                        { id: 331, label: 'redmine' },
                        { id: 332, label: 'trac' },
                { id: 4, label: 'Web Tech' },
                    { id: 40, label: 'Framework or Tech' },
                        { id: 401, label: 'Reactjs' },
                        { id: 402, label: 'Dojo' },
                        { id: 403, label: 'JQuery UI' },
                        { id: 404, label: 'Node.js' },
                    { id: 41, label: 'Util' },
                        { id: 411, label: 'lodash' },
                        { id: 412, label: 'bluebird' },
                        { id: 413, label: 'jquery' },
                        { id: 414, label: 'async' },
                    { id: 42, label: 'Build or Bundler' },
                        { id: 421, label: 'webpack' },
                        { id: 422, label: 'gulp' },
                        { id: 423, label: 'babel' },
                        { id: 424, label: 'browserify' },
                    { id: 43, label: 'Lang' },
                        { id: 431, label: 'Javascript' },
                        { id: 432, label: 'CSS' },
                        { id: 433, label: 'HTML' },
                    { id: 45, label: 'Test' },
                        { id: 451, label: 'Jasmine' },
                        { id: 452, label: 'Qunit' },
                    { id: 46, label: 'Etc' },
                        { id: 461, label: 'electron' },
                        { id: 462, label: 'jekyll' },
                { id: 5, label: 'Co-Work' },
                    { id: 50, label: 'slack' },
                    { id: 51, label: 'telegram' },
                    { id: 52, label: 'confluence' }
            ],
            edges: [
                { from: 1, to: 2 },
                    { from: 2, to: 20 },
                    { from: 2, to: 21 },
                    { from: 2, to: 22 },
                    { from: 2, to: 23 },
                { from: 1, to: 3 },
                    { from: 3, to: 30 },
                        { from: 30, to: 301 },
                        { from: 30, to: 302 },
                        { from: 30, to: 303 },
                        { from: 30, to: 304 },
                        { from: 30, to: 305 },
                        { from: 30, to: 306 },
                    { from: 3, to: 31 },
                        { from: 31, to: 310 },
                    { from: 3, to: 32 },
                        { from: 32, to: 320 },
                        { from: 32, to: 321 },
                    { from: 3, to: 33 },
                        { from: 33, to: 330 },
                        { from: 33, to: 331 },
                        { from: 33, to: 332 },
                { from: 1, to: 4 },
                    { from: 4, to: 40 },
                        { from: 40, to: 401 },
                        { from: 40, to: 402 },
                        { from: 40, to: 403 },
                        { from: 40, to: 404 },
                    { from: 4, to: 41 },
                        { from: 41, to: 411 },
                        { from: 41, to: 412 },
                        { from: 41, to: 413 },
                        { from: 41, to: 414 },
                    { from: 4, to: 42 },
                        { from: 42, to: 421 },
                        { from: 42, to: 422 },
                        { from: 42, to: 423 },
                        { from: 42, to: 424 },
                    { from: 4, to: 43 },
                        { from: 43, to: 431 },
                        { from: 43, to: 432 },
                        { from: 43, to: 433 },
                    { from: 4, to: 45 },
                        { from: 45, to: 451 },
                        { from: 45, to: 452 },
                    { from: 4, to: 46 },
                        { from: 46, to: 461 },
                        { from: 46, to: 462 },
                { from: 1, to: 5 },
                    { from: 5, to: 50 },
                    { from: 5, to: 51 },
                    { from: 5, to: 52 },
            ]
        };

        const options = {
            autoResize: true,
            layout: {
                hierarchical: {
                    enabled: false,
                    levelSeparation: 50,
                    nodeSpacing: 50,
                    treeSpacing: 100,
                    blockShifting: true,
                    edgeMinimization: true,
                    parentCentralization: true,
                    direction: 'UD',        // UD, DU, LR, RL
                    sortMethod: 'hubsize'   // hubsize, directed
                }
            },
            edges: {
                arrows: {
                    to:     {enabled: false, scaleFactor:1, type:'arrow'},
                    middle: {enabled: false, scaleFactor:1, type:'arrow'},
                    from:   {enabled: false, scaleFactor:1, type:'arrow'}
                },

                color: {
                    color:'#848484',
                    highlight:'#848484',
                    hover: '#848484',
                    inherit: 'from',
                    opacity:1.0
                },
                font: {
                    color: '#343434',
                    size: 12, // px
                    face: 'arial',
                    background: 'none',
                    strokeWidth: 2, // px
                    strokeColor: '#ffffff',
                    align: 'horizontal',
                    multi: false,
                    vadjust: 0,
                    bold: {
                        color: '#343434',
                        size: 12, // px
                        face: 'arial',
                        vadjust: 0,
                        mod: 'bold'
                    },
                    ital: {
                        color: '#343434',
                        size: 12, // px
                        face: 'arial',
                        vadjust: 0,
                        mod: 'italic',
                    },
                    boldital: {
                        color: '#343434',
                        size: 12, // px
                        face: 'arial',
                        vadjust: 0,
                        mod: 'bold italic'
                    },
                    mono: {
                        color: '#343434',
                        size: 13, // px
                        face: 'courier new',
                        vadjust: 2,
                        mod: ''
                    }
                }
            }
        };
        const defaultStyle = {
            width: '100%',
            height: '500px'
        };
        const defaultEvents = {
            beforeDrawing: (ctx) => {
                // default scale change x1
                ctx.scale(1, 1);
            }
        };
        const zoomInfo = 'mouse wheel zooming in and out'

        return (
            <div>
                <Tooltip placement='right' title={zoomInfo}>
                    <Icon type='info-circle'/><span>&nbsp;zoom</span>
                </Tooltip>
                <Graph graph={graph} options={options}
                       events={defaultEvents}
                       style={defaultStyle}/>
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
class TechPPT extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Tech PPT',
            pptIndex: 0
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(pptIndex) {
        this.setState({pptIndex: pptIndex});
    }

    createContents() {
        const pptData = Constants.PPT_DATA;
        const pptViews = pptData.map((entry) => {
            return (
                <div key={entry.url}>
                    <Flex align='center' justify='center'>
                        <Box col={12} lg={12} md={12} sm={12}>
                            <a href={entry.url} target='_blank'>
                                <img src={entry.image}/>
                            </a>
                        </Box>
                    </Flex>
                </div>
            );
        });

        return (
            <div>
                <Carousel afterChange={this.onChange}>
                    {pptViews}
                </Carousel>
                <div className='my-ppt-descs-warp'>
                    <h5>{pptData[this.state.pptIndex].title}</h5>
                    <p></p>
                    <p>{pptData[this.state.pptIndex].desc}</p>
                </div>
            </div>
        );
    }

    render() {
        const contents = this.createContents();

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
