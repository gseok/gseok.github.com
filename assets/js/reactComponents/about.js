import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Test extends React.Component {
    render() {
        return (
            <div>Test</div>
        );
    }
}

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
                <div className='textdesc'>
                    <label className='textdesc-label'>{label}</label>
                    <div>
                        <div className='textdesc-title'>{title}</div>
                        <div className='textdesc-text'>{text}</div>
                    </div>
                </div>
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