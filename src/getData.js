//주소 받으면 데이터 가져와주는 함수 __ 첫 화면에 띄울 데이터 가져오기
async function getData(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWFiMzdhNmIxYTkzZDIzOTY1NGZiY2ZmM2VhOWRkMCIsInN1YiI6IjY1MmY2ZjU0MzU4ZGE3NWI1YzBkNzdhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0picm_azk3-QIu74ME7GpG1oTeQ5H4bGm7tRS-76--A",
    },
  };
  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export { getData };
