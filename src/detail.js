// 상세페이지 영화 아이디 값
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// 기존 리뷰데이터 저장된 변수
const oldReviews = JSON.parse(window.localStorage.getItem(movieId)) ?? [];

// 삭제, 수정 시 필요한 데이터를 담은 변수
let modifyGet = window.localStorage.getItem(movieId);
modifyGet = JSON.parse(modifyGet);

// 탭버튼 구성
const tabItem = document.querySelectorAll(".tab_item");
const tabInner = document.querySelectorAll(".tab_inner");
let paramId = "";


//리뷰작성후 페이지 리로드 된다면 리뷰 탭으로 자동 보여주기
const urlVal = window.location.search;

if (urlVal.includes("review")) {
  tabInner[0].classList.remove("active");
  tabInner[1].classList.add("active");
  tabItem[0].classList.remove("active");
  tabItem[1].classList.add("active");
}

// 상세페이지 탭버튼 구성 
tabItem.forEach((tab, idx) => {
  // 탭 버튼에 클릭 이벤트를 준다
  tab.addEventListener("click", function () {
    tabInner.forEach((inner) => {
      inner.classList.remove("active");
    });

    tabItem.forEach((item) => {
      item.classList.remove("active");
    });

    // 탭 버튼과 탭 내용 영역의 index에 해당하는 부분에 active 클래스를 추가한다 
    // 만약 첫번째 탭을 클릭했다면, 같은 인덱스에 있는 첫번째 탭 내용 영역에 
    // active 클래스가 추가된다.

    tabItem[idx].classList.add("active");
    tabInner[idx].classList.add("active");
  });
});

// 상세정보

// 임시 tmdb 키
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTIzYzhiYmQ5ZjQ0Yjg4NWRmMzNmMThhMzFiODI2YiIsInN1YiI6IjY1MmY3NTI3Y2FlZjJkMDExY2M3NjQwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y2O9RbcGo7qPJ-yEOEqGlxpeVLpN8wEti5QxngyiAYo",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  // 영화별 url 가져옴
  const urlParams = new URLSearchParams(window.location.search);
  paramId = urlParams.get("id");


  fetch(`https://api.themoviedb.org/3/movie/${paramId}?language=ko-KR`, options)
    .then((response) => response.json())
    .then((response) => setDetailInfo(response))
    .catch((err) => console.error(err));

  fetch(
    `https://api.themoviedb.org/3/movie/${paramId}/credits?language=ko-KR`,
    options
  )
    .then((response) => response.json())
    .then((response) => searchDirector(response))
    .catch((err) => console.error(err));

  fetch(`https://api.themoviedb.org/3/movie/${paramId}/images`, options)
    .then((response) => response.json())
    .then((response) => searchImage(response))
    .catch((err) => console.error(err));

  fetch(`https://api.themoviedb.org/3/movie/${paramId}/release_dates`, options)
    .then((response) => response.json())
    .then((response) => searchRelease(response))
    .catch((err) => console.error(err));

  //비디오 api
  fetch(
    `https://api.themoviedb.org/3/movie/${paramId}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
       // 비디오 api에서 유튜브 key값 불러오기
      document
        .getElementById("youtubeFrame")
        .setAttribute(
          "src",
          `https://www.youtube.com/embed/${response.results[0].key}`
        );
    })
    .catch((err) => console.error(err));
});

// 영화상세 기본정보 세팅
function setDetailInfo(response) {
  document.querySelector("#detailInfo .title").innerHTML = response.title;
  document.querySelector("#detailInfo .releaseDate").innerHTML =
    response.release_date;
  document.querySelector("#detailInfo .voteAverage").innerHTML =
    response.vote_average;
  document.querySelector("#detailInfo .genres").innerHTML =
    response.genres.reduce((str, e, idx) => {
      return (str += e.name + (response.genres.length != idx + 1 ? ", " : ""));
    }, "");
  document.querySelector("#detailInfo .runtime").innerHTML = minToHourMin(
    response.runtime
  );
  document.querySelector("#detailInfo .overview").innerHTML = response.overview;
}

