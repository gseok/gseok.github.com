import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import koKR from 'antd/lib/locale-provider/ko_KR';
import { LocaleProvider, Card } from 'antd';

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

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'About Me'
        }
    }

    createContents() {
        return (
            <img src='./images/gseok.jpg' alt='gyeongseok seo'/>
        );
    }

    render() {
        let contents = this.createContents();

        return (
            <Card title={this.state.label}>
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
            <Card title={this.state.label}>
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
            <Card title={this.state.label}>
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
            <Card title={this.state.label}>
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
            <Card title={this.state.label}>
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
                    <AboutMe/>
                    <TimeLine/>
                    <Career/>
                    <TechSkill/>
                    <TechPPT/>
                </div>
            </LocaleProvider>
        );
    }
}

const aboutRoot = document.getElementById('root');
ReactDOM.render(<App />, aboutRoot);