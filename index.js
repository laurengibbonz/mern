var animation = lottie.loadAnimation({
  container: document.getElementById('animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'check-ae.json'
});

animation.addEventListener('complete', function(){  
  window.alert("Search");
});

animation.addEventListener('DOMLoaded', function(e) { 
  console.log('DOM loaded'); 
});