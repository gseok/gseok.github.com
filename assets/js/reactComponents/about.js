import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';

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

class IntroPane extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='intro-pane'>
                <div className='label'>
                    {this.props.label}
                </div>
                <div className='contents'>
                    {this.props.contents}
                </div>
            </div>
        );
    }
}
IntroPane.propTypes = {
    label: PropTypes.string,
    contents: PropTypes.element
};

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'About Me'
        }
    }

    createAboutContents() {
        let label = 'Introduction';
        let title = 'intro me';
        let text = 'hi all~~~';

        return (
            <div>
                <img src='./images/gseok.jpg'/>
                <TextDesc/>
                <DatePicker />
            </div>
        );
    }

    render() {
        let contents = this.createAboutContents();

        return (
            <IntroPane label={this.state.label}
                       contents={contents}/>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <AboutMe/>
                <IntroPane label='Time Line'/>
                <IntroPane label='Career'/>
                <IntroPane label='Tech Skill'/>
                <IntroPane label='Tech PPT'/>
            </div>
        );
    }
}

const aboutRoot = document.getElementById('root');
ReactDOM.render(<App />, aboutRoot);