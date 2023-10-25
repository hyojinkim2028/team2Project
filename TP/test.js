  //영화 api 조회
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWE4YzNmMGFlNGJjOTk3Y2U2ZDZjZjVhYmY3MTUzNiIsInN1YiI6IjY1MmY4NTdhYzk5NWVlMDBlM2Y2YTcxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v4EMdkY70Gj6SFUCqcEf_Q1aZkFf96wfWZXcyxd9-nU',
    },
  }
  // 탭버튼 구성
  const tabList = document.querySelectorAll('.tabMenu .list li');
  for(var i = 0; i < tabList.length; i++){
    tabList[i].querySelector('.btn').addEventListener('click', function(e){
      e.preventDefault();
      for(var j = 0; j < tabList.length; j++){
        tabList[j].classList.remove('isOn');
      }
      this.parentNode.classList.add('isOn');
    });
  }

