import { getData } from './getData.js'
import { clickShow } from './go.js'

let cardContainer = document.querySelector('.cardContainer')
let isSearch = false
let num = 1
let temp = '' //temp가 undefined 되는거 해결

//장르값 모아둔 배열.
let genreArr = ['', '28', '80', '10749', '14', '35']

//주소의 쿼리스트링 가져오기
let urlVal = window.location.search

//주소에서 장르값 가져오기  __한글로 검색시 장르list와 검색list를 구분할 수 없어서 조건 변경.
if (urlVal.includes('id=more&genre')) {
  let genreVal = urlVal.replace('?id=more&genre=', '')
  //탭 슬라이드 쪽에서 더보기 눌렀다면 이거 실행
  if (genreArr.includes(genreVal)) {
    let genreurl = await genreUrlAdrHJ(genreVal, num)
    await searchStart2(genreurl)
  }
  //인기영화, 평점높은영화 더보기 눌렀다면 이거 실행
  else {
    let genreurl = await makeGenreUrl(genreVal, num)
    await searchStart2(genreurl)
  }
} //주소에서 검색값 가져오기
else {
  let inputVal = urlVal.replace('?val=', '')
  let inputurl = await makeSearchUrl(inputVal, num)
  await searchStart2(inputurl)
}

//효진님 슬라이드 데이터__ 해당장르가 담긴 데이터주소 가져오기
async function genreUrlAdrHJ(genreNum, num) {
  return `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=${num}&sort_by=popularity.desc&with_genres=${genreNum}`
}

//은지 슬라이드 데이터 __ 해당장르가 담긴 데이터주소 가져오기
async function makeGenreUrl(genreVal, num) {
  return `https://api.themoviedb.org/3/movie/${genreVal}?language=ko-KR&page=${num}`
}

//검색결과 담긴 데이터 주소 가져오기.
async function makeSearchUrl(inputVal, num) {
  return `https://api.themoviedb.org/3/search/movie?query=${inputVal}&include_adult=false&language=ko-KR&page=${num}`
}

//검색 데이터 가져와서 붙여쥐기
async function searchStart() {
  let url = await getInput(num)
  let inputVal = document.querySelector('input').value
  let searchData = await getData(url)
  let searchTotal = searchData.total_pages

  if (searchData.results.length === 0) {
    document.querySelector(
      '.cardContainer'
    ).innerHTML = `<h2 class = "noResult"> 검색 결과가 없습니다. 😢 </h2>`
    document.querySelector('#more').classList.add('hide')
  } else {
    moreHide(searchData, num)
  }
}

//인풋값 가져와서 그에 해당하는 주소 가져온다.
async function getInput(num) {
  let inputVal = document.querySelector('input').value
  //인풋 없으면 검색어 입력하라고 알러트
  if (!inputVal) {
    return alert('검색어를 입력하세요')
  }

  return makeSearchUrl(inputVal, num)
}
//데이터 가져와서 붙여주기
async function searchStart2(url) {
  let searchData = await getData(url)
  let total = searchData.total_pages
  moreHide(searchData, num)
}

