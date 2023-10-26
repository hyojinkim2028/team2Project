import { num, datasRepeat } from "../main.js";
import { getData } from "./getData.js";

//인풋값 가져오는 함수
async function getInput() {
  let inputVal = document.querySelector("input").value;

  //인풋 없으면 검색어 입력하라고 알러트
  if (!inputVal) {
    return alert("검색어를 입력하세요");
  }

  return makeSearchUrl(inputVal, num);
}

//검색결과 담긴 데이터 주소 가져오기.
async function makeSearchUrl(inputVal, num) {
  inputVal = encodeURI(inputVal);

  let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${inputVal}&include_adult=false&language=ko-KR&page=${num}`;
  return searchUrl;
}

//데이터 가져와서 붙여주기
async function searchStart() {
  let url = await getInput();
  let searchData = await getData(url);
  // let searchTotal = searchData.total_pages;
  if (searchData.results.length === 0) {
    document.querySelector(
      ".cardContainer"
    ).innerHTML = `<h2 class = "noResult"> 검색 결과가 없습니다. 😢 </h2>`;
    document.querySelector("#more").classList.add("hide");
  } else {
    moreHide(searchData, num);
  }
}

function moreHide(searchData, num) {
  console.log(searchData.total_pages, "페이지 중에서 ", num);
  let searchTotal = searchData.total_pages;
  if (searchTotal === 1 && num === 1) {
    document.querySelector("#more").classList.add("hide");
  } //검색 결과의 마지막 페이지 일때.
  else if (num === searchTotal && num > 1) {
    document.querySelector("#more").classList.add("hide");
  } //현재 페이지는 1, 전체 페이지는 1보다 크면
  else if (num === 1 && num < searchTotal) {
    document.querySelector("#more").classList.remove("hide");
  } //현재 페이지는 1이 아닌ㄴ데, 전체 페이지는 현재 페이지보다 크면
  else if (num < searchTotal && num !== 1) {
    document.querySelector("#more").classList.remove("hide");
  }
  datasRepeat(searchData.results);
}

export { getInput, searchStart };
