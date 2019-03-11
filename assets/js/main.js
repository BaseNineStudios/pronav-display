// jshint -W1
(function (pronav, $, undefined) {

    var contacts = [];
    if(typeof(Storage) !== "undefined") {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }

    function submitInfo(data) {
      var pref = [];
        var name = $("#name").val();
        $.each($(".pref"), function(k, v) {
          if(v.checked)
            pref.push($(v).val());
        });
        var phone = $("#phone").val();
        var email = $("#email").val();
        var motor = $("#model").val();

        var info = {
          name: name,
          contact_pref: JSON.stringify(pref),
          phone: phone,
          email: email,
          motor_model: motor
        };
        if(contacts === null)
          contacts = [];

        contacts.push(info);
        $("form input").val("");
        localStorage.setItem("contacts", JSON.stringify(contacts));
        console.log(localStorage.getItem("contacts"));
    }

    // Example starter JavaScript for disabling form submissions if there are invalid fields

    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              submitInfo();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

    $(window)
        .on('load', function () {

          var mainHeight = $('.main-page').outerHeight();
          var footerHeight = $('.footer').outerHeight();
          // $('.main-nav').css({'height':mainHeight+footerHeight});



          if ($('.body-home').length) {
            $('#slideshow > img:first-child').css({'opacity':1});
            $('.callout-slideshow > img:first-child').css({'opacity':1});
            footerHeight = $('.footer').outerHeight() + $('.footer-home').outerHeight();
            $('.main-nav').css({'height':mainHeight+footerHeight});
            $('#slideshow').css({'height':mainHeight});
          }


          var theWindow        = $(window),
          $bg              = $("#slideshow > img"),
          aspectRatio      = $bg.width() / $bg.height();

        	function resizeBg() {

        		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
        		    $bg
        		    	.removeClass('bgwidth')
        		    	.addClass('bgheight');
        		} else {
        		    $bg
        		    	.removeClass('bgheight')
        		    	.addClass('bgwidth');
        		}

        	}

         theWindow.resize(resizeBg).trigger("resize");

        }); // window load

    $(window)
        .on('resize', function () {



        }); // window resize

    $(window)
        .on('scroll', function () {

        }); // window scroll

    $(document).ready(function () {


      $("#all").click(function () {
        var checked = $(this).prop('checked');
        $(".pref").prop('checked', checked);
        if(checked) {
          $("#phone-group, #email-group").show(500);
          $('#all_lbl').text("Deselect All");
          $("#phone").prop("required", true);
          $("#email").prop("required", true);
        } else {
          $("#phone-group, #email-group").hide(500);
          $('#all_lbl').text("Select All");
          $("#phone").prop("required", false);
          $("#email").prop("required", false);
        }
      });

      $(document).on('click', '#phone_chk', function(e) {
        if(this.checked) {
          $("#phone-group").show(500);
          $("#phone").prop("required", true);
        } else {
          if(!$("#text_chk").prop("checked")) {
            $("#phone-group").hide(500);
            $("#phone").prop("required", false);
          }
          $("#all").prop("checked", false);
          $("#all_lbl").text("Select All");
        }
      });

      $(document).on('click', '#text_chk', function(e) {
        if(this.checked) {
          $("#phone-group").show(500);
          $("#phone").prop("required", true);
        } else {
          if(!$("#phone_chk").prop("checked")) {
            $("#phone-group").hide(500);
            $("#phone").prop("required", false);
          }
          $("#all").prop("checked", false);
          $("#all_lbl").text("Select All");
        }
      });

      $(document).on('click', '#email_chk', function(e) {
        if(this.checked) {
          $("#email-group").show(500);
          $("#email").prop("required", true);
        } else {
          $("#email-group").hide(500);
          $("#all").prop("checked", false);
          $("#all_lbl").text("Select All");
          $("#phone").prop("required", false);
        }
      });








      $(document).on('fancybox-cleanup', function(){
        $('video,audio').trigger('stop');
      });

      if ($('.fancybox').length) {
        $(".fancybox").fancybox({
              // maxWidth    : 800,
              // maxHeight   : 600,
              fitToView   : false,
              width       : '100%',
              height      : '93%',
              autoSize    : false,
              closeClick  : false,
              openEffect  : 'none',
              closeEffect : 'none',
              afterShow: function() {
                this.content.find('video').trigger('play')
              },
              afterClose: function() {
                $('video').each(function() {
                  this.pause();
                  this.currentTime = 0;
                });
              }
          });
        }


      /* Slideshow */

      var duration = 20; // Duration in seconds
      var fadeAmount = 0.3; // Fade duration amount relative to the time the image is visible

      if ($('#slideshow').length) {

        var images = $('#slideshow > img');
        var images2 = $('.callout-slideshow > img');
        var numImages = images.length;
        var durationMs = duration * 2000;
        var imageTime = durationMs / numImages; // Time the image is visible
        //var fadeTime = imageTime * fadeAmount; // Time for cross fading
        var fadeTime = 500; // Time for cross fading
        var visibleTime = imageTime - (imageTime * fadeAmount * 2); // Time the image is visible with opacity == 1
        var animDelay = visibleTime * (numImages - 1) + fadeTime * (numImages - 2); // Animation delay/offset for a single image

        images.each(function (index, element) {
            if (index != 0) {
                $(element)
                    .css('opacity', '0');
                setTimeout(function () {
                    doAnimationLoop(element, fadeTime, visibleTime, fadeTime, animDelay);
                }, visibleTime * index + fadeTime * (index - 1));
            } else {
                setTimeout(function () {
                    $(element)
                        .animate({
                            opacity: 0,
                        }, fadeTime, function () {
                            setTimeout(function () {
                                doAnimationLoop(element, fadeTime, visibleTime, fadeTime, animDelay);
                            }, animDelay)
                        });
                }, visibleTime);
            }
        });
        images2.each(function (index, element) {
            if (index != 0) {
                $(element)
                    .css('opacity', '0');
                setTimeout(function () {
                    doAnimationLoop(element, fadeTime, visibleTime, fadeTime, animDelay);
                }, visibleTime * index + fadeTime * (index - 1));
            } else {
                setTimeout(function () {
                    $(element)
                        .animate({
                            opacity: 0,
                        }, fadeTime, function () {
                            setTimeout(function () {
                                doAnimationLoop(element, fadeTime, visibleTime, fadeTime, animDelay);
                            }, animDelay)
                        });
                }, visibleTime);
            }
        });

      }


    });


    $(document).on('click', '.main-nav-toggle', function (e) {
      e.preventDefault();
      $('.main-nav-content').addClass('active');
    });
    $(document).on('click', '.nav-close', function (e) {
      e.preventDefault();
      $('.main-nav-content').removeClass('active');
    });




    // creates a animation loop
    function doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime) {
        fadeInOut(element, fadeInTime, visibleTime, fadeOutTime, function () {
            setTimeout(function () {
                doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime);
            }, pauseTime);
        });
    }

    // Shorthand for in- and out-fading
    function fadeInOut(element, fadeIn, visible, fadeOut, onComplete) {
        return $(element)
            .animate({
                opacity: 1,
            }, fadeIn)
            .delay(visible)
            .animate({
                opacity: 0,
            }, fadeOut, onComplete);
    }

    function arrayContains(string, array) {
        return (array.indexOf(string) > -1);
    }


})(window.pronav = window.pronav || {}, jQuery);
