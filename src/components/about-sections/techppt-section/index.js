import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Card, Carousel } from 'antd';
import { Flex, Box } from 'reflexbox';
import Constants from './pptConstants';
import SectionHeader from '../../section-header';
import Image from '../../image';

const pptData = Constants.PPT_DATA;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

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
        <div key={entry.url}>
          <a href={entry.image} className="my-ppt-item-wrap">
            <Image
              className="my-ppt-item"
              data-test={new Date().getTime()}
              src={entry.image}
              alt={entry.title}
              onClick={onClick(entry.url)}
              onKeyPress={() => {}}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="button"
              tabIndex={0}
              aria-label={entry.title}
            />
          </a>
        </div>
      );
    });
  }, []);

  console.log('.. ppt...!!@!');

  const entry = pptData[pptIndex];

  return (
    <Card className="my-ant-card">
      <SectionHeader title="Tech PPT" />
      <div>
          <a href={entry.image} className="my-ppt-item-wrap">
            <Image
              className="my-ppt-item"
              data-test={new Date().getTime()}
              src={entry.image}
              alt={entry.title}
              onClick={onClick(entry.url)}
              onKeyPress={() => {}}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role="button"
              tabIndex={0}
              aria-label={entry.title}
            />
          </a>
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