// 영화상세 감독 세팅
function searchDirector(response) {
  let directorArray = response.crew.filter((e) => {
    return e.job === "Director";
  });
  document.querySelector("#detailInfo .director").innerHTML =
    directorArray[0].name;

  let actorArray = response.cast.filter((e) => {
    return e.known_for_department === "Acting";
  });
  document.querySelector("#detailInfo .actor").innerHTML = actorArray.reduce(
    (str, e, idx) => {
      return (str += e.name + (actorArray.length != idx + 1 ? ", " : ""));
    },
    ""
  );
}
// 영화상세 영화포스터 세팅
function searchImage(response) {
  let tempHtml = "";
  response.backdrops.forEach((e) => {
    tempHtml += `
              <img src="https://image.tmdb.org/t/p/w300/${e.file_path}">
            `;
  });

  document.querySelector("#detailInfo .images").innerHTML = tempHtml;
}

// 영화상세 권장연령 세팅
function searchRelease(response) {
  let releaseArray = response.results;

  let release = response.results.find((result) => {
    if (result.iso_3166_1 === "KR") {
      return true;
    }
  });

  // 한국 없으면 권장연령미확인으로
  if (release === undefined) {
    document.querySelector("#detailInfo .certification").innerHTML =
      "권장연령미확인";
  } else {
    document.querySelector("#detailInfo .certification").innerHTML =
      release.release_dates[0].certification;
  }
}

// 분을 시간분으로 리턴

function minToHourMin(min) {
  let hour = Math.floor(min / 60);
  let leftMin = min % 60;

  return hour > 0 ? hour + "시간 " + leftMin + "분" : leftMin + "분";
}

// 관람평

let userInfo = [];

//ul태그
const reviewUl = document.querySelector("#reviewList");

// 각 인풋 값 가져오는 변수
const loginId = document.querySelector(".loginId");
const loginPwd = document.querySelector(".loginPwd");
const loginReviewPoint = document.querySelector(".reviewPoint");
const loginReview = document.querySelector(".review");

//클래스에 들어갈 변수 모음
let id = "";
let pwd = "";
let reviewPoint;
let review = "";

//각 영화별 리뷰 구분할 식별자값
let reviewNum = 0;

// 관람평 저장 버튼 누르면 입력한 데이터 저장되는 함수.
function onLogin(event, modifyGet) {
  event.preventDefault(); //새로고침 막기
  // 입력값체크
  if (chkInput() == true) {
    if (reviewNum > 0 || oldReviews.length > 0) {
      reviewNum = oldReviews[oldReviews.length - 1].reviewNum;
    }
    reviewNum++;

    id = loginId.value;
    pwd = loginPwd.value;
    reviewPoint = loginReviewPoint.value;
    review = loginReview.value;

    const newReview = new Review(
      movieId,
      reviewNum,
      id,
      pwd,
      reviewPoint,
      review
    );

    if (modifyGet === null) {
      window.localStorage.setItem(movieId, JSON.stringify([newReview]));
    } else {
      window.localStorage.setItem(
        movieId,
        JSON.stringify([...modifyGet, newReview])
      );
    }

    window.location.href = `detail.html?id=${movieId}&review`;

    return reviewNum;
  }
}

// 관람평 입력시 벨리데이션
// 1. 닉네임 특수문자 거르기
// 2. 공백문자 있을때 거르기
// 공백일때 거르기
// 3. 비번은 빡세게
// 4. 감상평 5글자이상 입력
function chkInput() {
  id = loginId.value;
  pwd = loginPwd.value;
  reviewPoint = loginReviewPoint.value;
  review = loginReview.value;

  const blankExp = /[\s]/g;
  const specialExp = /[^\w]/g;
  const passExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/g;

  if (id == "" || blankExp.test(id) || specialExp.test(id)) {
    alert("아이디는 공백이나 특수문자, 한글이 들어갈 수 없습니다.");
    loginId.focus();
    return false;
  } else if (pwd == "" || blankExp.test(pwd) || !passExp.test(pwd)) {
    alert(
      "비밀번호는 공백문자는 들어갈수없으며, 영문, 숫자, 특수기호 조합 8자리 이상입니다."
    );
    loginPwd.focus();
    return false;
  } else if (review == "" || review.length < 5) {
    alert("리뷰는 5글자 이상 입력하셔야 합니다.");
    loginReview.focus();
    return false;
  } //셀렉트 안할 경우 에러
  else if (reviewPoint === "none") {
    alert("감상 포인트를 선택하세요");
    return false;
  }
  return true;
}

