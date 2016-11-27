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

    $.ajax({
      method: 'POST',
      url : '/steam/popular/playtime',
      contentType: 'application/json',
      data: JSON.stringify({ vanityURLs: inputVanityURLs }),
      success: function( response ) {
        // Do something with data
        console.log( response );
      },
      error: function( err ) {
        console.log( err );
      }
    });
  });
}
