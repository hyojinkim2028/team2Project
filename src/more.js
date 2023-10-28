import { num, urlVal, genreArr, datasRepeat } from "./list.js";
import { genreUrlNum, makeGenreUrl, makeSearchUrl } from "./makeUrl.js";
import { getData } from "./getData.js";

//더보기 버튼 필요하면 보여주고, 데이터 없으면 안보여주기
async function moreHide(searchData, num) {
  console.log(searchData.total_pages, "페이지 중에서 ", num);
  const searchTotal = searchData.total_pages;
  if (searchTotal === 1 && num === 1) {
    document.querySelector("#more").classList.add("hide");
  } //검색 결과의 마지막 페이지 일때.
  else if (num === searchTotal && num > 1) {
    document.querySelector("#more").classList.add("hide");
  } //현재 페이지는 1, 전체 페이지는 1보다 크면
  else if (num === 1 && num < searchTotal) {
    document.querySelector("#more").classList.remove("hide");
  } //현재 페이지는 1이 아닌ㄴ데, 전체 페이지는 현재 페이지보다 크면
  else if (num < searchTotal && num !== 1) {
    document.querySelector("#more").classList.remove("hide");
  }
}

//list.html에서 더보기 누르면 경우에 따라 보여주기.
async function more() {
  const inputVal = document.querySelector("input").value;
  const urlGetVal = decodeURI(urlVal.replace("?val=", ""));

  //검색한 데이터를 더보기
  if (inputVal.length > 0) {
    const url = await makeSearchUrl(inputVal, num);
    const data = await getData(url);
    await moreHide(data, num);
    return datasRepeat(data.results);
  }
  //main에서 넘어온 후에 list 에 나온 데이터를 더보기
  else {
    const genreVal = urlVal.replace("?id=more&genre=", "");

    //장르별 슬라이드 데이터 더 가져오기.
    if (genreArr.includes(genreVal)) {
      const url = await genreUrlNum(genreVal, num);
      const data = await getData(url);
      await moreHide(data, num);
      return datasRepeat(data.results);
    }
    //인기영화, 최고평점영화 중 해당하는거 데이터 더 가져오기.
    else {
      const url = await makeGenreUrl(genreVal, num);
      const data = await getData(url);
      await moreHide(data, num);
      return datasRepeat(data.results);
    }
  }
}

export { moreHide, more };
