import { getData } from "./getData.js";
import { clickShow } from "./go.js";
import { genreUrlNum, makeGenreUrl, makeSearchUrl } from "./makeUrl.js";
import { moreHide, more } from "./more.js";
import { appendFunc } from "./append.js";

const cardContainer = document.querySelector(".cardContainer");
let num = 1;
let temp = "";

//영화 장르값 모아둔 배열.
const genreArr = ["", "28", "80", "10749", "14", "35"];

//주소의 쿼리스트링 가져오기
const urlVal = window.location.search;

//__ 해당 장르 url 추출 후 searchStart2 실행__
//more 클릭으로 페이지 이동한 경우
if (urlVal.includes("id=more&genre")) {
  const genreVal = urlVal.replace("?id=more&genre=", "");

  //장르별 top 10 쪽에서 more를 클릭했을 경우
  if (genreArr.includes(genreVal)) {
    const genreurl = await genreUrlNum(genreVal, num);
    await searchStart2(genreurl);
  }
  //인기영화, 평점높은영화 쪽에서 more를 클릭했을 경우
  else {
    const genreurl = await makeGenreUrl(genreVal, num);
    await searchStart2(genreurl);
  }
} //검색으로 페이지 이동한 경우 _ 주소에서 검색값 가져오기
else {
  const inputVal = urlVal.replace("?val=", "");
  const inputUrl = await makeSearchUrl(inputVal, num);
  await searchStart2(inputUrl);
}

//데이터 가져와서 붙여주기
async function searchStart2(url) {
  const searchData = await getData(url);
  await moreHide(searchData, num);
  return datasRepeat(searchData.results);
}

//받은 데이터 반복하며 appendFunc 실행 결과물 cardContainer에 붙여주기
function datasRepeat(data) {
  temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += appendFunc(data[i]);
  }
  return (cardContainer.innerHTML += temp);
}

//검색 데이터 가져와서 붙여쥐기 _ 데이터 없으면 없다고 처리.
async function searchStart() {
  temp = "";
  cardContainer.innerHTML = "";
  num = 1;

  const url = await getInput(num);
  const searchData = await getData(url);

  if (searchData.results.length === 0) {
    document.querySelector(
      ".cardContainer"
    ).innerHTML = `<h2 class = "noResult"> 검색 결과가 없습니다. 😢 </h2>`;
    document.querySelector("#more").classList.add("hide");
  } else {
    await moreHide(searchData, num);
    return datasRepeat(searchData.results);
  }
}

//인풋값 가져와서 그에 해당하는 주소 가져온다.
async function getInput(num) {
  const inputVal = document.querySelector("input").value;
  if (!inputVal) {
    return alert("검색어를 입력하세요");
  }
  return makeSearchUrl(inputVal, num);
}

//more버튼 누르면  more 함수 실행
document.querySelector("#more").addEventListener("click", () => {
  num++;
  return more();
});

//검색 버튼 누르면 인풋값 가져오는 함수 실행
document.querySelector("#searchBtn").addEventListener("click", searchStart);

//엔터키 입력하면 인풋값 가져오는 함수 실행
document.querySelector("#searchInput").addEventListener("keypress", (e) => {
  if (e.keyCode == 13 || e.which == 13) {
    return searchStart();
  }
});

//로고 누르면 메인으로 이동
document.querySelector(".logo").addEventListener("click", function () {
  window.location.href = "./index.html";
});

//카드 누르면 해당 페이지로 이동
document
  .querySelector(".cardContainer")
  .addEventListener("click", (e) => clickShow(e));

//화살표 누르면 좌표 맨 위로
document.querySelector(".upIconWarp").addEventListener("click", function () {
  window.scrollTo(0, 0);
});

export { cardContainer, num, temp, urlVal, genreArr, datasRepeat, moreHide };
