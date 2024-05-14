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
    period: '2020.11 - 2021.12',
    name: 'Naver KTX(Korail), 컨검,통검 엔드',
    contents:
      'Naver KTX(Korail), 컨검,통검 엔드 - End구현(메인홈, 지도, 라우팅), CollectionUI구현(메인홈, 액션버튼, 달력, 터미널선택, 내부시설, 외부시설), PR(Presentation Server) 개발',
  },
  {
    period: '2021.11 - 2021.12',
    name: 'Naver Map Open api 서버 개선 작업(1달작업후 홀딩)',
    contents:
      'Naver Map Open api 서버 개선 작업 - 구 phython서버를 deno서버로 교체',
  },
  {
    period: '2022.01 - 2022.03',
    name: 'Naver Map app-end 하프뷰 구현',
    contents:
      'Naver Map app-end 하프뷰 구현 - App 내의 webview end을 하프뷰 형태로 구현',
  },
  {
    period: '2022.03 - 2022.07',
    name: 'Naver 지하철, 컨검,통검 엔드 개발',
    contents:
      'Naver 지하철, 실시간 알림, 컨검,통검 엔드 개발 - End구현, CollectionUI구현, PR(Presentation Server) 개발',
  },
  {
    period: '2021.11 - 2023.09',
    name: 'Naver Map pc v5 react전환 개발',
    contents:
      'Naver Map pc v5 react전환 개발 작업 - 구 anguler구현체를 react(nest.js)형태로 교체',
  },
  {
    period: '2022.07 - 2022.09',
    name: 'Naver Map 내차등록 프로젝트 수행',
    contents:
      'Naver Map 내차등록 프로젝트 수행 - End구현, Nx(모노레포)도입',
  },
  {
    period: '2022.09 - 2023.01',
    name: 'Naver Map 즐겨찾기 widget 개발',
    contents:
      'Naver Map 즐겨찾기 widget 개발 - 공통lib구현, preact, signal',
  },
  {
    period: '2022.11 - 2023.04',
    name: 'Naver Map Open api 서버 개선',
    contents:
      'Naver Map Open api 서버 개선 작업 - 구 phython서버를 deno서버로 교체',
  },
  {
    period: '2023.04 - 2023.06',
    name: 'Naver Map 즐겨찾기 페이지 개발',
    contents:
      'Naver Map 즐겨찾기 페이지 개발 - solid.js, vite, fastify',
  },
  {
    period: '2023.06 - 2023.09',
    name: 'Naver Map 실시간 교통정보 페이지 개발',
    contents:
      'Naver Map 실시간 교통정보 페이지 개발 - react, vite, fastify, pnpm',
  },
  {
    period: '2023.07 - 2023.12',
    name: 'Naver Map 약관 페이지 개발',
    contents:
      'Naver Map 약관 페이지 개발 - react',
  },
  {
    period: '2024.01 - 2024.03',
    name: 'Naver Map 약관 이벤트 페이지 개발',
    contents:
      'Naver Map 약관 이벤트 페이지 개발 - react',
  },
  {
    period: '2024.01 - 2024.03',
    name: 'Naver Map 공항 엔드 개편',
    contents:
      'Naver Map 공항 엔드 개편 - 구 바닐라 js을 react로 교체',
  },
  {
    period: '2024.01 - 2024.04',
    name: 'Naver Map 지하철 엔드 실시간 위치 개편',
    contents:
      'Naver Map 지하철 엔드 실시간 위치 개편 - react',
  },
  {
    period: '2024.04 - 2024.05(진행중)',
    name: 'Naver Map 저장페이지 광고 추가 개발',
    contents:
      'Naver Map 저장페이지 광고 추가 개발 - solid.js, vite, fastify, pnpm',
  },
  {
    period: '2024.04 - 2024.05(진행중)',
    name: 'Naver Map ubi 약관 개편 개발',
    contents:
      'Naver Map ubi 약관 개편 개발 - react',
  },
]
  .map((item, index) => {
    return { ...item, key: `${index + 1}` };
  })
  .reverse();

const carrerSummaryValues =
  '\n \
2024.04 ~ 2024.05 : Naver Map 저장페이지 광고 추가 개발, ubi 약관 개편 개발 \n \
2024.01 ~ 2024.04 : Naver Map 지하철 엔드 실시간 위치 개편 \n \
2024.01 ~ 2024.03 : Naver Map 공항 엔드 개편 \n \
2024.01 ~ 2024.03 : Naver Map 약관 이벤트 페이지 개발 \n \
2023.07 ~ 2023.12 : Naver Map 약관 페이지 개발 \n \
2023.06 ~ 2023.09 : Naver Map 실시간 교통정보 페이지 개발 \n \
2023.04 ~ 2023.06 : Naver Map 즐겨찾기 페이지 개발 \n \
2022.11 ~ 2023.04 : Naver Map Open api 서버 개선 \n \
2022.09 ~ 2023.01 : Naver Map 즐겨찾기 widget 개발 수행 \n \
2022.07 ~ 2022.09 : Naver Map 내차등록 프로젝트 수행 \n \
2021.11 ~ 2022.07 : Naver Map pc v5 react개선 작업 \n \
2022.03 ~ 2022.07 : Naver 지하철, 컨검,통검 엔드 개발 - End구현, CollectionUI구현, PR(Presentation Server) 개발\n \
2022.01 ~ 2022.03 : Naver Map app-end 하프뷰 구현 \n \
2021.11 ~ 2021.12 : Naver Map Open api 서버 개선 작업 - Deno 향 구현(홀딩) \n \
2020.11 ~ 2021.12 : Naver KTX(Korail), 컨검,통검 엔드 개발 - End구현, CollectionUI구현, PR(Presentation Server) 개발\n \
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
