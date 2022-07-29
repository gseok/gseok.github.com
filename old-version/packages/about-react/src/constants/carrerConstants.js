/* eslint-disable no-multi-str */
const carrerTableValues = [
  {
    period: '2009.03 - 2010.06',
    name: 'tmax window',
    contents: 'tmax window MFC 호환 DLL 개발 - DLL library 개발',
  },
  {
    period: '2010.07 - 2011.02',
    name: 'wac',
    contents: 'WAC IDE 개발 - Run, Project Wizard 개발',
  },
  {
    period: '2011.03 - 2013.08',
    name: 'tizen',
    contents: 'Tizen IDE 개발 - Run, Debug, CLI, Sample App, 개발',
  },
  {
    period: '2013.08 - 2014.03',
    name: 'webida',
    contents: 'Web Base IDE 개발 - Project Wizard, Menu System, Preview, Plug-in System, UI/UX 개발',
  },
  {
    period: '2014.03 - 2014.11',
    name: 'uip',
    contents: 'UI Prototyping Tool 개발 - Model, Widget, Preview, Rendering 개발',
  },
  {
    period: '2014.11 - 2015.03',
    name: 'cafe note',
    contents: 'Web Base Editor 개발 - widget 개발',
  },
  {
    period: '2015.13 - 2016.01',
    name: 'wsdk',
    contents: 'Tizen Web Base IDE 개발 - Project Wizard, Manifest Editor 개발',
  },
  {
    period: '2016.01 - 2016.12',
    name: 'insator',
    contents: 'Data Preperation Tool 개발 - Dashboard, Project Wizard, Property UI, Template Wizard 개발',
  },
  {
    period: '2017.01 - 2017.04',
    name: 'vscode',
    contents: 'Vscode tizen C# extention 개발 - Create, Build, Sign, Packaging, Install, Run 개발',
  },
  {
    period: '2017.04 - 2017.12',
    name: 'Smartthings Local SDK',
    contents:
      'Smartthings Local SDK (atom extension) 개발 - Logger, Device Profile, Run As, CI(Jenkins), build, installer 개발',
  },
  {
    period: '2018.01 - 2018.08',
    name: 'Smartthings Web SDK',
    contents: 'Smartthings Web SDK 개발 - Logger, Automation(OnBoarding), Hub Connected, React to Vue 개발',
  },
  {
    period: '2018.08 - 2019.05',
    name: 'Naver Maps Admin Tool',
    contents: 'Naver Maps Admin Tool 개발 - POI편집툴, 다국어관리툴, 배너관리툴, 관리툴 서버 개발',
  },
  {
    period: '2018.08 - 2019.12',
    name: 'Naver Maps(Pc-V5)',
    contents:
      'Naver Maps(Pc-V5) 개발 - 날씨, 실내지도, 지도검색 Sync, 버전관리, Og Tag, 인쇄저장, Api proxy Sever 개발',
  },
  {
    period: '2019.05 - 2019.12',
    name: 'Naver MyPlace',
    contents:
      'Naver MyPlace 개발 - ClientUI(메인홈, 즐겨찾기, 리스트 상세, 장소편집, 지도보기), GraphQL서버 개발, MyPlace 발견하기 관리툴 개발',
  },
  {
    period: '2019.11 - 2019.12',
    name: 'Naver Ketch App',
    contents: 'Naver Ketch App 개발 - Maps App WebView 대중교통 요소(지하철, 공항, 항만, 터미널) App의 web view개발',
  },
  {
    period: '2020.01 - 2020.10',
    name: 'Naver 버스터미널, 컨검,통검 엔드',
    contents:
      'Naver 버스터미널, 컨검,통검 엔드 개발 - End구현(메인홈, 지도, 라우팅), CollectionUI구현(메인홈, 액션버튼, 달력, 터미널선택, 내부시설, 외부시설), PR(Presentation Server) 개발',
  },
  {
    period: '2020.11 - 2021.06(Now)',
    name: 'Naver KTX(Korail), 컨검,통검 엔드',
    contents:
      'Naver KTX(Korail), 컨검,통검 엔드 - End구현(메인홈, 지도, 라우팅), CollectionUI구현(메인홈, 액션버튼, 달력, 터미널선택, 내부시설, 외부시설), PR(Presentation Server) 개발',
  },
]
  .map((item, index) => {
    return { ...item, key: `${index + 1}` };
  })
  .reverse();

const carrerSummaryValues =
  '\n \
2020.11 ~ 2021.06(Now) : Naver KTX(Korail), 컨검,통검 엔드 개발 - End구현, CollectionUI구현, PR(Presentation Server) 개발\n \
2020.01 ~ 2020.10 : Naver 버스터미널, 컨검,통검 엔드 개발 - End구현, CollectionUI구현, PR(Presentation Server) 개발\n \
2019.11 ~ 2019.12 : Naver Ketch App 개발 - Maps App WebView 대중교통 요소(지하철, 공항, 항만, 터미널) App의 web view개발\n \
2019.05 ~ 2019.12 : Naver MyPlace 개발 - ClientUI(메인홈, 즐겨찾기, 리스트 상세, 장소편집, 지도보기), GraphQL서버 개발, MyPlace 발견하기 관리툴 개발\n \
2018.08 ~ 2019.12 : Naver Maps(Pc-V5) 개발 - 날씨, 실내지도, 지도검색 Sync, 버전관리, Og Tag, 인쇄저장, Api proxy Sever 개발\n \
2018.08 ~ 2019.05 : Naver Maps Admin Tool 개발 - POI편집툴, 다국어관리툴, 배너관리툴, 관리툴 서버 개발\n \
2018.01 ~ 2018.08 : Smartthings Web SDK 개발 - Logger, Automation(OnBoarding), Hub Connected, React to Vue 개발\n \
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
const carrerConstants = {
  CARRER_TABLE_VALUES: carrerTableValues,
  CARRER_SUMMARY_VALUES: carrerSummaryValues,
};

export default carrerConstants;
