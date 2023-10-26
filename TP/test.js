  // 탭버튼 구성
  const tabItem = document.querySelectorAll('.tab_item')
  const tabInner = document.querySelectorAll('.tab_inner')
  
  tabItem.forEach((tab, idx)=> {
      tab.addEventListener('click', function(){
          tabInner.forEach((inner)=> {
              inner.classList.remove('active')
          })
  
          tabItem.forEach((item)=> {
              item.classList.remove('active')
          })
  
          tabItem[idx].classList.add('active')
          tabInner[idx].classList.add('active')
      })
  })

