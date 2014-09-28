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

  // events
  $('.open-tweets').on('click', function(e){
    e.preventDefault();
    var tweets = $(this).parents('.tweet').attr('data-tweets').split(',');
    var that = this;
    tweets.pop();
    $(tweets).each(function(t, tweet){
      $.post('/tweets', { id: tweet }, function(data){
        var render = JSON.parse(data);
        $(that).parents('.tweet').find('.tweet-text').append(render.html);
      });
    });
    $(that).parents('.tweet').find('.close-tweet-text').show();
  });

  $('.close-it').on('click', function(e){
    e.preventDefault();
    $(this).parents('.close-tweet-text').hide();
    $(this).parents('.tweet').find('.tweet-text').empty();
  });

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
