// 메인화면의 슬라이드 기능 구현
let swipers = new Swiper(".mySwiper", {
  direction: "horizontal", // 가로 슬라이드 설정

  slidesPerView: 5, // 동시에 보여줄 슬라이드 갯수
  spaceBetween: 1, // 슬라이드간 간격
  slidesPerGroup: 5, // 그룹으로 묶을 수

  // 그룹수가 맞지 않을 경우 빈칸으로 메우기
  loopFillGroupWithBlank: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
