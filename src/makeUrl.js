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

//인기순, 높은평점순 데이터 가져오기 위한 주소 생성기
function urlAdr(num, what) {
  return `https://api.themoviedb.org/3/movie/${what}?language=ko-KR&page=${num}`;
}

export { genreUrlNum, makeGenreUrl, makeSearchUrl, urlAdr };
