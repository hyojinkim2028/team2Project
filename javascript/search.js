document.getElementById('homeBtn').addEventListener('click', function () {
  location.href = './index.html'
})

// 검색버튼 누르면 이벤트 실행
document.getElementById('searchBtn').addEventListener('click', function () {
  // 문자열 포함여부 정규식
  let searchKeyword = document.querySelector('#searchInput').value
  document.querySelector('#filtered-movie').innerHTML = ''

  let search = title.find((k, idx) => {
    if (
      k.toLowerCase() == searchKeyword.toLowerCase() ||
      k.toLowerCase().includes(searchKeyword.split(' '))
    ) {
      let findOne = `
        <div class="col">
        <div class="card" style="border-radius: 20px;" data-documentId=${id[idx]}>
          <div class="card-body" style="height: 1000px; overflow:auto">
              <h5 class="card-title" style="text-align:center; font-size:1.5rem; height:50px"">${title[idx]}</h5>
              <div style="width: 300px;">
              <img src="https://image.tmdb.org/t/p/w300${poster_path[idx]}" >
              <p class="card-text">평점: ${vote_average[idx]}</p>
              <p class="card-text">줄거리 : ${overview[idx]}</p>
          </div>
        </div>
      </div>
        `
      document.querySelector('#my-movies').innerHTML = ''
      document
        .querySelector('#filtered-movie')
        .insertAdjacentHTML('beforeend', findOne)
    }
  })

  // 입력을 안하거나 검색결과 없을 시

  if (searchKeyword.trim() == '' || searchKeyword == null) {
    alert('검색어가 입력되지 않았습니다.')
  } else if (
    !title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    !k.toLowerCase().includes(searchKeyword.split(' ').toLowerCase())
  ) {
    alert('검색 결과가 없습니다')
  }
})
