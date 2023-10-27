// 탭버튼 구성
const tabItem = document.querySelectorAll('.tab_item')
const tabInner = document.querySelectorAll('.tab_inner')
let paramId = ''

tabItem.forEach((tab, idx) => {
  tab.addEventListener('click', function () {
    tabInner.forEach((inner) => {
      inner.classList.remove('active')
    })

    tabItem.forEach((item) => {
      item.classList.remove('active')
    })

    tabItem[idx].classList.add('active')
    tabInner[idx].classList.add('active')
  })
})

// 상세정보

// 임시 tmdb 키
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTIzYzhiYmQ5ZjQ0Yjg4NWRmMzNmMThhMzFiODI2YiIsInN1YiI6IjY1MmY3NTI3Y2FlZjJkMDExY2M3NjQwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y2O9RbcGo7qPJ-yEOEqGlxpeVLpN8wEti5QxngyiAYo',
  },
}

document.addEventListener('DOMContentLoaded', function () {
  // 임시 url 파라메터 가져오는부분
  const urlParams = new URLSearchParams(window.location.search)
  paramId = urlParams.get('id')
  // console.log('아이디',paramId)
  if (paramId == null) {
    paramId = 122
  }

  fetch(`https://api.themoviedb.org/3/movie/${paramId}?language=ko-KR`, options)
    .then((response) => response.json())
    .then((response) => setDetailInfo(response))
    .catch((err) => console.error(err))

  fetch(
    `https://api.themoviedb.org/3/movie/${paramId}/credits?language=ko-KR`,
    options
  )
    .then((response) => response.json())
    .then((response) => searchDirector(response))
    .catch((err) => console.error(err))

  fetch(`https://api.themoviedb.org/3/movie/${paramId}/images`, options)
    .then((response) => response.json())
    .then((response) => searchImage(response))
    .catch((err) => console.error(err))

  fetch(`https://api.themoviedb.org/3/movie/${paramId}/release_dates`, options)
    .then((response) => response.json())
    .then((response) => searchRelease(response))
    .catch((err) => console.error(err))

  //비디오 api
  fetch(
    `https://api.themoviedb.org/3/movie/${paramId}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      document
        .getElementById('youtubeFrame')
        .setAttribute(
          'src',
          `https://www.youtube.com/embed/${response.results[0].key}`
        )
      console.log(response.results[0].key)
    }) // key값 불러오는 거
    .catch((err) => console.error(err))
})


function setDetailInfo(response) {
  console.log(response)
  document.querySelector('#detailInfo .title').innerHTML = response.title
  document.querySelector('#detailInfo .releaseDate').innerHTML =
    response.release_date
  document.querySelector('#detailInfo .voteAverage').innerHTML =
    response.vote_average
  // document.querySelector('#detailInfo .meme').innerHTML = response.vote_average;
  document.querySelector('#detailInfo .genres').innerHTML =
    response.genres.reduce((str, e, idx) => {
      return (str += e.name + (response.genres.length != idx + 1 ? ', ' : ''))
    }, '')
  document.querySelector('#detailInfo .runtime').innerHTML = minToHourMin(
    response.runtime
  )
  document.querySelector('#detailInfo .overview').innerHTML = response.overview
}

function searchDirector(response) {
  // jsonData.crew.filter(({job})=> job ==='Director')
  let directorArray = response.crew.filter((e) => {
    return e.job === 'Director'
  })
  document.querySelector('#detailInfo .director').innerHTML =
    directorArray[0].name

  let actorArray = response.cast.filter((e) => {
    return e.known_for_department === 'Acting'
  })
  document.querySelector('#detailInfo .actor').innerHTML = actorArray.reduce(
    (str, e, idx) => {
      return (str += e.name + (actorArray.length != idx + 1 ? ', ' : ''))
    },
    ''
  )
}

function searchImage(response) {
  let tempHtml = ''
  response.backdrops.forEach((e) => {
    tempHtml += `
              <img src="https://image.tmdb.org/t/p/w300/${e.file_path}">
            `
  })

  document.querySelector('#detailInfo .images').innerHTML = tempHtml
}

