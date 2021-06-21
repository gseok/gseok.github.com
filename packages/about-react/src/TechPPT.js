import React from 'react';
import ReactDOM from 'react-dom';
import { Flex, Box } from 'reflexbox';
import { Card, Carousel } from 'antd';
import Constants from './Constants';

class TechPPT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: 'Tech PPT',
      pptIndex: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(pptIndex) {
    this.setState({ pptIndex });
  }

  onClick(url) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.open(url);
    };
  }

  createContents() {
    const pptData = Constants.PPT_DATA;
    const pptViews = pptData.map((entry) => {
      return (
        <div key={entry.url}>
          <Flex align="center" justify="center">
            <Box col={12} lg={12} md={12} sm={12}>
              <img
                className="my-ppt-item"
                src={entry.image}
                alt={entry.title}
                onClick={this.onClick(entry.url)}
                onKeyPress={() => {}}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
                tabIndex={0}
                aria-label={entry.title}
              />
            </Box>
          </Flex>
        </div>
      );
    });

    return (
      <div>
        <Carousel afterChange={this.onChange}>{pptViews}</Carousel>
        <div className="my-ppt-descs-warp">
          <h5>{pptData[this.state.pptIndex].title}</h5>
          <p />
          <p>{pptData[this.state.pptIndex].desc}</p>
        </div>
      </div>
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

export default TechPPT;
