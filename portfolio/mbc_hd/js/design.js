// html엘리먼트 ie7,8인식;
 document.createElement('header');
 document.createElement('nav');
 document.createElement('article');
 document.createElement('section');
 document.createElement('aside');
 document.createElement('footer');
 

$(document).ready(function(){
	// gnb
	$(function(){
		var $snb =  $('.main_left_gnb > ul > li');
		var $a = $('.main_left_gnb > ul > li > a');
		$snb.on('mouseenter',function(){
			$(this).find('.inner_gnb').stop().slideDown('fast');
			$(this).addClass('active');
		})
		$snb.on('mouseleave',function(){
			$(this).find('.inner_gnb').stop().slideUp('fast');
			$(this).removeClass('active');
		});
		
	});
});
