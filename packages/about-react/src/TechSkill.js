import React from 'react';
import ReactDOM from 'react-dom';
import Graph from 'react-graph-vis';
import { Card, Icon, Tooltip } from 'antd';
import Constants from './Constants';

class TechSkill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: 'Tech Skill',
    };
  }

  createContents() {
    const graph = {
      nodes: [
        { id: 1, label: 'My Tech Skills' },
        { id: 2, label: 'Programing Language' },
        { id: 20, label: 'Javascript' },
        { id: 21, label: 'Typescript' },
        { id: 22, label: 'Java' },
        { id: 23, label: 'C, C++' },
        { id: 3, label: 'Dev Tool' },
        { id: 30, label: 'Code Editor' },
        { id: 301, label: 'vscode' },
        { id: 302, label: 'atom' },
        { id: 303, label: 'eclipse' },
        { id: 304, label: 'visual studio' },
        { id: 305, label: 'sublime' },
        { id: 306, label: 'vim' },
        { id: 31, label: 'CI' },
        { id: 310, label: 'jenkins' },
        { id: 32, label: 'Version Control' },
        { id: 320, label: 'git, gerrit' },
        { id: 321, label: 'svn' },
        { id: 33, label: 'Issue Control' },
        { id: 330, label: 'jira' },
        { id: 331, label: 'redmine' },
        { id: 332, label: 'trac' },
        { id: 4, label: 'Web Tech' },
        { id: 40, label: 'Framework or Tech' },
        { id: 401, label: 'React' },
        { id: 402, label: 'Redux' },
        { id: 403, label: 'Vue.js' },
        { id: 404, label: 'Dojo' },
        { id: 405, label: 'JQuery UI' },
        { id: 406, label: 'Node.js' },
        { id: 41, label: 'Util' },
        { id: 411, label: 'lodash' },
        { id: 412, label: 'bluebird' },
        { id: 413, label: 'jquery' },
        { id: 414, label: 'async' },
        { id: 42, label: 'Build or Bundler' },
        { id: 421, label: 'webpack' },
        { id: 422, label: 'gulp' },
        { id: 423, label: 'babel' },
        { id: 424, label: 'browserify' },
        { id: 43, label: 'Lang' },
        { id: 431, label: 'Javascript' },
        { id: 432, label: 'CSS' },
        { id: 433, label: 'HTML' },
        { id: 45, label: 'Test' },
        { id: 451, label: 'Jasmine' },
        { id: 452, label: 'Qunit' },
        { id: 46, label: 'Etc' },
        { id: 461, label: 'electron' },
        { id: 462, label: 'jekyll' },
        { id: 5, label: 'Co-Work' },
        { id: 50, label: 'slack' },
        { id: 51, label: 'telegram' },
        { id: 52, label: 'confluence' },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 2, to: 20 },
        { from: 2, to: 21 },
        { from: 2, to: 22 },
        { from: 2, to: 23 },
        { from: 1, to: 3 },
        { from: 3, to: 30 },
        { from: 30, to: 301 },
        { from: 30, to: 302 },
        { from: 30, to: 303 },
        { from: 30, to: 304 },
        { from: 30, to: 305 },
        { from: 30, to: 306 },
        { from: 3, to: 31 },
        { from: 31, to: 310 },
        { from: 3, to: 32 },
        { from: 32, to: 320 },
        { from: 32, to: 321 },
        { from: 3, to: 33 },
        { from: 33, to: 330 },
        { from: 33, to: 331 },
        { from: 33, to: 332 },
        { from: 1, to: 4 },
        { from: 4, to: 40 },
        { from: 40, to: 401 },
        { from: 40, to: 402 },
        { from: 40, to: 403 },
        { from: 40, to: 404 },
        { from: 4, to: 41 },
        { from: 41, to: 411 },
        { from: 41, to: 412 },
        { from: 41, to: 413 },
        { from: 41, to: 414 },
        { from: 4, to: 42 },
        { from: 42, to: 421 },
        { from: 42, to: 422 },
        { from: 42, to: 423 },
        { from: 42, to: 424 },
        { from: 4, to: 43 },
        { from: 43, to: 431 },
        { from: 43, to: 432 },
        { from: 43, to: 433 },
        { from: 4, to: 45 },
        { from: 45, to: 451 },
        { from: 45, to: 452 },
        { from: 4, to: 46 },
        { from: 46, to: 461 },
        { from: 46, to: 462 },
        { from: 1, to: 5 },
        { from: 5, to: 50 },
        { from: 5, to: 51 },
        { from: 5, to: 52 },
      ],
    };

    const options = {
      autoResize: true,
      layout: {
        hierarchical: {
          enabled: false,
          levelSeparation: 50,
          nodeSpacing: 50,
          treeSpacing: 100,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD', // UD, DU, LR, RL
          sortMethod: 'hubsize', // hubsize, directed
        },
      },
      edges: {
        arrows: {
          to: { enabled: false, scaleFactor: 1, type: 'arrow' },
          middle: { enabled: false, scaleFactor: 1, type: 'arrow' },
          from: { enabled: false, scaleFactor: 1, type: 'arrow' },
        },

        color: {
          color: '#848484',
          highlight: '#848484',
          hover: '#848484',
          inherit: 'from',
          opacity: 1.0,
        },
        font: {
          color: '#343434',
          size: 12, // px
          face: 'arial',
          background: 'none',
          strokeWidth: 2, // px
          strokeColor: '#ffffff',
          align: 'horizontal',
          multi: false,
          vadjust: 0,
          bold: {
            color: '#343434',
            size: 12, // px
            face: 'arial',
            vadjust: 0,
            mod: 'bold',
          },
          ital: {
            color: '#343434',
            size: 12, // px
            face: 'arial',
            vadjust: 0,
            mod: 'italic',
          },
          boldital: {
            color: '#343434',
            size: 12, // px
            face: 'arial',
            vadjust: 0,
            mod: 'bold italic',
          },
          mono: {
            color: '#343434',
            size: 13, // px
            face: 'courier new',
            vadjust: 2,
            mod: '',
          },
        },
      },
    };
    const defaultStyle = {
      width: '100%',
      height: '500px',
    };
    const defaultEvents = {
      beforeDrawing: (ctx) => {
        // default scale change x1
        ctx.scale(1, 1);
      },
    };
    const zoomInfo = 'mouse wheel zooming in and out';

    return (
      <div>
        <Tooltip placement="right" title={zoomInfo}>
          <Icon type="info-circle" />
          <span>&nbsp;zoom</span>
        </Tooltip>
        <Graph graph={graph} options={options} events={defaultEvents} style={defaultStyle} />
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

export default TechSkill;