// 저장 버튼 누르면 onLogin 함수 실행됨.
document
  .querySelector(".submitBtn")
  .addEventListener("click", (event) => onLogin(event, modifyGet));

// 리뷰 생성 클래스
class Review {
  constructor(movieId, reviewNum, id, pwd, reviewPoint, review) {
    this.movieId = movieId;
    this.reviewNum = reviewNum;
    this.id = id;
    this.pwd = pwd;
    this.reviewPoint = reviewPoint;
    this.review = review;
  }
}

// 저장된 관람평 데이터들 화면에 보여주는 함수
// 기존에 저장되었던 리뷰들 중 현재 영화에 대한 리뷰만 변수에 담음
function drawReview() {

  //현재 영화에 대한 리뷰데이터 반복하면서 데이터 뽑아서 붙여주기.
  oldReviews.forEach((data) => {
    let drawTemp = "";

    drawTemp = `
        <tr>
          <td class="td-id">${data.id}</td>
          <td class="td-reveiw-point">${data.reviewPoint}</td>
          <td class="td-review">${data.review}</td>
          <td id=${data.reviewNum}><button class="td-userRevDelete">삭제</button></td>
          <td class=${data.reviewNum}><button id="myModal" class="td-userRevModify">수정</button></td>
        </tr>
    `;
    reviewUl.innerHTML += drawTemp;
  });
}

drawReview();

// 데이터 수정,삭제 기능
reviewUl.addEventListener("click", (e) => {

  //삭제기능
  if (e.target.className === "td-userRevDelete") {
    let password = prompt("비밀번호를 입력해 주세요");

    // 삭제, 수정 데이터 위치하는 인덱스 담을 변수
    let empty;

    //어떤 데이터에서 삭제할건지 데이터 위치 탐색
    const mm = modifyGet.map((a, i) => {
      if (String(a.reviewNum) === e.target.parentElement.id) {
        return (empty = i);
      }
    });

    //비밀번호 입력값이 동일하면 리뷰삭제
    if (password === modifyGet[empty].pwd) {
      modifyGet.splice(empty, 1);
      window.localStorage.setItem(movieId, JSON.stringify(modifyGet));
      location = location;
    } else {
      alert("작정자의 비밀번호와 다릅니다.");
    }
  }

  //수정기능
  if (e.target.className === "td-userRevModify") {
    let password = prompt("비밀번호를 입력해 주세요");

    //데이터 위치값 담을 변수
    let empty;

    //데이터 위치 탐색
    modifyGet.forEach((a, i) => {
      if (String(a.reviewNum) === e.target.parentElement.className) {
        return (empty = i);
      }
    });
    let reviewNumIdx = modifyGet[empty].reviewNum;

    //비밀번호 입력값이 동일하면 리뷰 수정
    if (password === modifyGet[empty].pwd) {
      window.scrollTo(0, 1050);

      //수정버튼 누르면 값들 채워넣기.
      let { id, movieId, pwd, review, reviewNum, reviewPoint } =
        modifyGet[empty];

      document.querySelector(".loginId").value = id;
      document.querySelector(".loginPwd").value = pwd;
      document.querySelector(".reviewPoint").value = reviewPoint;
      document.querySelector(".review").value = review;

      modifyGet.splice(empty, 1);
      window.localStorage.setItem(movieId, JSON.stringify(modifyGet));
      //저장버튼 누르면 기존에 데이터 삭제하고, 새로운 데이터 집어넣기.
      document
        .querySelector(".submitBtn")
        .addEventListener("click", function (event) {
          event.preventDefault();
          onLogin(event, modifyGet);
        });
    } else {
      alert("작정자의 비밀번호와 다릅니다.");
    }
  }
});

//디테일 페이지 검색기능
document.querySelector("#searchBtn").addEventListener("click", inputHref);

document
  .querySelector("#searchInput")
  .addEventListener("keypress", async function (e) {
    if (e.keyCode == 13 || e.which == 13) {
      inputHref();
    }
  });

//인풋값 가져와서 페이지 이동
async function inputHref() {
  let inputVal = document.querySelector("input").value;
  window.location.href = `./list.html?val=${inputVal}`;
}

//화살표 누르면 좌표 맨 위로
document
  .querySelector(".upIconWarp")
  .addEventListener("click", () => window.scrollTo(0, 0));
