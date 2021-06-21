/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
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
      isMounted: false,
    };
    this.contents = [];
    this.observer = null;

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // NOTE: 강제 re-render유발
    // react와 jekyll 같이 사용중인데, jekyll쪽에서 image preve용 클래스를 render이후 삽입한다.
    // 타이밍 이슈가 있기 때문에 강제로 re-render을 유발함
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 0);
  }

  componentDidUpdate() {
    if (this.state.isMounted) {
      this.contents = document.getElementsByClassName('my-ppt-item-wrap');
      const checkFancyBoxClass = (item) => item.getAttribute('class').indexOf('fancybox') > -1;
      const removeFancyBoxClass = (item) => {
        item.removeAttribute('class');
        item.setAttribute('class', 'my-ppt-item-wrap');
      };
      const fancyCheckLoop = (isCallObserve) => {
        for (let i = 0, len = this.contents.length; i < len; i += 1) {
          const item = this.contents[i];
          const hasFancyBox = checkFancyBoxClass(item);
          if (hasFancyBox) {
            removeFancyBoxClass(item);
          } else if (isCallObserve) this.observer.observe(item, { attributes: true });
        }
      };
      const callback = (mutationsList) => {
        for (let i = 0, len = mutationsList.length; i < len; i += 1) {
          const mutation = mutationsList[i];
          if (mutation.type === 'attributes') {
            fancyCheckLoop(false);
          }
        }
      };
      this.observer = new MutationObserver(callback);
      fancyCheckLoop(true);
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      // Later, you can stop observing
      this.observer.disconnect();
      this.observer = null;
    }
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
    const pptViews = pptData.map((entry, index) => {
      return (
        <div key={entry.url}>
          <Flex align="center" justify="center">
            <Box col={12} lg={12} md={12} sm={12}>
              <a href={entry.image} className="my-ppt-item-wrap">
                <img
                  className="my-ppt-item"
                  data-test={new Date().getTime()}
                  src={entry.image}
                  alt={entry.title}
                  onClick={this.onClick(entry.url)}
                  onKeyPress={() => {}}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  tabIndex={0}
                  aria-label={entry.title}
                />
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
