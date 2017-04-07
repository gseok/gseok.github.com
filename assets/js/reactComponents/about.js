'use strict';

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
            <div class='intro-pane'>
                <div class='label'>
                    {this.props.label}
                </div>
                <div class='contents'>
                    {this.props.contents}
                </div>
            </div>
        );
    }
}
IntroPane.propTypes = {
    label: React.PropTypes.string,
    contents: React.PropTypes.element
};

class AboutMe extends React.Component {
    getInitialState() {
        return {
            label: 'About Me'
        }
    }

    render() {
        let label = this.state.label;
        console.log(label + '......');

        return (
            <IntroPane label={this.state.label}
                       contents={this.state.contents}/>
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


const aboutRoot = document.getElementById('about-react-root');
ReactDOM.render(<App />, aboutRoot);