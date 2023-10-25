//테스트용 버튼
const btn = document.querySelector("#btn")

//버튼 클릭시 생성될 영역
const section = document.querySelector("section");

//form 태그에 정보 담아서 localstorage에 저장
const reviewSubmit = document.querySelector(".reviewSubmit");
const reviewInput = document.querySelector(".reviewSubmit input");



//localStorage를 사용하기 위해선 변수가 필요할 듯?
// 아이디 비번 (key, value)로 저장
// 내용은?  내용 value로하고 수정할 때 쓸 비번을 key로 만들면 될듯?




btn.addEventListener("click", () =>{
    drawReviewForm();
})



//form test용 함수

function onLogin(event){
    event.preventDefault();
    const text = reviewInput.ariaValueMax;
    console.log(text);

}

reviewSubmit.addEventListener("submit", onLogin());


// 관람평 버튼 클릭시 생성되는 폼태그 (감상평 남기기)
// 폼태그 제출 시 새로고침 되면서 사라짐?? 어캐 고침?

function drawReviewForm(){
    section.innerHTML = "";

    let reviewTemp = 
    ` 
    <form class="reviewSubmit" id="login">
    <div>
        <div>
        <span>관람평<span>
        </div>
        <div>
        <span>감상포인트<span>
        </div>
        <div>
        <span><input type="text"><span>
        </div>
        <div>
        <input type="submit">
       </div>
    <form>
    `;

    section.innerHTML += reviewTemp;   

}






//로컬 스토리지에 저장된 감상평
//폼 태그로 전송된 데이터를 local stroage에서 가져와서 그리기

function drawReviews(){


}

