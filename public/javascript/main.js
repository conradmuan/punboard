(function(){
  $('.clownscore').hover(function(){
    document.getElementById('faffel').play();
  });

  var tweetHTML;

  $('.open-modal').on('click', function(e){
    e.preventDefault();
    tweetHTML = $(this).parents('.tweet').find('.tweet-text').clone();
    $('#tweet-modal').modal('show');
  });

  $('#tweet-modal').on('show.bs.modal', function(e){
    $(this).find('.modal-body').append(tweetHTML);
  });

  $('#tweet-modal').on('hide.bs.modal', function(e){
    $(this).find('.modal-body').empty();
  });

}());