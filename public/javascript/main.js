(function(){
  var playedSound = false;

  function playUgh(){
    if(!playedSound){
      document.getElementById('ugh').play();
      playedSound = true;
      setTimeout(function(){
        playedSound = false;
      }, 1500);
    }
  }

  function playTrombone(){
    if(!playedSound){
      document.getElementById('trombone').play();
      playedSound = true;
      setTimeout(function(){
        playedSound = false;
      }, 1500);
    }
  }

  function playFaffel(){
    if(!playedSound){
      document.getElementById('faffel').play();
      playedSound = true;
      setTimeout(function(){
        playedSound = false;
      }, 1500);
    }
  }

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

  // events
  $('.clownscore').hover(function(){
    playFaffel();
  });
  $('.groans').on({
    mouseenter: function(){
      if(!$(this).hasClass('spin')){
        playUgh();
      }
      $(this).addClass('spin');
    },
    mouseleave: function(){
      // $(this).removeClass('spin');
    }
  });

  $('.trombones').on({
    mouseenter: function(){
      if(!$(this).hasClass('stretch')){
        playTrombone();
      }
      $(this).addClass('stretch');
    },
    mouseleave: function(){

    }
  })

}());