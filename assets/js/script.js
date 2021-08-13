// Initialize All Required DOM Element
/*
const burgerMenu = document.getElementById("burger");
const navbarMenu = document.getElementById("menu");

// Initialize Responsive Navbar Menu
burgerMenu.addEventListener("click", () => {
	burgerMenu.classList.toggle("active");
	navbarMenu.classList.toggle("active");

	if (navbarMenu.classList.contains("active")) {
		navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";
	} else {
		navbarMenu.removeAttribute("style");
	}
});
$(document).ready(function(){
    $(".lang-flag").click(function(){
      $(".language-dropdown").toggleClass("open");
    });
    $("ul.lang-list li").click(function(){
      $("ul.lang-list li").removeClass("selected");
      $(this).addClass("selected");
      if($(this).hasClass('lang-en')){
        $(".language-dropdown").find(".lang-flag").addClass("lang-en").removeClass("lang-ma").removeClass("lang-fr");
     //   $("#lang_selected").html("<p>EN</p>")
      }else if($(this).hasClass('lang-ma')){
        $(".language-dropdown").find(".lang-flag").addClass("lang-ma").removeClass("lang-fr").removeClass("lang-en");
      //  $("#lang_selected").html("<p>EN</p>")
      }else{
        $(".language-dropdown").find(".lang-flag").addClass("lang-fr").removeClass("lang-ma").removeClass("lang-en");
        //$("#lang_selected").html("<p>EN</p>")
      }
      $(".language-dropdown").removeClass("open");
    });
})*/


  /*
  start section 1
  Bootstrap Carousel and Animate.css
  */
/*********************
 *	Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
 const DOMReady = (
    callback = () => {},
    element = document,
    listener = 'addEventListener') =>
    {
      return element[listener] ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
    };
    
    /**
     *  @function   ProjectAPI
     *
     *  @type {{hasClass, addClass, removeClass}}
     */
    const ProjectAPI = (() => {
      let hasClass,
      addClass,
      removeClass;
    
      hasClass = (el, className) => {
        if (el === null) {
          return;
        }
    
        if (el.classList) {
          return el.classList.contains(className);
        } else
        {
          return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
      };
    
      addClass = (el, className) => {
        if (el === null) {
          return;
        }
    
        if (el.classList) {
          el.classList.add(className);
        } else
        if (!hasClass(el, className)) {
          el.className += ' ' + className;
        }
      };
    
      removeClass = (el, className) => {
        if (el === null) {
          return;
        }
    
        if (el.classList) {
          el.classList.remove(className);
        } else
        if (hasClass(el, className)) {
          let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    
          el.className = el.className.replace(reg, ' ');
        }
      };
    
      return {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass };
    
    })();
    
    
    /*********************
     *	Application Code
     ********************/
    /**
     *  @function   readyFunction
     *
     *  @type {Function}
     */
    const readyFunction = () => {
    
      const KEY_UP = 38;
      const KEY_DOWN = 40;
    
      let scrollingClass = 'js-scrolling',
      scrollingActiveClass = scrollingClass + '--active',
      scrollingInactiveClass = scrollingClass + '--inactive',
    
      scrollingTime = 1350,
      scrollingIsActive = false,
    
      currentPage = 1,
      countOfPages = document.querySelectorAll('.' + scrollingClass + '__page').length,
    
      prefixPage = '.' + scrollingClass + '__page-',
    
      _switchPages,
      _scrollingUp,
      _scrollingDown,
    
      _mouseWheelEvent,
      _keyDownEvent,
    
      init;
    
      /**
       *  @function _switchPages
       *
       *  @private
       */
      _switchPages = () => {
    
        let _getPageDomEl;
    
        /**
          *  @function _getPageDomEl
          *
          *  @param page
          *  @returns {Element}
          *  @private
         */
        _getPageDomEl = (page = currentPage) => {
          return document.querySelector(prefixPage + page);
        };
    
        scrollingIsActive = true;
    
    
        ProjectAPI.removeClass(
        _getPageDomEl(),
        scrollingInactiveClass);
    
        ProjectAPI.addClass(
        _getPageDomEl(),
        scrollingActiveClass);
    
    
        ProjectAPI.addClass(
        _getPageDomEl(currentPage - 1),
        scrollingInactiveClass);
    
    
        ProjectAPI.removeClass(
        _getPageDomEl(currentPage + 1),
        scrollingActiveClass);
    
    
    
        setTimeout(
        () => {
          return scrollingIsActive = false;
        },
        scrollingTime);
      };
      /**
        *  @function _scrollingUp
        *
        *  @private
        */
      _scrollingUp = () => {
        if (currentPage === 1) {
          return;
        }
    
        currentPage--;
    
        _switchPages();
      };
      /**
        *  @function _scrollingDown
        *
        *  @private
        */
      _scrollingDown = () => {
        if (currentPage === countOfPages) {
          return;
        }
    
        currentPage++;
    
        _switchPages();
      };
      /**
        *  @function _mouseWheelEvent
        *
        *  @param e
        *  @private
        */
       var count = 3;
       var countCheck = true;
       setInterval(function(){ 
         if(count > 0 && countCheck) {
         //  alert(count)
          _scrollingUp();
          count--;
          if(count === 0) countCheck = false;
         } else if(!countCheck){
          _scrollingDown();
          count++;
          if(count === 3) countCheck = true;
         }
        }, 2000);
      _mouseWheelEvent = e => {
        if (scrollingIsActive) {
          return;
        }
    
        if (e.wheelDelta > 0 || e.detail < 0) {
          _scrollingUp();
        } else
        if (e.wheelDelta < 0 || e.detail > 0) {
          _scrollingDown();
        }
      };
      /**
        *  @function _keyDownEvent
        *
        *  @param e
        *  @private
        */
      _keyDownEvent = e => {
        if (scrollingIsActive) {
          return;
        }
    
        let keyCode = e.keyCode || e.which;
    
        if (keyCode === KEY_UP) {
          _scrollingUp();
        } else
        if (keyCode === KEY_DOWN) {
          _scrollingDown();
        }
      };
    
      /**
       *  @function init
       *
       *  @note     auto-launch
       */
      init = (() => {
        document.addEventListener(
        'mousewheel',
        _mouseWheelEvent,
        false);
    
        document.addEventListener(
        'DOMMouseScroll',
        _mouseWheelEvent,
        false);
    
    
        document.addEventListener(
        'keydown',
        _keyDownEvent,
        false);
    
      })();
    
    };
    DOMReady(readyFunction);
    
    /**
     *  Launcher
     */
     
  
  
 
  /*
  End section 1
  Bootstrap Carousel and Animate.css
  */
// vars
/*
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
}
*/

const next = document.querySelector(".next");
const prev = document.querySelector(".previous");
const slides = document.querySelectorAll(".slide");

let index = 0;
display(index);

function display(index) {
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  slides[index].style.display = "flex";
}

function nextSlide() {
  index++;
  if (index > slides.length - 1) {
    index = 0;
  }
  display(index);
}

function prevSlide() {
  index--;
  if (index < 0) {
    index = slides.length - 1;
  }
  display(index);
}


next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

setInterval(nextSlide, 4000);


$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};

