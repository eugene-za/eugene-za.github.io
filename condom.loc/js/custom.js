/**
 * Created by User on 17.03.2019.
 */
$(document).ready(function () {

    // is mobile
    var is_mobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        is_mobile = true;
    }

    // nav menu behavior
    (function () {
        var toggler = $('#nav-toggle');
        var nav = $('#nav');
        var header = $('#layout-site-header');
        var headerHeight = header.outerHeight();
        var speed = 300;

        toggler.on('click touch', function () {
            doToggleNav($(this).hasClass('open'));
        });

        $(window).on('resize', function () {
            if (toggler.hasClass('open')) {
                if ($(window).outerWidth() <= 950) {
                    doToggleNav(false);
                } else {
                    toggler.removeClass('open');
                    nav.css({'height': headerHeight + 'px', 'opacity': 0});
                    header.next().css({'paddingTop': headerHeight + 'px'});
                }
            } else {
                doToggleNav(true);
            }
        });

        // onload
        if ($(window).scrollTop() > 40) {
            header.addClass('minimized');
            doToggleNav(true);
        }

        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 40) {
                if (!header.hasClass('minimized')) {
                    header.addClass('minimized');
                }
                if ($(window).outerWidth() <= 950 && toggler.hasClass('open')) {
                    doToggleNav(true);
                }
            } else {
                header.removeClass('minimized');
            }
        });

        function doToggleNav(bool, animated) {
            animated = typeof animated === 'undefined' ? true : animated;
            var navHeight;

            if (bool) {
                toggler.removeClass('open');
                navHeight = 0;
            } else {
                toggler.addClass('open');
                navHeight = nav.get(0).scrollHeight;
            }
            if (animated) {
                nav.stop().animate({'height': navHeight + 'px', 'opacity': Number(!bool)}, speed);
                header.next().stop().animate({'paddingTop': headerHeight + navHeight + 'px'}, speed);
            } else {
                nav.css({'height': navHeight + 'px', 'opacity': 1});
                header.next().css({'paddingTop': headerHeight + navHeight + 'px'});
            }
        }
    })();

    // show articles preview
    (function () {
        // slideshow frame rate (milliseconds)
        var speed = 800;
        var a, images, framesPreviewCycle, flag;

        function loadFrames() {
            flag = true;
            var id = a.data("video-id");
            // TODO: setup ajax query for get list like {'http//:server/path/img.jpg', 'http//:server/path/img2.jpg'}
            // get photo frames from server
            /*
             $.getJSON( "/content/videos/" + id + "/frames", {
             video_id: id
             })
             .done(function( frames ) {
             return ajaxDone(frames);
             })
             .fail(function() {
             return ajaxFail();
             });
             */

            // TODO: demo until is not production. Delete it
            framesPreviewCicle = setTimeout(function () {
                var framesString = "content/videos/" + id + "/frames/1.jpg,content/videos/" + id + "/frames/2.jpg,content/videos/" + id + "/frames/3.jpg";
                var frames = framesString.split(',');

                return ajaxDone(frames);
            }, 300);
            // TODO: end demo
        }

        function ajaxDone(frames) {
            if (!frames) {
                a.addClass('no-frames');
                //flag = false;
                //return false;
            } else {
                var html = '<div class="previews">';
                $.each(frames, function (index, src) {
                    html += '<img src="' + src + '">';
                });
                html += '</div>';
                a.addClass('loaded-links');
                a.append(html);
                a.find('.previews img').on('load', function () {
                    $(this).addClass('loaded');
                });
                if (a.is(":hover")) {
                    showFrames();
                }
            }
            flag = false;
            return true;
        }

        function ajaxFail() {
            a.addClass('no-frames');
            flag = false;
            return false;
        }

        var i = 0;

        function runAnimation() {
            if (a.is(":hover")) {
                var img = images.eq(a.data('next'));
                if (img.hasClass('loaded')) {
                    images.filter('.show').removeClass('show');
                    img.addClass('show');
                } else {
                    framesPreviewCycle = setTimeout(function () {
                        setNext();
                        runAnimation();
                    }, 300);
                    return;
                }
                a.addClass('hide-preloader');
                setNext();

                framesPreviewCycle = setTimeout(function () {
                    runAnimation();
                }, speed);
            }
        }

        function setNext() {
            a.data('next', ((a.data('next') + 1) < a.data('count'))
                ? (a.data('next') + 1)
                : 0);
        }

        function showFrames() {
            a.data('count', a.data('count') || a.find('.previews img').length);
            a.data('next', a.data('next') || 0);
            images = a.find('.previews img');
            runAnimation(images);
        }

        function initPreview(article) {
            if (flag) {
                setTimeout(function () {
                    initPreview(article);
                }, 100);
                return;
            }
            clearInterval(framesPreviewCycle);
            a = article;
            if (a.hasClass('loaded-links')) {
                showFrames();
            } else {
                loadFrames();
            }
        }

        function endPreview() {
            clearInterval(framesPreviewCycle);
            if (a.hasClass('loaded-links')) {
                a.find('.show').removeClass('show');
            }
        }

        // event listener
        if (is_mobile) {
            var touchStartTime;
            var touchEndTime;
            $('.section-video-list article:not(.no-frames)').on('touchstart', function (e) {
                var d = new Date();
                touchStartTime = d.getTime();
                initPreview($(this));
            }).on('touchend', function (e) {
                var d = new Date();
                touchEndTime = d.getTime();
                if (touchEndTime - touchStartTime > 500) {
                    if (e.handled === false) return;
                    e.stopPropagation();
                    e.preventDefault();
                    e.handled = true;
                } else {
                    $(this).click();
                }
                endPreview();
            });
        } else {
            $('.section-video-list article:not(.no-frames)').hover(function () {
                initPreview($(this));
            }, function () {
                endPreview();
            });
        }
    })();

    // share buttons
    (function () {
        var toggler = $('#video-share');
        if (toggler.length) {
            var sm = $('#buttons .submenu');

            function setPosition() {
                var w1 = toggler.width();
                var w2 = sm.width();
                sm.css('left', (w2 - w1) / -2 + 'px');
                if (sm.offset().left < 5) {
                    sm.offset({left: 5});
                }
                if ((sm.offset().left + w2) > $(window).width()) {
                    sm.offset({left: $(window).width() - w2 - 10});
                }
            }

            // onload
            setPosition();

            var to;
            $(window).on('resize', function () {
                clearInterval(to);
                to = setTimeout(function () {
                    setPosition()
                }, 500);
            });

            toggler.on('click', function () {
                $('#buttons').toggleClass('open');
            });


            sm.filter('a').each(function (i, obj) {
                switch (obj.className) {

                }
                obj.attr('href')
            });
        }


    })();

    // video description
    (function () {
        var toggler = $('#video-description-toggle');
        if (toggler.length) {
            var descContainer = $('.video-description');
            var descText = descContainer.text();
            var shortText;
            if (descText.length > 397) {
                shortText = descText.substr(0, 397);
                updateText(shortText + '...');
            } else {
                toggler.css('display', 'none');
            }

            toggler.on('click', function () {
                if (toggler.hasClass('open')) {
                    toggler.removeClass('open');
                    toggler.text('Развернуть');
                    updateText(shortText + '...');
                } else {
                    toggler.addClass('open');
                    toggler.text('Свернуть');
                    updateText(descText);
                }
            });

            function updateText(text) {
                descContainer.text(text);
            }
        }
    })();


});

