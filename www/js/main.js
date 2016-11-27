;( function ( $ ) {
  $( function() {

    bindActionButtons();


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
}

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
}
