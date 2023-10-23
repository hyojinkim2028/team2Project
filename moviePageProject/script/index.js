// 영화 api 조회
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWE4YzNmMGFlNGJjOTk3Y2U2ZDZjZjVhYmY3MTUzNiIsInN1YiI6IjY1MmY4NTdhYzk5NWVlMDBlM2Y2YTcxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4EMdkY70Gj6SFUCqcEf_Q1aZkFf96wfWZXcyxd9-nU',
  },
}

// 조회해올 영화 데어터 값 담을 배열 선언
let id = []
let title = []
let overview = []
let poster_path = []
let vote_average = []

// 조회한 영화 데이터들 페이지에 뿌려줌
const getPage = fetch(
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=ko-KR&sort_by=popularity.desc',
  options
)
  .then((response) => response.json())
  .then((response) =>
    response.results.forEach((data, idx) => {
      // 조회해온 데이터 각각 배열에 푸쉬

      // 영화 아이디
      id.push(data.id)
      // 영화제목
      title.push(data.title)
      // 줄거리
      overview.push(data.overview)
      // 이미지
      poster_path.push(data.poster_path)
      // 평점
      vote_average.push(data.vote_average)

      // 영화리스트 출력

      let movieList = `
          <div class="col">
          <div class="card" style="border-radius: 20px;" data-documentId=${id[idx]}>
            <div class="card-body" style="height: 1000px; overflow:auto">
                <h5 class="card-title" style="text-align:center; font-size:1.5rem; height:50px"">${title[idx]}</h5>
                <div style="width: 300px;">
                <img src="https://image.tmdb.org/t/p/w300${poster_path[idx]}" style="border:2px solid black; border-radius: 20px;margin: 30px 0px 30px 25px; width: 100%; height: 500px;" >
  
                <p class="card-text" style="margin-left:40px;">평점: ${vote_average[idx]}</p>
                <p class="card-text" style="margin-left:40px;">줄거리 : ${overview[idx]}</p>
            </div>
          </div>
        </div>
          `

      document
        .querySelector('#my-movies')
        .insertAdjacentHTML('beforeend', movieList)

      // 클릭하면 해당 영화의 아이디값 보여줌
      document
        .querySelectorAll('.card')
        [idx].addEventListener('click', function () {
          alert(
            `영화 '${title[idx]}'의 id는 ${this.dataset.documentid} 입니다.`
          )
        })
    })
  )
  .catch((err) => console.error(err))
