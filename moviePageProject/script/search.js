// 홈버튼 누르면 메인 창으로 돌아옴
document.getElementById('homeBtn').addEventListener('click', function () {
  location.href = './index.html'
})

// 검색버튼 누르면 이벤트 실행
document.getElementById('searchBtn').addEventListener('click', function () {
  let searchKeyword = document.querySelector('#searchInput').value
  document.querySelector('#filtered-movie').innerHTML = ''

  // 입력된 검색어가 없거나 공배을 입력한 경우 알럿 팝업 후 종료
  if (
    searchKeyword.trim() == '' ||
    searchKeyword == null ||
    searchKeyword == undefined
  ) {
    alert('검색어를 입력하세요')
    return
  }

  // 제목과 검색값을 비교해 맞는값이 있으면 화면에 나옴
  let search = title.filter((k, idx) => {
    if (
      k.toLowerCase() == searchKeyword.toLowerCase() || // 대소문자 구분 안하고 검색어와 제목 일치하거나
      k == searchKeyword || // 검색어와 제목이 일치하거나
      k.includes(searchKeyword.split(' ')) || // 제목에 검색어의 일부가 일치하거나
      k.split(' ').join('').includes(searchKeyword) // 띄어쓰기 안한 경우에도 일치하면 리턴
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

      // 검색된 제목을 search 배열에 담음
      return k
    }
  })

  // 검색된 영화가 없을 경우 알림창
  if (search.length == 0) {
    alert('검색 결과가 없습니다.')
  }

  // 클릭하면 해당 영화의 아이디값 보여줌
  search.forEach((ele, idx) => {
    document
      .querySelectorAll('.card')
      [idx].addEventListener('click', function () {
        alert(`영화 '${ele}'의 아이디는 ${this.dataset.documentid} 입니다!`)
      })
  })
})
