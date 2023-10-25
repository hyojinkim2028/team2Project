let swipers = new Swiper('.mySwiper', {
  direction: 'horizontal', // 가로 슬라이드 설정
  slidesPerView: 5, // 동시에 보여줄 슬라이드 갯수
  spaceBetween: 1, // 슬라이드간 간격
  // centeredSlides: true, //false로 바꾸면 왼쪽부터 순차적으로 슬라이드가 들어섬

  slidesPerGroup: 5, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음

  // 그룹수가 맞지 않을 경우 빈칸으로 메우기
  loopFillGroupWithBlank: true,

  // loop: true, // 무한 반복

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
document.querySelector('.slideMore').addEventListener('click', function () {
  console.log(e.target.prev())
  // window.location.href = `"populerList.html?ID=" +${num}`
  window.location.href = 'populerList.html'
})
