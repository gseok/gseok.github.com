/*
    our about.js using react from 'in browser' style
    so do not need import 'react' and 'react-dom'
    we can directly using React.reactFuntion
*/

// import React from 'react';
// import ReactDOM from 'react-dom';

class App extends React.Component {
    render(){

        return (
                <h1>Hello React</h1>
        );
    }
}


const rootElement = document.getElementById('about-react-root');
ReactDOM.render(<App />, rootElement);