//카드 클릭하면 해당 정보 보여주기
async function clickShow(e) {
  let name = e.target.className;
  let parentName = e.target.parentNode.className;

  if (name != "cardContainer" && name == "card") {
    alert("영화 id : " + e.target.id);
    locat(e.target.id);
  } else if (name != "cardContainer" && parentName == "card") {
    alert("영화 id : " + e.target.parentNode.id);
    locat(e.target.parentNode.id);
  }
}

// //클릭한 카드 상세 정보 페이지로 이동
function locat(goto) {
  window.location.href = `https://www.themoviedb.org/movie/${goto}?language=ko`;
}

export { clickShow };
