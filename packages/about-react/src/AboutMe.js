/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';
import { Flex, Box } from 'reflexbox';
import { Card, Icon, Tooltip } from 'antd';
import Constants from './Constants';

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: 'About Me',
    };
  }

  getChildContext() {
    return {
      reflexbox: {
        breakpoints: {
          sm: '(min-width: 30em)',
          md: '(min-width: 48em)',
          lg: '(min-width: 77.5em)',
        },
      },
    };
  }

  createBoxItem({ type, href, text }) {
    return (
      <div key={`${type}-${text}`}>
        <Icon type={type} />
        <a target="_blank" href={href} rel="noreferrer">
          &nbsp;&nbsp;{text}
        </a>
      </div>
    );
  }

  createContents() {
    const aboutMeCodeString = Constants.ABOUT_ME_CODE_STRING;
    const aboutMeString = Constants.ABOUT_ME_STRING;
    const aboutMeLikesString = Constants.ABOUT_ME_LIKES;

    const items = [
      {
        type: 'mail',
        href: 'mailto:gseok.seo@gmail.com',
        text: 'gseok.seo@gmail.com',
      },
      {
        type: 'home',
        href: 'https://gseok.github.io',
        text: 'Blog',
      },
      {
        type: 'github',
        href: 'https://github.com/gseok',
        text: 'Github',
      },
    ];

    return (
      <Flex wrap>
        <Box col={12} lg={4} md={4} sm={12}>
          <img src="../assets/about-images/gseok.jpg" alt="gyeongseok seo" />
          {items.map((item) => {
            return this.createBoxItem(item);
          })}

          <div>
            <Icon type="heart" />
            <Tooltip placement="rightTop" title={aboutMeLikesString}>
              <span>&nbsp;&nbsp;Like & Love</span>
            </Tooltip>
          </div>
          <div>
            <Icon type="barcode" />
            <span>&nbsp;&nbsp;QRCode</span>
            <div>
              <QRCode size={64} value="http://gseok.github.io" level="L" />
            </div>
          </div>
        </Box>
        <Box col={12} lg={8} md={8} sm={12}>
          <li>Introduction</li>
          <SyntaxHighlighter language="javascript" style={github}>
            {aboutMeCodeString}
          </SyntaxHighlighter>
          <br />
          <SyntaxHighlighter language="tex" style={github}>
            {aboutMeString}
          </SyntaxHighlighter>
        </Box>
      </Flex>
    );
  }

  render() {
    const contents = this.createContents();

    return (
      <Card className="my-ant-card" title={this.state.label}>
        {contents}
      </Card>
    );
  }
}

AboutMe.childContextTypes = {
  reflexbox: PropTypes.object,
};

export default AboutMe;
