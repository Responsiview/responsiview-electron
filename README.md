# Responsiview

<div align="center">
  <img width="500" alt="스크린샷 2022-11-27 오후 11 00 19 (1)" src="https://user-images.githubusercontent.com/33389245/204139464-3d922e21-b9a8-4d35-9674-6d8f878692e8.png">
  <div align="center">
    <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=Electron&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
    <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black">
  </div>
<br/>
</div>

`Responsiview`는 `반응형`으로 제작된 웹 사이트를 기기별로 어떻게 `디스플레이` 되는지 하나의 화면에서 확인 할 수 있게 한, `데스크탑 어플리케이션` 입니다.

<br/>

## 목차

- [시연 영상 및 기능 목록](https://github.com/Responsiview/responsiview-electron/edit/dev/README.md#%EC%8B%9C%EC%97%B0-%EC%98%81%EC%83%81-%EB%B0%8F-%EA%B8%B0%EB%8A%A5-%EB%AA%A9%EB%A1%9D)
- [Challenges](https://github.com/Responsiview/responsiview-electron/edit/dev/README.md#challenges)
- [Issues](https://github.com/Responsiview/responsiview-electron/edit/dev/README.md#issues)
- [기술 스택](https://github.com/Responsiview/responsiview-electron/edit/dev/README.md#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
- [프로젝트 기간](https://github.com/Responsiview/responsiview-electron/edit/dev/README.md#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%EA%B0%84)
- [설치 방법](https://github.com/Responsiview/responsiview-electron/edit/dev/README.md#%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95)

<br/>
<br/>

## 시연 영상 및 기능 목록

https://user-images.githubusercontent.com/33389245/204161089-8f159e34-f1d4-4fdb-ac80-16a3754496eb.mov

- 스크롤 동기화
- URL 동기화
- 커스텀 Preset 관리
- First-Contetnful-Time 측정
- Zoom in/out

<br/>
<br/>

## Challenges

### 어떻게 여러 웹페이지를 표시하며, 기기에 맞는 화면을 표현할 것인가?

- 처음 시도한 방법은, [`iframe`](https://developer.mozilla.org/ko/docs/Web/HTML/Element/iframe) 태그를 사용해 src속성에 주소를 할당하는 방법이였습니다. <br/>
  하지만 `clickhijaking` 공격과 `DDoS` 공격을 막기위해, html 헤더에 [`X-Frame-Options`](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Frame-Options) 속성이 `same-origin` 또는 `deny` 로 설정된 사이트는 렌더링이 불가능한 문제가 발견되어 다른 방법을 찾아봤습니다.
- 두번째로 시도한 방법은, Electron의 [`BrowserView`](https://www.electronjs.org/docs/latest/api/browser-view)를 사용한 방법이였습니다. <br/>
  `BrowserView`는, Electron 공식문서에서 권장한 써드파티 웹 컨텐츠를 임베드할 수 있는 방식입니다. 컨텐츠를 컨트롤 할 수 있는 메서드 및 이벤트가 매우 많이 제공된다는 장점이 있지만, DOM이 아니며 Electron의 Main process(node.js 환경)에서 컨트롤 되기 때문에, 위치와 크기를 매번 직접 지정해줘야 하는 문제가 있어서, 여러대의 기기화면을 유동적으로 보여줘야 하는 프로젝트의 특성에 맞지 않는다는 판단이 들어 다른 방법을 찾아봤습니다.
- 마지막으로 시도한 방법은, chromium의 webview를 기반으로 한 Electron의 [`webview`](https://www.electronjs.org/docs/latest/api/webview-tag)태그 였습니다.<br/>
  `webview` 는 드라마틱한 구조(architectural) 변화를 겪고있다는 단점이 있었지만, DOM으로써 조작이 가능하며, 모든 사이트를 제약없이 접근이 가능하다는 점, 그리고 다양한 이벤트를 등록할 수 있으며 메서드를 제공한다는 장점이 있기 때문에 해당 방법을 통해 여러 웹페이지를 표현하였습니다.<br/>
- 이어서, 기기별 동일URL을 통해 웹사이트를 접속하더라도, 모바일 기기는 모바일 사이트로 리다이렉트 되는 기능을 구현하는 방법을 서치하는 과정에서, 서버는 접속요청을 보낸 기기의 `useragent` 정보를 분석해서 모바일기기의 경우 모바일 URL로 리다이렉트 하는 방식으로 구현되었다는 점을 알게됐고, useragent 리스트를 [검색](https://developers.whatismybrowser.com/useragents/explore/)해서 앱에 등록된 6종류의 기기에 맞는 useragent를 설정 한 뒤, webview태그의 속성에 할당하는 방식으로 기능을 구현했습니다. <br/><br/>

### 스크롤 동기화 기능은 어떻게 구현할 것인가?

- 처음 구상한 방식은 Electron의 Renderer Process와 Main Process의 통신방식인 [`IPC(Inter Process Communication)`](https://www.electronjs.org/docs/latest/tutorial/ipc)을 이용하는 방식이였습니다.<br/>
  webview태그가 실행되기 전, 스크립트를 실행할 수 있는 preload 파일을 사용해 스크롤이벤트를 webview 내부 window객체에 등록한 뒤, 이벤트 발생시 webview를 자식으로 가진 부모윈도우에 신호와 스크롤좌표를 보내고, 부모 윈도우에서는 Main Process로 신호와 값을 전달한 뒤, Main Process에서는 전체 Renderer Process(부모윈도우 및 모든 자식 Webview)에게 신호와 값을 보내 각각의 webview에서 스크롤좌표 동기화를 하려 했지만, 해당 신호는 부모윈도우만 수신할 수 있고, webview 내부에서는 신호를 수신할 수 없다는 문제점이 발견되어 대안으로, Web API인 `BroadcastChannel`을 사용하여 문제를 해결했습니다.<br/>
  해당 API를 사용하면 IPC 통신과 같은 복잡한 단계를 거치지 않아도, 동일한 URL에 접속한 webview간 특정 채널을 통해 통신이 가능하기 때문에, 단순화된 로직으로 기능 구현이 가능했습니다.
  <br/><br/>

## Issues

### 빌드된 App에서 firebase 로그인 불가이슈

- 개발 과정에서는 localhost환경에 react를 실행시킨뒤, electron에 해당 화면을 띄우는 방식을 사용했기 때문에, 로그인과정에 문제가 없는듯 했으나, 배포를 위해 빌드한 파일에서 firebase 로그인 이슈가 발견되었습니다. <br/>
  firebase에서는 http(https) 프로토콜을 사용한 요청에만 응답을 보내는 정책이 있고, 빌드된 일렉트론 앱에서는 file 프로토콜로 index.html 파일을 호출하기 때문에 firebase 에서 file 프로토콜을 통한 요청을 거부해서 발생한 이슈였습니다.<br/>
  이 문제를 해결하기 위해 로그인 페이지를 별도의 리액트 클라이언트 앱으로 분리한뒤 배포하고, 일렉트론 앱 내 로그인 버튼 클릭시 배포된 사이트를 호출하여 firebase 인증을 받고, api서버와 통신을 통해 로그인과정을 처리한 뒤, [`Deeplink`](https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app) 를 사용해 다시 일렉트론 앱을 실행시키며 사용자정보를 전달하는 방식을 사용해서 문제를 해결했습니다.<br/>
  이 때, 기존 개발환경에서는 서버에서 별도로 생성한 커스텀토큰(JWT)을 cookie에 직접 저장하는 방식을 사용했지만, `deeplink`를 사용한 방식으로는 쿠키를 다른 방식으로 저장했어야 했고, [`Electron의 Cookie Class`](https://www.electronjs.org/docs/latest/api/cookies)를 사용해 Main Process내에 쿠키를 저장하고, API 호출시 쿠키를 가져와 헤더에 실어 요청을 보내는 방식으로 변경했습니다.

### puppeteer을 통한 first-contentful-paint time의 부정확한 측정결과

- 처음 시도한 방식은, 기기별 `First-Contentful-Paint(*줄여서 FCP) time`을 측정하기 위해 Renderer Process에서 Main Process로 정보를 전달한 뒤, `puppeteer`을 사용해 background에서 async/await 방식으로 `순차적으로` 기기별 시간 측정을 했었습니다. 하지만, 해당 방식의 문제점은 항상 처음 측정된 기기의 FCP Time이 가장 높게 나오는 문제였었습니다. <br/>
저는 문제를 해결하기 위해, 모든 기기정보를 순회하며, page의 시간을 측정하는 Promise 배열을 생성하고, `Promise.all`을 사용해 동시다발적으로 FCP Time 측정이 되게 했고, 문제를 해결 할 수 있었습니다.
- 참고 코드

  ```js
  const Promises = deviceInfo.devices.map(async (device) => {
    const page = await browser.newPage();

    await page.setUserAgent(device.useragent);
    await page.setViewport({ width: device.width, height: device.height });
    await page.goto(deviceInfo.url);

    const FCPResult = await page.evaluate(async () => {
      const timeObject = {};

      performance.getEntriesByType("paint").forEach((entry) => {
        if (entry.name === "first-contentful-paint") {
          timeObject[entry.name] = entry.startTime;
        }
      });

      return timeObject;
    });
    
    return FCPResult;
  });

  const FCPResults = await Promise.all(Promises);
  ```

<br/>
<br/>

## 기술 스택

### App

`Electron`, `React`, `Redux`, `Styled-Components`, `Node.js`, `Firebase Google Auth`, `puppeteer`

### Server

`Node.js`, `Express`

### Deployment

`Netlify`, `electron-builder`, `AWS EB`

<br/>
<br/>

## 프로젝트 기간

- 기간 : 2022.11.07 ~ 2022.11.25 (총 19일)

  - Week1
    - 아이디어 수집 및 확정
    - POC (Proof Of Concept)
    - Figma를 사용한 Mockup 제작
    - Daily 태스크카드 제작
  - Week2 ~ Week3
    - 레이아웃 구현
    - 기능 개발
    - 버그 수정
    - 클라이언트 및 서버 배포

<br/>
<br/>

## 설치 방법

[Release page](https://github.com/Responsiview/responsiview-electron/releases)내 최신 버전의 dmg파일을 다운받아 응용프로그램으로 설치합니다.
