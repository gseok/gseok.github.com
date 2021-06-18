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
  }

  onChange(pptIndex) {
    this.setState({ pptIndex });
  }

  createContents() {
    const pptData = Constants.PPT_DATA;
    const pptViews = pptData.map((entry) => {
      return (
        <div key={entry.url}>
          <Flex align="center" justify="center">
            <Box col={12} lg={12} md={12} sm={12}>
              <a href={entry.url} target="_blank" rel="noreferrer">
                <img src={entry.image} alt={entry.title} />
              </a>
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
