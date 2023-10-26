// 메인페이지 장르별 탭이동 구현

// 영화 api 조회
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWE4YzNmMGFlNGJjOTk3Y2U2ZDZjZjVhYmY3MTUzNiIsInN1YiI6IjY1MmY4NTdhYzk5NWVlMDBlM2Y2YTcxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4EMdkY70Gj6SFUCqcEf_Q1aZkFf96wfWZXcyxd9-nU',
  },
}

// 장르별 탭 이동 구현
const $nav = document.querySelector('#tabButtonNav')
const $sections = document.querySelectorAll('.tabSection')

$nav.addEventListener('click', (e) => {
  if (!e.target.classList.contains('tabButton')) {
    return
  }

  const focusedTabId = e.target.dataset.tabSection

  // 탭을 누르면 태그의 hidden 속성이 지워지며 해당 탭이 화면이 보여지고 나머지 탭의 화면들이 가려지게 구현함
  $sections.forEach(($section) => {
    if ($section.id === focusedTabId) {
      $section.removeAttribute('hidden')
    } else {
      $section.setAttribute('hidden', true)
    }
  })
})

// 액션탭
fetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_genres=28`,
  options
)
  .then((response) => response.json())
  .then((response) =>
    response.results.slice(0, 10).forEach((data) => {
      // 영화 아이디
      let id = data.id
      // 영화제목
      let title = data.title
      // 이미지
      let src = data.poster_path
      // 평점
      let vote_average = data.vote_average
      // 개봉일
      let release_date = data.release_date

      // 영화리스트 출력

      let movieList = `
        <div class="swiper-slide">
        <div class="slideCard" id = ${id}>
          <img class="poster" src="https://image.tmdb.org/t/p/w300${src}" alt="" / >
          <h5 class="title">${title}</h5>
          <span class="avg">평점 ${vote_average}</span>
          <span class="releasDate">${release_date}</span>
        </div>
      </div>
              `
      document
        .querySelector('#section1')
        .insertAdjacentHTML('beforeend', movieList)
    })
  )

  .catch((err) => console.error(err))

// 범죄탭

fetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_genres=80`,
  options
)
  .then((response) => response.json())
  .then((response) =>
    response.results.slice(0, 10).forEach((data) => {
      // 영화 아이디
      let id = data.id
      // 영화제목
      let title = data.title
      // 이미지
      let src = data.poster_path
      // 평점
      let vote_average = data.vote_average
      // 개봉일
      let release_date = data.release_date

      // 영화리스트 출력

      let movieList = `
      <div class="swiper-slide">
      <div class="slideCard" id = ${id}>
        <img class="poster" src="https://image.tmdb.org/t/p/w300${src}" alt="" / >
        <h5 class="title">${title}</h5>
        <span class="avg">평점 ${vote_average}</span>
        <span class="releasDate">${release_date}</span>
      </div>
    </div>
            `
      document
        .querySelector('#section2')
        .insertAdjacentHTML('beforeend', movieList)
    })
  )

  .catch((err) => console.error(err))

// 로맨스

fetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_genres=10749`,
  options
)
  .then((response) => response.json())
  .then((response) =>
    response.results.slice(0, 10).forEach((data) => {
      // 영화 아이디
      let id = data.id
      // 영화제목
      let title = data.title
      // 이미지
      let src = data.poster_path
      // 평점
      let vote_average = data.vote_average
      // 개봉일
      let release_date = data.release_date

      // 영화리스트 출력

      let movieList = `
      <div class="swiper-slide">
      <div class="slideCard" id = ${id}>
        <img class="poster" src="https://image.tmdb.org/t/p/w300${src}" alt="" / >
        <h5 class="title">${title}</h5>
        <span class="avg">평점 ${vote_average}</span>
        <span class="releasDate">${release_date}</span>
      </div>
    </div>
            `
      document
        .querySelector('#section3')
        .insertAdjacentHTML('beforeend', movieList)
    })
  )

  .catch((err) => console.error(err))

// 판타지

fetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_genres=14`,
  options
)
  .then((response) => response.json())
  .then((response) =>
    response.results.slice(0, 10).forEach((data) => {
      // 영화 아이디
      let id = data.id
      // 영화제목
      let title = data.title
      // 이미지
      let src = data.poster_path
      // 평점
      let vote_average = data.vote_average
      // 개봉일
      let release_date = data.release_date

      // 영화리스트 출력

      let movieList = `
      <div class="swiper-slide">
      <div class="slideCard" id = ${id}>
        <img class="poster" src="https://image.tmdb.org/t/p/w300${src}" alt="" / >
        <h5 class="title">${title}</h5>
        <span class="avg">평점 ${vote_average}</span>
        <span class="releasDate">${release_date}</span>
      </div>
    </div>
            `
      document
        .querySelector('#section4')
        .insertAdjacentHTML('beforeend', movieList)
    })
  )

  .catch((err) => console.error(err))

// 코미디

fetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_genres=35`,
  options
)
  .then((response) => response.json())
  .then((response) =>
    response.results.slice(0, 10).forEach((data) => {
      // 영화 아이디
      let id = data.id
      // 영화제목
      let title = data.title
      // 이미지
      let src = data.poster_path
      // 평점
      let vote_average = data.vote_average
      // 개봉일
      let release_date = data.release_date

      // 영화리스트 출력

      let movieList = `
 <div class="swiper-slide">
 <div class="slideCard" id = ${id}>
   <img class="poster" src="https://image.tmdb.org/t/p/w300${src}" alt="" / >
   <h5 class="title">${title}</h5>
   <span class="avg">평점 ${vote_average}</span>
   <span class="releasDate">${release_date}</span>
 </div>
</div>
       `
      document
        .querySelector('#section5')
        .insertAdjacentHTML('beforeend', movieList)
    })
  )

  .catch((err) => console.error(err))
