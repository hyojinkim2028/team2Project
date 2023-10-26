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

// function search() {
//   var ifrm = document.getElementById("iframe");
//   ifrm.src = "https://www.youtube.com/embed/" + response.results[0].key
// }

// const movie = await sendHttpRequest('GET', `https://api.themoviedb.org/3/movie/${data.id}/videos?language=en-US`)
// console.log(movie.results[0].key)
// const video = document.querySelector(".movie")
// const text = document.createElement("iframe")
// text.src="https://www.youtube.com/embed/" + response.results[0].key

// iframe.location.href = "url" ;
// document.frames("iframe").location.href = "url" ;
// const iframe = document.querySelector('#iframe');

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

  // document.querySelector('#detailInfo .certification').innerHTML =
  //   release.release_dates[0].certification

  // 음.. 이부분 이슈가 있어서 그냥............
  // searchCertification(
  //   release.iso_3166_1,
  //   release.release_dates[0].certification
  // )
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

//테스트용 버튼
const btn = document.querySelector('#btn')

//버튼 클릭시 생성될 영역
const section = document.querySelector('section')

//ul태그
const reviewUl = document.getElementById('ul')

//form 태그에 정보 담아서 localstorage에 저장
const reviewSubmit = document.querySelector('.reviewSubmit')
const reviewInput = document.querySelector('.reviewSubmit input')

// loginReviewPoint도 만들어야됨

const login = document.querySelector('#login')
const loginId = document.querySelector('#login .loginId')
const loginPwd = document.querySelector('#login .loginPwd')
const loginReview = document.querySelector('#login .review')

//클래스에 들어갈 변수 모음
let id = ''
let pwd = ''
let reviewPoint = ''
let review = ''

let count = 0

function onLogin(event) {
  //event.preventDefault();

  id = loginId.value
  pwd = loginPwd.value
  review = loginReview.value
  //window.localStorage.setItem(id, pwd);

  //버튼 누르면 count++
  // count 값을 기준으로 반복문

  let user1 = new Review(id, pwd, review)

  window.localStorage.setItem(pwd, user1)
  console.log(user1)
}

login.addEventListener('submit', onLogin)

class Review {
  constructor(id, pwd, reviewPoint, review) {
    this.id = id
    this.pwd = pwd
    this.reviewPoint = reviewPoint
    this.review = review
  }
}

//local Storage에 있는 데이터 불러서 li로 만들기
//여기부터 만들면 됨
function drawReview() {
  let drawTemp = ''

  for (let i = 0; i < window.localStorage.length; i++) {
    drawTemp = `<li>
        <div>
        <li>
        `
  }

  // localStorage.setItem(,JSON.stringify());
}

//localStorage를 사용하기 위해선 변수가 필요할 듯?
// 아이디 비번 (key, value)로 저장
// 내용은?  내용 value로하고 수정할 때 쓸 비번을 key로 만들면 될듯? -> 안됨
// Class 로 만들어서 cuz 로컬 스토리지에 객체로 저장 가능
// JSON.parse(localStorage.getItem(""))
// 객체는 생성자로 추가
// let x = localStroage.getItem("") 넣고
// if(x ===null ) 이면
// const y = JSON.stringify([]);
// localStorage.setItem("x", y);
// 이런식으로?
