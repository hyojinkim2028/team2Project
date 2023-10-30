import { getData } from './getData.js'
import { appendFunc } from './append.js'
import { clickShow } from './go.js'
import { urlAdr } from './makeUrl.js'

const swiperWrapper = document.querySelectorAll('.swiper-wrapper')
let num = 1
let temp = ''

//인기영화 데이터 가져오기.
const popularUrl = urlAdr(num, 'popular')
const popularDatas = await getData(popularUrl)
await datasRepeat(popularDatas.results, { sort: 'popular' }, 0, 10)
//데이터, 영화구분, 클래스인덱스, 몇개 가져올건지

//높은 평점순 데이터 가져오기
const rateUrl = urlAdr(num, 'top_rated')
const datas = await getData(rateUrl)
await datasRepeat(datas.results, { sort: 'top_rated' }, 1, 10)

//데이터 반복하면서 appendFunc로 보내주고 거기서 받은 값 붙여주기
async function datasRepeat(data, sortType, index, many) {
  console.log('datasRepeat 함수 실행중')
  temp = ''
  for (let i = 0; i < many; i++) {
    //3위 까지는 왕관모양 붙여주기
    if (i < 3) {
      Object.assign(data[i], { king: '👑' }, sortType)
    } //나머지는 왕관 없이 붙여주기
    else {
      Object.assign(data[i], sortType)
    }
    temp += appendFunc(data[i])
  }
  return (swiperWrapper[index].innerHTML += temp)
}

//more버튼 중 어떤걸 눌러도 slideMore 함수 실행
const selectMore = document.querySelectorAll('.more')
for (let i = 0; i < selectMore.length; i++) {
  selectMore[i].addEventListener('click', slideMore)
}

//클릭한 해당 장르id 찾아서 리스트 페이지로 이동
async function slideMore(e) {
  const genreId = e.target.nextElementSibling.firstElementChild.id
  window.location.href = `./list.html?id=more&genre=${genreId}`
}

//카드슬라이드 중 어떤걸 눌러도 clickShow 함수 실행
const swiperLength = document.querySelectorAll('.swiper-wrapper').length
for (let i = 0; i < swiperLength; i++) {
  document
    .querySelectorAll('.swiper-wrapper')
    [i].addEventListener('click', clickShow)
}

//화살표 누르면 좌표 맨 위로
document
  .querySelector('.upIconWarp')
  .addEventListener('click', () => window.scrollTo(0, 0))

//검색 버튼 누르면 inputHref 함수 실행
document.querySelector('#searchBtn').addEventListener('click', inputHref)

//엔터키 입력하면 inputHref 함수 실행
document
  .querySelector('#searchInput')
  .addEventListener('keypress', async function (e) {
    if (e.keyCode == 13 || e.which == 13) {
      inputHref()
    }
  })

//인풋값 가져와서 페이지 이동
async function inputHref() {
  let inputVal = document.querySelector('input').value
  window.location.href = `./list.html?val=${inputVal}`
}

export { num, temp, selectMore }