var heightWindow = $( window ).height();
//alert(heightWindow);
$(document).ready(function(event) {
  var checkScrollTop = true;
  setInterval(function() {
   
    if ($(window).scrollTop() >= 3370.666748046875 && checkScrollTop) {
     // alert($(window).scrollTop() >= 3370.666748046875 && checkScrollTop)
      $('#number1').jQuerySimpleCounter({end: 1230,duration: 3000});
      $('#number2').jQuerySimpleCounter({end: 623,duration: 3000});
      $('#number3').jQuerySimpleCounter({end: 25,duration: 2000});
      $('#number4').jQuerySimpleCounter({end: 246,duration: 2500});
      checkScrollTop = false;
    }
  }, 100);
});




/* AUTHOR LINK */
 $('.about-me-img').hover(function(){
        $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
    }, function(){
        $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
    });
    


    

/******/
/*
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
 
// When the user scrolls down 500px from the top of the document, show the button
   if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none"; 
  
  }

}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
 window.scrollTo({top: 0});
}
$(function(){
     $('#open').click(function(){
    $("#mySidenav").addClass('lft');
  });
      $('#close').click(function(){
    $("#mySidenav").removeClass('lft');
  });
 });

	$(window).scroll(function(){
      $('.fade').each(function(i){
        var bottom_of_object = $(this).position().top + $(this).outerHeight();
        var bottom_of_window =$(window).scrollTop() + $(window).height();

        if(bottom_of_window > bottom_of_object){
          $(this).animate({'opacity':'1'},900);
        }
      });
   });*/
   /*
   let menuIcon = document.querySelector('.menuIcon');
   let nav = document.querySelector('.overlay-menu');

   menuIcon.addEventListener('click', () => {
       if (nav.style.transform != 'translateX(0%)') {
           nav.style.transform = 'translateX(0%)';
           nav.style.transition = 'transform 0.2s ease-out';
       } else { 
           nav.style.transform = 'translateX(-100%)';
           nav.style.transition = 'transform 0.2s ease-out';
       }
   });


   // Toggle Menu Icon ========================================
   let toggleIcon = document.querySelector('.menuIcon');

   toggleIcon.addEventListener('click', () => {
       if (toggleIcon.className != 'menuIcon toggle') {
           toggleIcon.className += ' toggle';
       } else {
           toggleIcon.className = 'menuIcon';
       }
   });*/

   // ---------Responsive-navbar-active-animation-----------
 
$(document).ready(function(){
  $(".button a").click(function(){
      $(".overlay").fadeToggle(200);
     $(this).toggleClass('btn-open').toggleClass('btn-close');
  });
});
$('.overlay').on('click', function(){
  $(".overlay").fadeToggle(200);   
  $(".button a").toggleClass('btn-open').toggleClass('btn-close');
  open = false;
});