//페이지에 따라 더보기 버튼
function moreHide(searchData, num) {
<<<<<<< Updated upstream
  console.log(searchData.total_pages, '페이지 중에서 ', num)
  let searchTotal = searchData.total_pages
  if (searchTotal === 1 && num === 1) {
    document.querySelector('#more').classList.add('hide')
  } //검색 결과의 마지막 페이지 일때.
  else if (num === searchTotal && num > 1) {
    document.querySelector('#more').classList.add('hide')
  } //현재 페이지는 1, 전체 페이지는 1보다 크면
  else if (num === 1 && num < searchTotal) {
    document.querySelector('#more').classList.remove('hide')
  } //현재 페이지는 1이 아닌ㄴ데, 전체 페이지는 현재 페이지보다 크면
  else if (num < searchTotal && num !== 1) {
    document.querySelector('#more').classList.remove('hide')
=======
  console.log(searchData.total_pages, "페이지 중에서 ", num);
  let searchTotal = searchData.total_pages;
  console.log(num);
  if (searchTotal === 1 && num === 1) {
    console.log("1-1");
    document.querySelector("#more").classList.add("hide");
  } //검색 결과의 마지막 페이지 일때.
  else if (num === searchTotal && num > 1) {
    console.log("10-10");
    document.querySelector("#more").classList.add("hide");
  } //현재 페이지는 1, 전체 페이지는 1보다 크면
  else if (num === 1 && num < searchTotal) {
    console.log("1-10");
    document.querySelector("#more").classList.remove("hide");
  } //현재 페이지는 1이 아닌ㄴ데, 전체 페이지는 현재 페이지보다 크면
  else if (num < searchTotal && num !== 1) {
    console.log("3-10");
    document.querySelector("#more").classList.remove("hide");
>>>>>>> Stashed changes
  }
  datasRepeat(searchData.results)
}

//more버튼 누르면  more 함수 실행
document.querySelector('#more').addEventListener('click', () => more())

async function more() {
  let inputVal = document.querySelector('input').value
  num++
  console.log(num)
  //검색한 데이터 더보기
  if (inputVal) {
    let url = await makeSearchUrl(inputVal, num)
    let data = await getData(url)
    console.log(url)
    return datasRepeat(data.results)
  } //main에서 list로 넘어와서 데이터들 더보기
  else {
    let genreVal = urlVal.replace('?id=more&genre=', '')
    //장르별 슬라이드 데이터 더 가져오기.
    if (genreArr.includes(genreVal)) {
      let url = await genreUrlAdrHJ(genreVal, num)
      let data = await getData(url)
      return datasRepeat(data.results)
    } //인기영화, 최고평점영화 중 해당하는거 데이터 더 가져오기.
    else {
      let url = await makeGenreUrl(genreVal, num)
      let data = await getData(url)
      return datasRepeat(data.results)
    }
  }
}

function datasRepeat(data) {
  temp = ''
  for (let i = 0; i < data.length; i++) {
    temp += appendFunc(data[i])
  }

  return (cardContainer.innerHTML += temp)
}

function appendFunc(data) {
  // 구조분해 할당 _ obj를 export 하려고?!
  // let { poster_path, title, overview, vote_average } = da;
  let noImg =
    'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg?w=1800'
  let poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`

  return data.poster_path === null
    ? temping(noImg, data)
    : temping(poster, data)
}

//받은 데이터로 html파일 보내주기.
function temping(src, data) {
  // let inputVal = document.querySelector('input').value
  // // console.log(data.title.split(' ').join(''));
  // if (data.title === inputVal || data.title.split(' ').join('') === inputVal) {
  //   console.log(data)
  //   console.log(inputVal)
  // }

  let length = 130
  if (data.overview.length > length) {
    data.overview = data.overview.substr(0, length - 1) + '...'
  }
  let inputVal = document.querySelector("input").value;
  console.log(inputVal);
  let jointitle = data.title.split(" ").join("");
  if (jointitle === inputVal) {
    return `
      <div class="card" id = ${data.id}>
        <img class="poster" src="${src}" alt="" />
        <h5 class="title">${data.title}</h5>
        <p class="avg">평점 : ${data.vote_average}</p>
        <span class="comment">${data.overview}</span>
      </div>
    `;
  }
  return `
      <div class="card" id = ${data.id}>
        <img class="poster" src="${src}" alt="" />
        <h5 class="title">${data.title}</h5>
        <p class="avg">평점 : ${data.vote_average}</p>
        <span class="comment">${data.overview}</span>
      </div>
    `
}

//검색 버튼 누르면 인풋값 가져오는 함수 실행
document
  .querySelector('#searchBtn')
  .addEventListener('click', async function () {
    console.log('클릭')
    //검색버튼을 누르면, list.html 페이지로 넘어가고 입력값을 쿼리스트링으로 주기,
    //주소에 있는 입력값에 해당하는 데이터 불러와서 붙여주고,
    temp = ''
    cardContainer.innerHTML = ''
    num = 1
    isSearch = true

    return await searchStart()
  })

//엔터키 입력하면 인풋값 가져오는 함수 실행
document
  .querySelector('#searchInput')
  .addEventListener('keypress', async function (e) {
    if (e.keyCode == 13 || e.which == 13) {
      temp = ''
      cardContainer.innerHTML = ''
      num = 1
      isSearch = true

      return await searchStart()
    }
  })

//로고 누르면 메인으로 이동
document.querySelector('.logo').addEventListener('click', function () {
  window.location.href = './index.html'
})

//카드 누르면 아이디 값 보여주고, 해당 페이지로 이동
document
  .querySelector('.cardContainer')
  .addEventListener('click', (e) => clickShow(e))

//화살표 누르면 좌표 맨 위로
document.querySelector('.upIconWarp').addEventListener('click', function () {
  window.scrollTo(0, 0)
})

//more버튼 누르면  more 함수 실행
// document.querySelector("#more").addEventListener("click", () => listMore());

export { cardContainer, num, temp, isSearch, datasRepeat }
