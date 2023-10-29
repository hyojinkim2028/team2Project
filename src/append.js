//데이터에 이미지 없을 경우 다른 이미지 넣어서 temping() 실행.
function appendFunc(data) {
  const noImg =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg?w=1800";
  const poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

  return data.poster_path === null
    ? temping(noImg, data)
    : temping(poster, data);
}

//받은 이미지와 데이터로 html파일 만들어서 내보내기
function temping(src, data) {
  console.log("temping 함수 실행중");
  // 구조분해 할당
  let { sort, id, king, title, vote_average, release_date, overview } = data;

  //카드 내용 글자수 제한
  const length = 130;
  if (overview.length > length) {
    overview = overview.substr(0, length - 1) + "...";
  }

  //평점 소숫점 1번째 자리까지만 나오게
  vote_average = vote_average.toFixed(2);

  if (data.king === "👑" && data.sort) {
    return `
      <div class="swiper-slide" id= ${sort}>
        <div class="slideCard" id = ${id}>
          <img class="poster" src="${src}" alt="" />
          <h5 class="title">${king}  ${title} </h5>
          <span class="avg">평점 ${vote_average}</span>
          <span class="releasDate">${release_date}</span>
        </div>
      </div>
    `;
  } else if (data.king !== "👑" && data.sort) {
    return `
        <div class="swiper-slide" id= ${sort}>
          <div class="slideCard" id = ${id}>
            <img class="poster" src="${src}" alt="" />
            <h5 class="title">${title}</h5>
            <span class="avg">평점 ${vote_average}</span>
            <span class="releasDate">${release_date}</span>
          </div>
        </div>
      `;
  } else {
    return `
    <div class="card" id = ${id}>
      <img class="poster" src="${src}" alt="" />
      <h5 class="title">${title}</h5>
      <p class="avg">평점 : ${vote_average}</p>
      <span class="comment">${overview}</span>
    </div>
  `;
  }
}

export { appendFunc };
