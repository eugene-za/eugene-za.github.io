$(document).ready(function () {
	/*----------------------- flipclockInit -----------------------*/
	var clock;
	clock = $('.flipClock').FlipClock({
		autoStart: false,
		callbacks: {
			stop: function () {
				//$('.flipClock').html('The clock has stopped!')
			}
		}
	});
	clock.setTime(20400);
	clock.setCountdown(true);
	clock.start();
	/*----------------------- navigationMenu -----------------------*/
	var body = $('body');
	var nav = $('.nav');
	navInit();
	$(window).resize(function () {
		navInit()
	});
	function navInit() {
		if (!nav.hasClass('hiding')) {
			body.pos = nav.height() + 'px';
		}
		else {
			body.pos = '0px';
			nav.css('top', -nav.height() + 'px');
		}
		if (nav.height() > 90) {
			if (!$('.hider').length) {
				nav.append('<div class="hider"></div>');
				/*animation*/
				$('.hider').click(function () {
					if (nav.hasClass('hiding')) {
						body.pos = nav.height() + 'px';
						nav.pos = '0px';
						nav.removeClass('hiding');
					} else {
						body.pos = '0px';
						nav.pos = -nav.height() + 'px';
						nav.addClass('hiding');
					}
					body.animate({'paddingTop': body.pos}, 500);
					nav.animate({'top': nav.pos}, 500);
				});
			}
		}
		else {
			$('.hider').remove();
			nav.css('top', '0px');
			body.pos = nav.height() + 'px';
		}
		body.css('paddingTop', body.pos);
	}

	/*----------------------- scrollToAnchor -----------------------*/
	function scrollToAnchor(aid) {
		var section = $("#" + aid);
		section.pos = section.offset().top - parseInt(body.pos);
		$('html,body').stop().animate({scrollTop: section.pos}, 1000);
	}

	$('a').click(function (e) {
		if ($(this).hasClass('phoneNumber')) return;
		e.preventDefault();
		scrollToAnchor($(this).attr('href').split("#")[1]);
	});
	/*----------------------- formPopup -----------------------*/
	var form = $('#form');
	$('button.big').click(function () {
		form.fadeIn();
	});
	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			form.fadeOut();
		}
	});
	$('#form .close').click(function () {
		form.fadeOut();
	});
	/*----------------------- elementInFocusAnimation -----------------------*/
	$('#compare table td, #colors > div').bind('inview', function (event, visible) {
		if (visible == true) {
			$(this).addClass('inview');
		} else {
			$(this).removeClass('inview');
		}
	});
});
