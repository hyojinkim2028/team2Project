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

export { cardContainer, num, temp, isSearch, datasRepeat };
