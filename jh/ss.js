
// 관람평


// localstorage에 저장된 pwd담을 배열 =(key값)
let userInfo = []


//ul태그
const reviewUl = document.querySelector("#reviewList");



//form 태그에 정보 담아서 localstorage에 저장
const reviewSubmit = document.querySelector(".reviewSubmit");
const reviewInput = document.querySelector(".reviewSubmit input");


// loginReviewPoint도 만들어야됨
const login = document.querySelector("#login");
const loginId = document.querySelector("#login .loginId");
const loginPwd = document.querySelector("#login .loginPwd");
const loginReview = document.querySelector("#login .review");
const loginReviewPoint = document.querySelector("#login .reviewPoint")


//클래스에 들어갈 변수 모음
let id = "";
let pwd = "";
let reviewPoint = "";
let review = "";


//감상평 작성된것들 불러올 때 쓸 변수
const userIdElement = document.getElementById("userId");
const userPwdElement = document.getElementById("userPwd");


function onLogin(event) {
  //event.preventDefault();\
  
  id = loginId.value;
  pwd = loginPwd.value;
  review = loginReview.textContent;
  reviewPoint = loginReviewPoint.value;
  //window.localStorage.setItem(id, pwd);  

  

  //버튼 누르면 count++ 
  // count 값을 기준으로 반복문 
  
  let user = new Review(id, pwd, review, reviewPoint);

  // window.localStorage.setItem(pwd, user1); 객체 저장
  window.localStorage.setItem(pwd, JSON.stringify(user));   

  window.localStorage.setItem(pwd, JSON.stringify(user1));
}

login.addEventListener("submit", onLogin);

class Review {
    constructor(id, pwd, reviewPoint, review) {
        this.id = id;
        this.pwd = pwd;
        this.reviewPoint = reviewPoint;
        this.review = review;

    }
}

//local Storage에 있는 데이터 불러서 li로 만들기
//여기부터 만들면 됨
// 객체배열을 가지고오기? 
// 객체 배열을 그려주기  
// 객체 배열을 가지고 온다음에  그려줘야 할듯


//새로고침을 해주는게 있으면 좋지 않을까?
function drawReview(){
    let drawTemp ="";
    console.log(window.localStorage);
    a = window.localStorage.getItem(33);
    console.log(a);
    console.log(JSON.parse(a));
    console.log(typeof a);

    temp1 = new Review('aa', 'bb', 'cc');
    console.log(typeof temp1);
    console.log(temp1);

    for(let i=0; i<window.localStorage.length; i++){
        let usr = JSON.parse( window.localStorage.getItem( window.localStorage.key(i) ) );
        console.log(usr);


        drawTemp += 
        `<li>
            ${usr.id}
        <li>
        `
        
    }
    document.getElementById('reviewList').append(drawTemp);

    // localStorage.setItem(,JSON.stringify());


}
drawReview();




//localStorage를 사용하기 위해선 변수가 필요할 듯?
// 아이디 비번 (key, value)로 저장
// 내용은?  내용 value로하고 수정할 때 쓸 비번을 key로 만들면 될듯? -> 안됨
// Class 로 만들어서 cuz 로컬 스토리지에 객체로 저장 가능
// JSON.parse(localStorage.getItem(""))
// 객체는 생성자로 추가
// let x = localStroage.getItem("") 넣고
// if(x ===null ) 이면
// const y = JSON.stringify([]);
// localStorage.setItem("x", y);
// 이런식으로? 

