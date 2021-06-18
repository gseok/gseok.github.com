import React from 'react';
import PropTypes from 'prop-types';
import Constants from './Constants';
import HorizontalTimeline from './timeline/Components/HorizontalTimeline';
import SwipeableViews from 'react-swipeable-views';
import { Flex, Box } from 'reflexbox';
import { Card } from 'antd';

class TimeLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: 'Time Line',
            value: (Constants.TIME_LINE_VALUES.length - 1),
            previous: (Constants.TIME_LINE_VALUES.length - 1),

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
        };

        this.onClickIndex = this.onClickIndex.bind(this);
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

    componentWillMount() {
        this.dates = Constants.TIME_LINE_VALUES.map((entry) => entry.date);
        this.views = Constants.TIME_LINE_VALUES.map((entry, index) => {
            const imageExists = (
                <Flex wrap align='center' justify="center">
                    <Box col={12} lg={6} md={6} sm={12}>
                        <div className='my-timeline-desc-image-warp'>
                            <img src={'../assets/about-images/about/' + entry.image}
                                 className='my-timeline-desc-image'></img>
                        </div>
                    </Box>
                    <Box col={12} lg={6} md={6} sm={12}>
                        <div className='my-timeline-descs-warp'
                             style={{'textAlign': 'center'}}>
                            <h4>{entry.term}</h4>
                            <h5>{entry.title}</h5>
                            <p></p>
                            <p>{entry.desc}</p>
                        </div>
                    </Box>
                </Flex>
            );
            const noImageExists = (
                <Flex wrap align='center' justify="center">
                    <Box col={12} lg={12} md={12} sm={12}>
                        <div className='my-timeline-descs-warp'
                             style={{'textAlign': 'center'}}>
                            <h4>{entry.term}</h4>
                            <h5>{entry.title}</h5>
                            <p></p>
                            <p>{entry.desc}</p>
                        </div>
                    </Box>
                </Flex>
            );
            return (
                <div className='my-timeline-desc-container' key={index}>
                    {(entry.image && entry.image.length > 0) ? (
                        imageExists
                    ) : (
                        noImageExists
                    )}
                </div>
            );
        });
    }

    onClickIndex(index) {
        this.setState((prevState) => {
            return {
                value: index,
                previous: prevState.value
            }
        });
    }

    createContents() {
        return (
            <div>
                <div className='my-timeline'>
                    <HorizontalTimeline
                        values={this.dates}
                        index={this.state.value}
                        indexClick={this.onClickIndex}

                        minEventPadding={this.state.minEventPadding}
                        maxEventPadding={this.state.maxEventPadding}
                        linePadding={this.state.linePadding}
                        labelWidth={this.state.labelWidth}
                        fillingMotion={{
                            stiffness: this.state.fillingMotionStiffness,
                            damping: this.state.fillingMotionDamping
                        }}
                        slidingMotion={{
                            stiffness: this.state.slidingMotionStiffness,
                            damping: this.state.slidingMotionDamping
                        }}
                        styles={{
                            background: this.state.stylesBackground,
                            foreground: this.state.stylesForeground,
                            outline: this.state.stylesOutline
                        }}
                        isTouchEnabled={this.state.isTouchEnabled}
                        isKeyboardEnabled={this.state.isKeyboardEnabled}
                        isOpenEnding={this.state.isOpenEnding}
                        isOpenBeginning={this.state.isOpenBeginning}
                    />
                </div>
                <div className='my-timeline-desc'>
                    <SwipeableViews
                        index={this.state.value}
                        resistance>
                        {this.views}
                    </SwipeableViews>
                </div>
            </div>
        );
    }

    render() {
        const contents = this.createContents();

        return (
            <Card className='my-ant-card' title={this.state.label}>
                {contents}
            </Card>
        );
    }
}
TimeLine.childContextTypes = {
    reflexbox: PropTypes.object
}

export default TimeLine;
