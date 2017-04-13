import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import koKR from 'antd/lib/locale-provider/ko_KR';
import { LocaleProvider, Card, Row, Col } from 'antd';

class TextDesc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLabel: true
        };
    }

    onClick() {
        console.log('onClick', this);

        // this.setState({
        //     showLabel: true
        // }, function () {
        //     console.log('callback');
        // });

        // this.setState((prevState, props) => {
        //     console.log('setState with function', prevState, props);
        //     this.state = !this.prevState;
        // }, () => {
        //     console.log('callback');
        // });
    }

    // onClick2 = () => {
    //     console.log('onClick2', this);
    // }

    render() {
        if (this.state.showLabel) {
            return (
                <div className='textdesc'>
                    <button onClick={this.onClick.bind(this)}>test</button>
                    <button onClick={(e) => this.onClick(e)}>test2</button>
                    <label className='textdesc-label'>{this.props.label}</label>
                    <div>
                        <div className='textdesc-title'>{this.props.title}</div>
                        <div className='textdesc-text'>{this.props.text}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='textdesc'>
                    <div>
                        <div className='textdesc-title'>{this.props.title}</div>
                        <div className='textdesc-text'>{this.props.text}</div>
                    </div>
                </div>
            );
        }
    }
}
TextDesc.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
};
TextDesc.defaultProps = {
    label: 'No Label',
    title: 'No Title',
    text: 'No Text'
};

const aboutMeCodeString =
`() => {
    let i = 'Web Developer.';
    let say = 'I am thinking about everything can do in Web.';
    let hello = 'And hello everyone~';

    console.log(i, say, hello);
}`;
const aboutMeString =
`안녕하세요, 저는 웹 개발자 입니다.
웹 개발을 좋아하고, 재미있어합니다.
웹의 새로운 기술을 경험하는것은 항상 도전적인 일입니다.
우리가 생각하는 모든것을 웹에서 모두 다 할 수 있다고 생각합니다.
요새 React에 관심이 생겨 이 페이지를 React로 작성해 보았습니다.
`;

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'About Me'
        }
    }

    createContents() {
        return (
            <Row gutter={4}>
                <Col span={8}>
                    <img src='./images/gseok.jpg' alt='gyeongseok seo'/>
                </Col>
                <Col span={16}>
                    <li>Introduction</li>
                    <SyntaxHighlighter language='javascript' style={github}>
                        {aboutMeCodeString}
                    </SyntaxHighlighter>
                    <br></br>
                    <SyntaxHighlighter language='tex' style={github}>
                        {aboutMeString}
                    </SyntaxHighlighter>
                </Col>
            </Row>
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
class TimeLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Time Line'
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