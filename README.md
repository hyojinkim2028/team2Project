# 영화 검색 및 소개 서비스

<br/>
<br/>
https://hyojinkim2028.github.io/team2Project/
<br/>
<br/>
<br/>
<br/>

# 영화 검색 및 소개 서비스

<br/>

- 김효진

  > 메인페이지 하단 장르별 탭화면 구성& 슬라이드 기능
  > 관람평 로컬스토리지 데이터 작성, 조회, 상세페이지 css
  > 깃 관리, 코드 정리
  > <br/>

- 유은지
  > 메인페이지, 리스트페이지 css 작업
  > 메인페이지 상단 인기순위 & 평점순 순위 슬라이드 화면,
  > 모든 페이지 더보기 기능 구현
  > 모든 페이지 검색 기능 구현
  > 관람평 로컬스토리지 데이터 보여주기 및 수정, 삭제

<br/>

- 고병옥
  > 상세페이지 상세정보 데이터 가져오기
  > 상세페이지 동영상 부분 css
  > 관람평 입력 벨리데이션 체크

<br/>

- 하정현

  > 상세페이지 관람평 기능 메인 담당 - 조회, 작성, 삭제
  > 로컬스토리지 자료조사
  > <br/>

- 이상권
  > 상세페이지 동영상 불러오는 부분
  > 상세페이지 탭구성 담당
  > <br/>

## 프로젝트 개요

<br/>

> 영화 정보를 제공하는 서비스를 만들었습니다.<br/>
> 사용자는 원하는 순위로 영화를 볼 수 있으며, 영화를 장르별로 찾아볼 수 있는 기능을 제공합니다.<br/>
> 영화에 대한 간단한 영상과, 상세정보 또한 볼 수 있도록 서비스를 제공하고 있습니다. <br/>
> 사용자는 자신의 리뷰를 작성할 수 있으며 수정/삭제가 가능합니다.

<br/>  
<br/>  
<br/>  
<br/>

## 주요 기능

- 영화 검색 기능

  > TMDB API를 통해 영화 정보를 검색할 수 있습니다.

<br/><br/>

- 영화 소개

  > 영화에 대한 상세 정보 및 포스터를 제공합니다.

<br/><br/>

- 사용자 리뷰

  > 사용자는 로컬 스토리지를 사용하여 자신의 리뷰를 작성하고 확인할 수 있습니다.
  > 사용자는 비밀번호를 이용해 리뷰를 삭제, 수정 할 수 있습니다.

<br/><br/>

- 원하는 조건으로 영화 리스트 보기

  > 영화를 장르별로 필터링하여 찾을 수 있습니다.
  > 영화를 인기순으로 볼 수 있습니다.
  > 영화를 평점순으로 볼 수 있습니다.

<br/><br/>

- 검색 기능

  > 검색 기능은 모든 페이지에서 사용 가능합니다.

<br/><br/>

- 더보기 기능

  > 더보기 기능은 검색결과를 포함한 모든 페이지에서 사용 가능합니다.

<br/><br/>

- 이미지 없을때 다른 이미지
  > 영화 이미지가 존재하지 않는경우, 다른 이미지로 대체하여 보여줍니다.

<br/><br/>

<br/>
<br/>
<br/>
<br/>

## 사용 도구

<img style = "float:left" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/>
<img style = "float:left" src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS&logoColor=white"/>
<img style = "float:left" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img style = "float:left" src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=GIT&logoColor=white"/>
<img style = "float:left" src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GITHUB&logoColor=white"/>
<img style = "float:left" src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/>

</br>
</br>

> - Git 및 GitHub: 버전 관리 및 협업
> - Font Awesome: 프론트엔드 아이콘 사용
> - Swiper: 프론트엔드 카드 슬라이드 기능 사용
> - Figma: 와이어프레임 디자인
> - VS Code: 코드 편집기
> - HTML: 주요 프로그래밍 언어
> - CSS: 주요 프로그래밍 언어
> - JavaScript: 주요 프로그래밍 언어
> - TMDB API: 영화 정보 수집에 사용

</br>
</br>
</br>
</br>

## 팀원

</br>
</br>

> - 고병옥
> - 김효진
> - 유은지
> - 이상권
> - 하정현

## 폴더 구조

📦
├─ src
│  ├─ genreTap.js
│  ├─ swiper.js
│  ├─ main.js
│  │  └─ getData.js
│  │  └─ append.js
│  │  └─ go.js
│  │  └─ makeUrl.js
│  │  
│  ├─ list.js
│  │  └─ getData.js
│  │  └─ append.js
│  │  └─ go.js
│  │  └─ makeUrl.js
│  │  └─ more.js
│  │  
│  ├─ detail.js
└─
