import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Constants from './Constants';
import QRCode from 'qrcode.react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import { Flex, Box } from 'reflexbox';
import { Card, Icon, Tooltip } from 'antd';

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

module.exports = AboutMe;