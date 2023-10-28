// 카드 클릭하면 해당 정보 보여주기
async function clickShow(e) {
  const name = e.target.className;
  const parentName = e.target.parentNode.className;

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

export { clickShow };
