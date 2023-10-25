import { getData } from "./getData.js";
import { appendFunc } from "./append.js";
import { searchStart } from "./search.js";
import { clickShow } from "./go.js";

let cardContainer = document.querySelector(".cardContainer");
let swiperWrapper = document.querySelectorAll(".swiper-wrapper");
let isSearch = false;
let num = 1;
let temp = ""; //temp가 undefined 되는거 해결
let tempSwiper = "";

function urlAdr(num, what) {
  return `https://api.themoviedb.org/3/movie/${what}?language=ko-KR&page=${num}`;
}

//인기영화 리스트 데이터
datasRepeat(popularDatas.results, { sort: "popularList" }, 0, 20);

//populerList.html 연결할 append
function datasRepeat(data, sortType, index, many) {
  temp = "";
  for (let i = 0; i < many; i++) {
    if (i < 3) {
      Object.assign(data[i], { king: "👑" }, sortType);
    } else {
      Object.assign(data[i], sortType);
      // console.log(data[i]);
    }
    temp += appendFunc(data[i]);
  }
  console.log(temp);

  if (sortType.sort === "popularList") {
    return (cardContainer.innerHTML += temp);
  } else if (sortType.sort === "hightAvg" || sortType.sort === "popular") {
    return (swiperWrapper[index].innerHTML += temp);
  }
}

//검색 버튼 누르면 인풋값 가져오는 함수 실행
document
  .querySelector("#searchBtn")
  .addEventListener("click", async function () {
    temp = "";
    cardContainer.innerHTML = "";
    num = 1;
    isSearch = true;

    return await searchStart();
  });

//엔터키 입력하면 인풋값 가져오는 함수 실행
document
  .querySelector("#searchInput")
  .addEventListener("keypress", async function (e) {
    if (e.keyCode == 13 || e.which == 13) {
      temp = "";
      cardContainer.innerHTML = "";
      num = 1;
      isSearch = true;

      return await searchStart();
    }
  });

//카드 누르면 아이디 값 보여주고, 해당 페이지로 이동
document
  .querySelector(".cardContainer")
  .addEventListener("click", (e) => clickShow(e));

export { cardContainer, num, temp, isSearch, datasRepeat };
