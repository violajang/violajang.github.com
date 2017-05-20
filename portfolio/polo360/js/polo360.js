$(document).ready(function(){
	var pagerItem=$('.photosDots li'),
	slideItem=$('.visualPhotos li'),
	viewport=$('.visualPhotos ul'),
	prevBtn=$('.photosBtn').find('.pre'),
	nextBtn=$('.photosBtn').find('.nex'),
	slideItemWidth=slideItem.width(),
	slideItemTotal=slideItem.length,
	currentIndex=0;

	$(window).resize(function(){
     slideItemWidth=slideItem.width();
	 viewport.css({"margin-left":currentIndex*-slideItemWidth});
	})

  nextBtn.click(function(){
	  currentIndex++;
	  if(currentIndex==slideItemTotal) currentIndex=0;
	  slideAni();
	  return false;
  }); //end of nexb click

  prevBtn.click(function(){
	currentIndex--;
	if(currentIndex<0) currentIndex=slideItemTotal-1;
	
	slideAni();
	return false;
	})//end of pagerClick

  pagerItem.click(function(){
	 pagerItem.removeClass("on");
	 currentIndex=$(this).index();
	 pagerItem.eq(currentIndex).addClass("on");
	
	 slideAni();
	return false;
  })//end of pagerlik.click

	function slideAni(){
	 pagerItem.removeClass("on");
	 pagerItem.eq(currentIndex).addClass("on");
	 viewport.stop().animate({"margin-left":currentIndex*-slideItemWidth},1000);
	}//slideAni

	$('.m_gnb_btn>a').click(function(){
		$('.Mgnb').stop().slideToggle('slow');
		return false;
	});//end of m_gnb
	
});