;( function ( $ ) {
  $( function() {

    bindActionButtons();
    bindFormSubmitButtons();

  });
}(jQuery));

function bindActionButtons() {
  $('.action__btn').on( 'click', function( e ) {
    var $toggledElem = $( e.currentTarget );

    if ( !$toggledElem.hasClass('active') ) {
      resetAllActionBtn();
    }

    $toggledElem.toggleClass('active');
    showFormTextArea();
  });
};

function resetAllActionBtn() {
  Array.prototype.forEach.call(
    $('.action__btn'),
    function( elem ) {
      $( elem ).removeClass('active');
    });
};

function showFormTextArea() {
  var $actionBtns = $('.action__btn');
  var anyActive = Array.prototype.reduce.call(
    $actionBtns,
    function( prev, curr ) {
      return prev || $( curr ).hasClass('active');
    },
    false
  );

  if ( !anyActive ) {
    $('.action__form').addClass('hidden');
  } else {
    $('.action__form').removeClass('hidden');
  }
};

function bindFormSubmitButtons() {
  $('.bust-cache').on( 'click', function( e ) {
    e.preventDefault();

    var rawInput = $('.form__textinput').val();
    var inputVanityURLs = rawInput.split('/n');

    var pathToHit = $('.action__btn.active').attr('data-path');

    $.ajax({
      method: 'POST',
      url : pathToHit,
      contentType: 'application/json',
      data: JSON.stringify({ vanityURLs: inputVanityURLs }),
      beforeSend: function() {
        // $('.action__form').addClass('disabled');
      },
      success: function( response ) {
        var $resultContainer = $('.action__result');

        $resultContainer.append( createPlaytimeTemplate ( response ) );
        $('.action__result').removeClass('hidden');

      },
      error: function( err ) {
        console.log( err );
      }
    });
  });
}

function createPlaytimeTemplate( game ) {
  var templ = '<div class="col-md-12 text-center">' +
        '<h3>Most Popular Game is...</h3>' +
        '<h2><strong>' + game.name + '</strong></h2>' +
        '<p>With ' + Math.floor( game.playtime_forever / 60 ) + ' hours of playtime!</p>' +
        '<a href="/">Go again?</a>' +
        '</div>';

  return $( templ );
}

function createOwnershipTemplate( game ) {
  var templ = '<div class="col-md-12 text-center">' +
        '<h3>Most Popular Game is...</h3>' +
        '<h2><strong>' + game.name + '</strong></h2>' +
        '<p>With ' + game.players.length + ' of the profile' +
        ( game.players.length > 1 ? 's' : '' ) +
        ' added owning it!</p>' +
        '<a href="/">Go again?</a>' +
        '</div>';

  return $( templ );
}
