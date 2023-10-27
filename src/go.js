// 카드 클릭하면 해당 정보 보여주기
async function clickShow(e) {
  let name = e.target.className;
  let parentName = e.target.parentNode.className;

  console.log("name=>", name);
  console.log("parentName=>", parentName);
  console.log(e.target.parentNode.id);
  //클릭한 요소에 클래스 명이 card 라면, 해당 카드의 id 값으로 이동
  if (name == "card") {
    window.location.href = `./detail.html?id=${e.target.id}`;
  } //클릭한 요소의 부모요소 클래스 명이 card 라면, 해당 카드의 id 값으로 이동
  else if (parentName == "card") {
    window.location.href = `./detail.html?id=${e.target.parentNode.id}`;
  }
  //클릭한 요소의 부모요소 클래스명이 slideCard 라면, 해당 카드의 id 값으로 이동
  if (parentName == "slideCard") {
    window.location.href = `./detail.html?id=${e.target.parentNode.id}`;
  }
  //클릭한 요소의 클래스명이 slideCard 라면, 해당 카드의 id값으로 이동
  else if (name == "slideCard") {
    window.location.href = `./detail.html?id=${e.target.id}`;
  }
}

// 클릭한 카드 상세 정보 페이지로 이동
// function locat(goto) {
//   window.location.href = `https://www.themoviedb.org/movie/${goto}?language=ko`;
// }

export { clickShow };
