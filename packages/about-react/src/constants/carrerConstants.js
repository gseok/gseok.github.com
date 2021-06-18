/* eslint-disable no-multi-str */
const carrerTableValues = [
  {
    key: '1',
    period: '2009.03 - 2010.06',
    name: 'tmax window',
    contents: 'MFC 호환 DLL 개발 - DLL library 개발',
  },
  {
    key: '2',
    period: '2010.07 - 2011.02',
    name: 'wac',
    contents: 'WAC IDE 개발 - Run, Project Wizard 개발',
  },
  {
    key: '3',
    period: '2011.03 - 2013.08',
    name: 'tizen',
    contents: 'Tizen IDE 개발 - Run, Debug, CLI, Sample App, 개발',
  },
  {
    key: '4',
    period: '2013.08 - 2014.03',
    name: 'webida',
    contents: 'Web Base IDE 개발 - Project Wizard, Menu System, Preview, Plug-in System, UI/UX 개발',
  },
  {
    key: '5',
    period: '2014.03 - 2014.11',
    name: 'uip',
    contents: 'UI Prototyping Tool 개발 - Model, Widget, Preview, Rendering 개발',
  },
  {
    key: '6',
    period: '2014.11 - 2015.03',
    name: 'cafe note',
    contents: 'Web Base Editor 개발 - widget 개발',
  },
  {
    key: '7',
    period: '2015.13 - 2016.01',
    name: 'wsdk',
    contents: 'Tizen Web Base IDE 개발 - Project Wizard, Manifest Editor 개발',
  },
  {
    key: '8',
    period: '2016.01 - 2016.12',
    name: 'insator',
    contents: 'Data Preperation Tool 개발 - Dashboard, Project Wizard, Property UI, Template Wizard 개발',
  },
  {
    key: '9',
    period: '2017.01 - 2017.04',
    name: 'vscode',
    contents: 'Vscode tizen C# extention 개발 - Create, Build, Sign, Packaging, Install, Run 개발',
  },
  {
    key: '10',
    period: '2017.04 - 2017.12',
    name: 'Smartthings Local SDK',
    contents:
      'Smartthings Local SDK (atom extension) 개발 - Logger, Device Profile, Run As, CI(Jenkins), build, installer 개발',
  },
  {
    key: '11',
    period: '2018.01 - 2018.06',
    name: 'Smartthings Web SDK',
    contents: 'Smartthings Web SDK 개발 - Logger, Automation(OnBoarding), Hub Connected, React to Vue 개발',
  },
];

const carrerSummaryValues =
  '\n \
2018.01 ~ now : Smartthings Web SDK 개발중 - Logger, Automation(OnBoarding), Hub Connected, React to Vue 개발\n \
2017.04 ~ 2017.12 : Smartthings Local SDK (atom extension) 개발 - Logger, Device Profile, Run As, CI(Jenkins), build, installer 개발\n \
2017.01 ~ 2017.04 : m-tizen: VSCode Extension개발 (Visual Studio Code Extension - tizen extension) 개발\n \
2016.01 ~ 2016.12 : Insator - (data preperation design) tool 개발\n \
2015.03 ~ 2016.01 : Tizen Web Based IDE - client develop(Project Wizard, Menifest Editor)\n \
2014.11 ~ 2015.03 : Web Editor Project - UI part, widget 개발, plugin 개발\n \
2014.03 ~ 2014.11 : Web Technology Cell - UIP(UI Prototyping Tool) project - model part\n \
2013.08 ~ 2014.03 : Core1실 Programing System Lab - webida팀 - webida 개발\n \
2012.03 ~ 2013.08 : Core1실 Programing System Lab - IDE팀 - Tizen SDK - Web IDE part. - tizen 1.0 ~ 2.2 까지의 release, CLI, launch, test 담당\n \
2011.02 ~ 2012.03 : Core1실 Program Enviroment 2 Team - 삼성 과제 수행 - SLP SDK - WAC part.\n \
2011.01 ~ 2011.02 : Core1실 Compiler Team - 삼성 과제 수행 - SLP SDK - WAC part.\n \
2010.10 ~ 2011.01 : Core1실 Compiler Team - 삼성 과제 수행 - SLP SDK - Release, WAC, Usability part.\n \
2010.07 ~ 2010.10 : Core1실 Compiler Team - Mobile Platform 개발\n \
2010.04 ~ 2010.06 : Core1실 Framework Team - 호환 DLL 개발 - MFC\n \
2009.03 ~ 2010.03 : Core3실 Framework Team - 호환 DLL 개발 - MFC\n \
';

module.exports = {
  CARRER_TABLE_VALUES: carrerTableValues,
  CARRER_SUMMARY_VALUES: carrerSummaryValues,
};
