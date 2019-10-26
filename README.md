# Study Log
에버노트에 작성한 공부한 내용을 한 눈에 볼 수 있게 웹앱을 만들어봤습니다. 처음으로 결과물이 나온 개인 프로젝트입니다. 예쁘게 봐주세요^^

## 프로세스 소개
1. 프로그래밍 관련해서 공부한 내용을 모두 에버노트에 작성해 놓습니다.  

![에버노트 예시](./images/evernote.png)

2. 작성해놓은 노트들의 정보를 [에버노트 api](https://dev.evernote.com/)를 통해 얻습니다.

3. 에버노트 api를 통해 얻은 데이터를 저의 필요에 따라 가공해 mongoDB에 저장해놓습니다.  

4. DB에 저장한 데이터를 express로 직접 만든 rest api를 통해 불러와 vue로 만든 웹앱에 보기 좋게 띄워주면 다음과 같은 화면을 볼 수 있습니다.

![스터디로그 스크린샷](./images/study_log.png)

## 도움을 받은 요소들
- [evernote SDK for javascript](http://dev.evernote.com/doc/start/javascript.php)
- OAuth1.0: 에버노트 api는 OAuth2.0을 사용하지 않는다.
- [vue-calendar-heatmap](https://github.com/WildCodeSchool/vue-calendar-heatmap)

## 해야 할 일
- 배포: [heroku](https://www.heroku.com/), [mLab](https://mlab.com/) 사용 예정



