// import { register } from "swiper/element";
// import { Navigation, Pagination } from "swiper/modules";
// import Swiper from "./node_modules/swiper";
// import { Navigation, Pagination, Scrollbar } from "swiper/modules";
// import Swiper from "./node_modules/swiper/swiper-bundle.esm.browser.js";

let swipers = new Swiper(".mySwiper", {
  direction: "horizontal", // 가로 슬라이드 설정
  slidesPerView: 3, // 동시에 보여줄 슬라이드 갯수
  spaceBetween: 30, // 슬라이드간 간격
  centeredSlides: true, //이녀석을 false로 바꾸면 왼쪽부터 순차적으로 슬라이드가 들어섬

  // slidesPerGroup: 3, // __ 공백 생기는게 없어짐... 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음

  // 그룹수가 맞지 않을 경우 빈칸으로 메우기
  // 3개가 나와야 되는데 1개만 있다면 2개는 빈칸으로 채워서 3개를 만듬
  loopFillGroupWithBlank: true,

  loop: true, // 무한 반복

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    // prevEl: ".fa-circle-arrow-left",
  },
});

// var appendNumber = 4;
// var prependNumber = 1;
