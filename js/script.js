;(function ($) {
  $(function () {

    // Slider Header
    $('.slider').slick({
      speed: 1000,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      fade: true,
      appendArrows: false,
      pauseOnDotsHover: true
    });

    // Slider Latest News
    $('.news__slider').slick({
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      pauseOnDotsHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            dots: false,
          }
        }
      ]
    });

    // Сhange background after changing slide
    $('.slider').on('afterChange', function (event, slick, currentSlide) {
      if (currentSlide === 0)
        $('.header').css('background', "url('img/header-bg.png') no-repeat top center / cover, linear-gradient(45deg, rgb(85,183,255) 0%, rgb(126,90,255) 100%)");
      else if (currentSlide === 1)
        $('.header').css('background', "url('img/change-bg-1.png') no-repeat bottom center / cover, linear-gradient(45deg, rgb(255,85,85) 0%, rgb(126,90,255) 100%)");
      else if (currentSlide === 2)
        $('.header').css('background', "url('img/change-bg-2.png') no-repeat bottom center / cover, linear-gradient(45deg, rgb(47,243,14) 0%, rgb(126,90,255) 100%)");
    });

    // To up window button
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 500) {
        $('.up-button').fadeIn();
      } else {
        $('.up-button').fadeOut();
      }
    });

    // Toggle mobile-menu
    $('.nav__icon').on('click', function () {
      $('.nav__list').slideToggle();
      $(this).fadeTo(100, .5).fadeTo(100, 1);
    });

    /*
    // Smooth scrolling after clicking on the anchor link
    // (was commented out because the property
    // html, body { scroll-behavior: smooth; }
    // does just fine without JS/jQuery)

    $('a[href*="#"]').on('click', function() {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 1000);
    });
    */

    // Validation submit form
    let regex = {
      name: /^[a-zA-Z\s]{2,30}$/,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

    function validateField(val, fieldName) {
      let pattern = regex[fieldName];
      return pattern.test(val);
    }

    $('#form').on('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let name = $("#name"),
          email = $("#email"),
          data = {
            name: name.val(),
            email: email.val()
          };
      if (!data.name || (data.name && !validateField(data.name, 'name'))) {
        name.prev('.contact__error').show();
      } else if (!data.email || (data.email && !validateField(data.email, 'email'))) {
        email.prev('.contact__error').show();
      } else {
        $.ajax({
          url: './php/backend.php',
          type: 'POST',
          data: data,
          success: function (response) {
            if (response && response.error) {
              console.log(response.error)
            } else {
              alert('Thanks you for contacting');
            }
          },
          error: function (jqXHR, textStatus) {
            console.log('ERRORS AJAX-requests: ' + textStatus);
          },
          complete: function () {
          }
        });
      }
    });
    $('#form input').on('keydown', function () {
      $(this).prev('.contact__error').hide();
    });

    // Contact form fade in
    $(window).on('scroll', function () {
      let scroll = $(window).scrollTop() + $(window).height();
      let offset = $('.footer').offset().top;
      if (scroll > offset) {
        $('#contact').fadeIn(1500);
      }
    });
    
    // Smooth scrolling after clicking on the "CONTACT" link
    $('a[href="#contact"]').on('click', function (e) {
      e.preventDefault();
      if (window.matchMedia('(max-width: 768px)').matches) {
        $('html, body').stop().animate({
          scrollTop: $('#contact').offset().top
        }, 500);
      }
      else if (window.matchMedia('(min-width: 769px)').matches)
        $('html, body').stop().animate({
          scrollTop: $('#map-about').offset().top + $('#map-about').height() / 2
        }, 500);
    });

    // Convert address tags to google map links
    $('#projects address').each(function () {
      let link = '<a class="projects__map-point" href="http://maps.google.com/maps?q=' + encodeURIComponent($(this).text()) + '" target="_blank">' + '<i class="fas fa-map-marker-alt"></i>' + $(this).text() + '</a>';
      $(this).html(link);
    });
    /*
    // Was commented out because address "91 Nolan Extensions Suite 670" was not found
    $('#contact address').each(function () {
      let link = '<a class="contact__item" href="http://maps.google.com/maps?q=' + encodeURIComponent($(this).text()) + '" target="_blank">' + '<i class="fas fa-map-marker-alt"></i>' + $(this).text() + '</a>';
      $(this).html(link);
    });
    */

  });
})(jQuery);

// Map section with custom icon
const monticello = {lat: 40.6784314, lng: -73.9011603};
const image = 'img/map-marker.png';
let contentImage = document.getElementById('info-window').outerHTML;

function initMap() {
  const map = new google.maps.Map(
      document.getElementById('map-about'),
      {
        zoom: 13,
        center: monticello,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
      }
  );
  const mapMarker = new google.maps.Marker({
    position: monticello,
    map,
    icon: image
  });
  const infoWindow = new google.maps.InfoWindow({
    content: contentImage,
  });
  mapMarker.addListener("click", () => {
    infoWindow.open(map, mapMarker);
  });
}
