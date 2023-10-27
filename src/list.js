import { getData } from "./getData.js";
import { clickShow } from "./go.js";

const cardContainer = document.querySelector(".cardContainer");
// let isSearch = false;
let num = 1;
let temp = "";

//영화 장르값 모아둔 배열.
const genreArr = ["", "28", "80", "10749", "14", "35"];

//주소의 쿼리스트링 가져오기
const urlVal = window.location.search;

//효진님 슬라이드 데이터__ 해당장르가 담긴 데이터주소 가져오기
async function genreUrlNum(genreNum, num) {
  return `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=${num}&sort_by=popularity.desc&with_genres=${genreNum}`;
}

//은지 슬라이드 데이터 __ 해당장르가 담긴 데이터주소 가져오기
async function makeGenreUrl(genreVal, num) {
  return `https://api.themoviedb.org/3/movie/${genreVal}?language=ko-KR&page=${num}`;
}

//검색결과 담긴 데이터 주소 가져오기.
async function makeSearchUrl(inputVal, num) {
  return `https://api.themoviedb.org/3/search/movie?query=${inputVal}&include_adult=false&language=ko-KR&page=${num}`;
}

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
  let searchData = await getData(url);
  console.log(searchData);
  await moreHide(searchData, num);
  return datasRepeat(searchData.results);
}

//더보기 버튼 필요하면 보여주고, 데이터 없으면 안보여주기
async function moreHide(searchData, num) {
  console.log(searchData.total_pages, "페이지 중에서 ", num);
  const searchTotal = searchData.total_pages;
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
}

//받은 데이터 반복하며 appendFunc 실행 결과물 cardContainer에 붙여주기
function datasRepeat(data) {
  temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += appendFunc(data[i]);
  }
  return (cardContainer.innerHTML += temp);
}

//받은 데이터에 이미지 없을경우 처리해서 temping 함수 실행
function appendFunc(data) {
  const noImg =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg?w=1800";
  const poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

  return data.poster_path === null
    ? temping(noImg, data)
    : temping(poster, data);
}

//받은 데이터로 html파일 보내주기.
function temping(src, data) {
  //카드 내용 글자수 제한
  const length = 130;
  if (data.overview.length > length) {
    data.overview = data.overview.substr(0, length - 1) + "...";
  }

  return `
      <div class="card" id = ${data.id}>
        <img class="poster" src="${src}" alt="" />
        <h5 class="title">${data.title}</h5>
        <p class="avg">평점 : ${data.vote_average}</p>
        <span class="comment">${data.overview}</span>
      </div>
    `;
}

//검색 데이터 가져와서 붙여쥐기 _ 데이터 없으면 없다고 처리.
async function searchStart() {
  let url = await getInput(num);
  let searchData = await getData(url);

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
  let inputVal = document.querySelector("input").value;
  if (!inputVal) {
    return alert("검색어를 입력하세요");
  }
  return makeSearchUrl(inputVal, num);
}

//more버튼 누르면  more 함수 실행
document.querySelector("#more").addEventListener("click", () => more());

async function more() {
  let inputVal = document.querySelector("input").value;
  let urlGetVal = decodeURI(urlVal.replace("?val=", ""));
  num++;
  // console.log(num);
  //검색한 데이터 더보기
  if (inputVal.length > 0) {
    console.log("검색긴으");
    let url = await makeSearchUrl(inputVal, num);
    let data = await getData(url);
    await moreHide(data, num);
    await datasRepeat(data.results);
  } //main에서 list로 넘어와서 데이터들 더보기
  else {
    let genreVal = urlVal.replace("?id=more&genre=", "");
    //장르별 슬라이드 데이터 더 가져오기.
    if (genreArr.includes(genreVal)) {
      console.log("장르별");
      let url = await genreUrlNum(genreVal, num);
      let data = await getData(url);
      await moreHide(data, num);
      return datasRepeat(data.results);
    } //인기영화, 최고평점영화 중 해당하는거 데이터 더 가져오기.
    else {
      console.log("메인에서 검색한값 더보기");
      console.log(urlGetVal, num);
      let url = await makeSearchUrl(urlGetVal, num);
      console.log(url);
      let data = await getData(url);
      console.log(data);
      await moreHide(data, num);
      return datasRepeat(data.results);
    }
  }
}

//검색 버튼 누르면 인풋값 가져오는 함수 실행
document
  .querySelector("#searchBtn")
  .addEventListener("click", async function () {
    //검색버튼을 누르면, list.html 페이지로 넘어가고 입력값을 쿼리스트링으로 주기,
    //주소에 있는 입력값에 해당하는 데이터 불러와서 붙여주고,
    temp = "";
    cardContainer.innerHTML = "";
    num = 1;
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
      return await searchStart();
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

export { cardContainer, num, temp, datasRepeat, moreHide };
