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
datasRepeat(datas.results, { sort: "top_rated" }, 1, 10);

//인기영화 데이터 가져오기.
let popularDatas = await getData(urlAdr(num, "popular"));
datasRepeat(popularDatas.results, { sort: "popular" }, 0, 10);

console.log(swiperWrapper[0]);
//데이터, 영화구분, 클래스인덱스, 몇개 가져올건지
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
// document.querySelector("#more").addEventListener("click", () => more());

//more버튼 누르면  more 함수 실행
let more = document.querySelectorAll(".more");
for (let i = 0; i < more.length; i++) {
  more[i].addEventListener("click", (e) => slideMore(e));
}

//main에서 장르별 더보기 눌렀을때 해당 장르 아이디값으로 주고 이동
async function slideMore(e) {
  let genreId = e.target.nextElementSibling.firstElementChild.id;
  console.log(genreId);
  window.location.href = `./populerList.html?id =more& genre = ${genreId}`;
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

//검색 버튼 누르면 인풋값 가져오는 함수 실행
document
  .querySelector("#searchBtn")
  .addEventListener("click", async function () {
    console.log("클릭");
    //검색버튼을 누르면, list.html 페이지로 넘어가고 입력값을 쿼리스트링으로 주기,
    //주소에 있는 입력값에 해당하는 데이터 불러와서 붙여주고,
    temp = "";
    // cardContainer.innerHTML = "";
    num = 1;
    isSearch = true;
    let inputVal = document.querySelector("input").value;
    // inputVal = encodeURI(inputVal);
    window.location.href = `./populerList.html?val=${inputVal}`;

    // return await searchStart();
  });

//엔터키 입력하면 인풋값 가져오는 함수 실행
document
  .querySelector("#searchInput")
  .addEventListener("keypress", async function (e) {
    if (e.keyCode == 13 || e.which == 13) {
      temp = "";
      // cardContainer.innerHTML = "";
      num = 1;
      isSearch = true;
      let inputVal = document.querySelector("input").value;
      // inputVal = encodeURI(inputVal);
      window.location.href = `./populerList.html?val=${inputVal}`;

      // return await searchStart();
    }
  });

export { num, temp, isSearch, datasRepeat };
