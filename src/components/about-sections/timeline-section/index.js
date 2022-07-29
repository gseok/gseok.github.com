import React, { useCallback, useState, useMemo } from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import { Card } from 'antd';
import { Flex, Box } from 'reflexbox';
import Constants from './timeLineConstants';
import { getShortUUID } from './helpers';
import './style.scss';
import SectionHeader from '../../section-header';
import Image from '../../image';

const TimeLineSection = () => {
  const [index, setIndex] = useState(() => {
    return {
      value: Constants.TIME_LINE_VALUES.length - 1,
      previous: Constants.TIME_LINE_VALUES.length - 1,
    };
  });
  const dates = Constants.TIME_LINE_VALUES.map((entry) => entry.date);
  const views = useMemo(() => {
    return Constants.TIME_LINE_VALUES.map((entry, index) => {
      const imageExists = (
        <Flex wrap="true" align="center" justify="center" className="flex">
          <Box col={12} lg={6} md={6} sm={12} className="box">
            <div className="my-timeline-desc-image-warp">
              <Image
                src={`about-images/about/${entry.image}`}
                className="my-timeline-desc-image"
                alt={entry.title}
              />
            </div>
          </Box>
          <Box col={12} lg={6} md={6} sm={12} className="box">
            <div className="my-timeline-descs-warp" style={{ textAlign: 'center' }}>
              <h4>{entry.term}</h4>
              <h5>{entry.title}</h5>
              <p />
              <p>{entry.desc}</p>
            </div>
          </Box>
        </Flex>
      );
      const noImageExists = (
        <Flex wrap="true" align="center" justify="center" className="flex">
          <Box col={12} lg={12} md={12} sm={12}>
            <div className="my-timeline-descs-warp" style={{ textAlign: 'center' }}>
              <h4>{entry.term}</h4>
              <h5>{entry.title}</h5>
              <p />
              <p>{entry.desc}</p>
            </div>
          </Box>
        </Flex>
      );
      return (
        <div className="my-timeline-desc-container" key={getShortUUID()}>
          {entry.image && entry.image.length > 0 ? imageExists : noImageExists}
        </div>
      );
    });
  }, []);
  const timelineConfig = useMemo(() => {
    return {
      // timelineConfig
      minEventPadding: 20,
      maxEventPadding: 120,
      linePadding: 100,
      labelWidth: 100,
      fillingMotionStiffness: 150,
      fillingMotionDamping: 25,
      slidingMotionStiffness: 150,
      slidingMotionDamping: 25,
      stylesBackground: '#f8f8f8',
      stylesForeground: '#7b9d6f',
      stylesOutline: '#dfdfdf',
      isTouchEnabled: true,
      isKeyboardEnabled: true,
      isOpenEnding: true,
      isOpenBeginning: true,
    }
  }, []);

  const onClickHandler = useCallback((prev) => {
    return (cur) => {
      setIndex({ value: cur, previous: prev });
    }
  }, [setIndex]);

  return (
    <Card className="my-ant-card">
      <div className="timestamp-section">
        <SectionHeader title="Timestamps" />
        <div className="body">
          <div
            style={{
              width: "100%",
              height: "100px",
              margin: "0 auto"
            }}
          >
            <HorizontalTimeline
              styles={{
                background: "#f8f8f8",
                foreground: "#1A79AD",
                outline: "#dfdfdf"
              }}
              index={index.value}
              indexClick={onClickHandler(index.value)}
              values={dates}
              minEventPadding={timelineConfig.minEventPadding}
              maxEventPadding={timelineConfig.maxEventPadding}
              linePadding={timelineConfig.linePadding}
              labelWidth={timelineConfig.labelWidth}
              fillingMotion={{
                stiffness: timelineConfig.fillingMotionStiffness,
                damping: timelineConfig.fillingMotionDamping,
              }}
              slidingMotion={{
                stiffness: timelineConfig.slidingMotionStiffness,
                damping: timelineConfig.slidingMotionDamping,
              }}
            />
          </div>
          <div className="my-timeline-desc">
            {views[index.value]}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TimeLineSection;
