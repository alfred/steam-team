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
  $('.bust-cache').on( 'click', sendAjaxAndUpdateDOM );

  $('.use-cache').on( 'click', sendAjaxAndUpdateDOM );
}

function sendAjaxAndUpdateDOM( e ) {
  e.preventDefault();
  $('.action__result').addClass('hidden');

  var rawInput = $('.form__textinput').val();
  var inputVanityURLs = rawInput.split('/n');
  var pathToHit = $('.action__btn.active').attr('data-path');

  var urlPrefix = e.currentTarget.className.indexOf('bust-') !== -1 ? '/steam' : '/api';


  $.ajax({
    method: 'POST',
    url : urlPrefix + pathToHit,
    contentType: 'application/json',
    data: JSON.stringify({ vanityURLs: inputVanityURLs }),
    beforeSend: function() {

    },
    success: function( response ) {
      var $resultContainer = $('.action__result');

      if( pathToHit.indexOf('playtime') !== -1 ) {
        $resultContainer.append( createPlaytimeTemplate( response ) );
      } else if ( pathToHit.indexOf('ownership') !== -1 ) {
        $resultContainer.append( createOwnershipTemplate( response ) );
      } else if ( pathToHit.indexOf('delete') !== -1 ) {
        $resultContainer.append( createDeletedTemplate() );
      } else {
        // Wow error checking might be rough ya know
      }

      $('.action__result').removeClass('hidden');
    },
    error: function( err ) {
      console.log( err );
    }
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

function createDeletedTemplate() {
  var templ = '<div class="row big-margin-top">' +
        '<div class="alert alert-success" role="alert">' +
        '<strong>Success!</strong>' +
        ' All users successfully deleted' +
        '<a class="pull-right" href="/">Reset</a>' +
        '</div>' +
        '</div>';

  return $( templ );
}