function searchRelease(response) {
  let releaseArray = response.results

  let release = response.results.find((result) => {
    if (result.iso_3166_1 === 'KR') {
      return true
    }
  })
  // let release;

  // 한국 없으면 권장연령미확인으로
  if (release === undefined) {
    // release = releaseArray[0]
    //
    document.querySelector('#detailInfo .certification').innerHTML =
      '권장연령미확인'
  } else {
    document.querySelector('#detailInfo .certification').innerHTML =
      release.release_dates[0].certification
  }

}

function searchCertification(iso, cert) {
  fetch(`https://api.themoviedb.org/3/certification/movie/list`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.certifications[iso])
      //console.log(response.certifications[iso]);
      console.log(iso, response)

      document.querySelector('#detailInfo .meaning').innerHTML =
        '권장연령미확인'

      let certificationByIso = response.certifications[iso]
      if (certificationByIso !== undefined) {
        let certification = certificationByIso.find((e) => {
          if (e.certification === cert) {
            return true
          }
        })
        console.log(certification)
        if (certification !== undefined) {
          document.querySelector('#detailInfo .meaning').innerHTML =
            '(' + certification.meaning + ')'
        }
      }
    })
    .catch((err) => console.error(err))
}

function minToHourMin(min) {
  let hour = Math.floor(min / 60)
  let leftMin = min % 60

  return hour > 0 ? hour + '시간 ' + leftMin + '분' : leftMin + '분'
}

// 관람평

let userInfo = []

//ul태그
const reviewUl = document.querySelector('#reviewList')

// 각 인풋 값 가져오는 변수
const loginId = document.querySelector('.loginId')
const loginPwd = document.querySelector('.loginPwd')
const loginReviewPoint = document.querySelector('.reviewPoint')
const loginReview = document.querySelector('.review')

//클래스에 들어갈 변수 모음
let id = ''
let pwd = ''
let reviewPoint
let review = ''

// 관람평 저장 버튼 누르면 입력한 데이터 저장되는 함수.
function onLogin(event) {
  event.preventDefault() //새로고침 막기
  id = loginId.value
  pwd = loginPwd.value
  reviewPoint = loginReviewPoint.value
  review = loginReview.value

  // 관람평 저장 시 영화 아이디값 
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get('id')

  // 기존에  있던 리뷰들 , 데이터 없는 경우 빈 배열 반환
  let oldReviews = JSON.parse(window.localStorage.getItem('reviews')) ?? []

  // 새로 작성하는 리뷰, 객체 생성
  let newReview = new Review(movieId, id, pwd, reviewPoint, review)

  // 새로운 리뷰를 작성하면 기존 리뷰들(oldReviews에 newReview 가 더해지며 로컬스토리지에 저장됨.) 
  // -> 로컬스토리지 set 기능은 데이터를 추가해주는 기능과는 달라서 이렇게 처리했음.
  window.localStorage.setItem(
    'reviews',
    JSON.stringify([...oldReviews, newReview])
  )
}

// 저장 버튼 누르면 onLogin 함수 실행됨.
addEventListener('submit', onLogin)

// 리뷰 생성 클래스
class Review {
  constructor(movieId, id, pwd, reviewPoint, review) {
    this.movieId = movieId
    this.id = id
    this.pwd = pwd
    this.reviewPoint = reviewPoint
    this.review = review
  }
}


// 저장된 관람평 데이터들 화면에 보여주는 함수
function drawReview() {

  // 상세페이지 영화 아이디 값
  const urlParams = new URLSearchParams(window.location.search)
  paramId = urlParams.get('id')

  let drawTemp = ''
  reviewUl.innerHTML += drawTemp


  // 기존에 저장되었던 리뷰들 변수에 담음
  let oldReviews = JSON.parse(window.localStorage.getItem('reviews')) ?? []


  // 저장된 영화 아이디와 조회하고자 하는 영화 아이디 값이 같은 데이터만 필터링
  let views = oldReviews.filter((data) => data.movieId == paramId)
  

  // 해당 영화 아이디 값과 일치하는 데이터의 각 데이터 호출 
  views.forEach((dataValues)=> {
    console.log(`영화 아이디는${dataValues.movieId}`);
    console.log(`아이디는 ${dataValues.id}`);
    console.log(`패스워드는 ${dataValues.pwd}`);
    console.log(`리뷰포인트는 ${dataValues.reviewPoint}`);
    console.log(`리뷰는${dataValues.review}`);
  })
}

drawReview()
