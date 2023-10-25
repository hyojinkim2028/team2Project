import { getData } from "./src/getData.js";
import { appendFunc } from "./src/append.js";
import { searchStart } from "./src/search.js";
import { clickShow } from "./src/go.js";

let swiperWrapper = document.querySelectorAll(".swiper-wrapper");
let isSearch = false;
let num = 1;
let temp = ""; //temp가 undefined 되는거 해결
let tempSwiper = "";

function urlAdr(num, what) {
  return `https://api.themoviedb.org/3/movie/${what}?language=ko-KR&page=${num}`;
}

//높은 평점순 데이터 가져오기
let datas = await getData(urlAdr(num, "top_rated"));
let total = datas.total_pages;
datasRepeat(datas.results, { sort: "hightAvg" }, 1, 10);

//인기영화 데이터 가져오기.
let popularDatas = await getData(urlAdr(num, "popular"));
datasRepeat(popularDatas.results, { sort: "popular" }, 0, 10);

//인기영화 리스트 데이터
// datasRepeat(popularDatas.results, { sort: "popularList" }, 0, 20);

console.log(swiperWrapper[0]);
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
  // console.log(swiperWrapper);
  // console.log(document.querySelectorAll(".swiper-wrapper")[0]);
  return (swiperWrapper[index].innerHTML += temp);
}

//more버튼 누르면  more 함수 실행
// document.querySelector('#more').addEventListener('click', () => more())

//추가 데이터 가져와서 붙여주기.
async function more() {
  if (!isSearch && num < total) {
    num++;
    temp = "";
    let datas = await getData(urlAdr(num));
    console.log(total, " 페이지 중 ", num);
    datasRepeat(datas.results);
  } else if (isSearch) {
    num++;
    temp = "";
    await searchStart();
  }
}

//카드 누르면 아이디 값 보여주고, 해당 페이지로 이동
let swiperLength = document.querySelectorAll(".swiper-wrapper").length;
for (let i = 0; i < swiperLength; i++) {
  document
    .querySelectorAll(".swiper-wrapper")
    [i].addEventListener("click", (e) => {
      console.log("d");
      clickShow(e);
    });
}

//화살표 누르면 좌표 맨 위로
document.querySelector(".upIconWarp").addEventListener("click", function () {
  window.scrollTo(0, 0);
});

export { num, temp, isSearch, datasRepeat };
