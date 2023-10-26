//함수 가져와서 실행할때 비동기 처리 해줘야 함.
// getData(urlAdr)
//   .then((data) => data.results)
//   .then((data) => appendFunc(data));

//이미지 없을 경우 다른 이미지 넣어서 temping() 실행.
function appendFunc(data) {
  // 구조분해 할당 _ obj를 export 하려고?!
  // let { poster_path, title, overview, vote_average } = da;
  let noImg =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg?w=1800";
  let poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;

  return data.poster_path === null
    ? temping(noImg, data)
    : temping(poster, data);
}

//받은 데이터로 html파일 보내주기.
function temping(src, data) {
  // console.log(data);
  let length = 130;
  if (data.overview.length > length) {
    data.overview = data.overview.substr(0, length - 1) + "...";
  }
  if (data.king === "👑") {
    return `
      <div class="swiper-slide" id= ${data.sort}>
        <div class="slideCard" id = ${data.id}>
          <img class="poster" src="${src}" alt="" />
          <h5 class="title">${data.king}  ${data.title} </h5>
          <span class="avg">평점 ${data.vote_average}</span>
          <span class="releasDate">${data.release_date}</span>
        </div>
      </div>
    `;
  } else if (data.king !== "👑") {
    return `
        <div class="swiper-slide" id= ${data.sort}>
          <div class="slideCard" id = ${data.id}>
            <img class="poster" src="${src}" alt="" />
            <h5 class="title">${data.title}</h5>
            <span class="avg">평점 ${data.vote_average}</span>
            <span class="releasDate">${data.release_date}</span>
          </div>
        </div>
      `;
  } else if (data.sort === "populerList") {
    return `
        <div class="card" id = ${data.id}>
          <img class="poster" src="${src}" alt="" />
          <h5 class="title">${data.title}</h5>
          <p class="avg">평점 : ${data.vote_average}</p>
          <span class="comment">${data.overview}</span>
        </div>
      `;
  }
}

export { appendFunc };
