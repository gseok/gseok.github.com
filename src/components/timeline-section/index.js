import React, { useCallback, useState } from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import Constants from './timeLineConstants';
import SectionHeader from '../section-header';
import './style.scss';

const TimeLineSection = () => {
  const [index, setIndex] = useState(() => {
    return {
      value: Constants.TIME_LINE_VALUES.length - 1,
      previous: Constants.TIME_LINE_VALUES.length - 1,
    };
  });
  const dates = Constants.TIME_LINE_VALUES.map((entry) => entry.date);

  const curStatus = Constants.TIME_LINE_VALUES[index.value].date;
  const prevStatus = index.previous >= 0 ? Constants.TIME_LINE_VALUES[index.previous].date : "";

  const onClickHandler = useCallback((prev) => {
    return (cur) => {
      setIndex({ value: cur, previous: prev });
    }
  }, [setIndex]);

  return (
    <div className="timestamp-section">
      <SectionHeader title="Timestamps" />
      <div className="body">
        <div
          style={{
            width: "100%",
            height: "100px",
            margin: "0 auto",
            marginTop: "20px",
            fontSize: "15px"
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
          />
        </div>
        <div className="text-center">
          {/* Prevoius:-{prevStatus} - Current Select:-{curStatus} */}
          {curStatus}
        </div>
      </div>
    </div>
  );
}

export default TimeLineSection;
