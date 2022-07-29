import React, { useCallback, useState, useMemo } from 'react';
import { Card } from 'antd';
import { Flex, Box } from 'reflexbox';
import Carousel from 'nuka-carousel';
import Constants from './pptConstants';
import SectionHeader from '../../section-header';
import Image from '../../image';

const pptData = Constants.PPT_DATA;

const TechPPTSection = () => {
  const [pptIndex, setPPTIndex] = useState(0);

  const onClick = useCallback((url) => {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.open(url);
    }
  }, []);

  const contents = useMemo(() => {
    return pptData.map((entry) => {
      return (
        <div key={entry.url} className="my-ppt-top-wrap">
          <Flex align="center" justify="center">
            <Box col={12} lg={12} md={12} sm={12}>
              <button className="my-ppt-item-wrap" onClick={onClick(entry.url)}>
                <Image
                  className="my-ppt-item"
                  data-test={new Date().getTime()}
                  src={entry.image}
                  alt={entry.title}
                  onKeyPress={() => {}}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  tabIndex={0}
                  aria-label={entry.title}
                />
              </button>
            </Box>
          </Flex>
        </div>
      );
    });
  }, [onClick]);

  return (
    <Card className="my-ant-card">
      <SectionHeader title="Tech PPT" />
      <div>
        <Carousel
          pauseOnHover
          cellAlign="center"
          afterSlide={(index) => {
            setPPTIndex(index);
          }}
          beforeSlide={(_cur, end) => {
            setPPTIndex(end);
          }}
        >{contents}</Carousel>
        <div className="my-ppt-descs-warp">
          <h5>{pptData[pptIndex].title}</h5>
          <p />
          <p>{pptData[pptIndex].desc}</p>
        </div>
      </div>
    </Card>
  );
};

export default TechPPTSection;
