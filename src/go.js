// 카드 클릭하면 해당 정보 보여주기
async function clickShow(e) {
  let name = e.target.className;
  let parentName = e.target.parentNode.className;

  console.log("name=>", name);
  console.log("parentName=>", parentName);
  console.log(e.target.parentNode.id);
  if (name != "cardContainer" && name == "card") {
    alert("영화 id : " + e.target.id);
    window.location.href = `./detail.html?id=${e.target.id}`;
  } else if (name != "cardContainer" && parentName == "card") {
    alert("영화 id : " + e.target.parentNode.id);
    locat(e.target.parentNode.id);
  }
  //클릭한 요소의 부모요소 클래스명이 slideCard 라면, 해당 카드의 id 값으로 이동
  if (parentName == "slideCard") {
    alert("영화 id : " + e.target.parentNode.id);
    window.location.href = `./detail.html?id=${e.target.parentNode.id}`;
  }
  //클릭한 요소의 클래스명이 slideCard 라면, 해당 카드의 id값으로 이동
  else if (name == "slideCard") {
    alert("영화 id : " + e.target.id);
    window.location.href = `./detail.html?id=${e.target.id}`;
  }
}

// 클릭한 카드 상세 정보 페이지로 이동
// function locat(goto) {
//   window.location.href = `https://www.themoviedb.org/movie/${goto}?language=ko`;
// }

export { clickShow };
