$(document).ready(function() {
  //toggling login and Register
  var $login = $('button.loginbut')
  var $register = $('button.registerbut')

  $login.click(function(event){
      console.log('Button clicked, login slide')
      event.preventDefault();
      $('#login-form').toggle();
      $('#register-form').hide();
      $('input#username.col-lg').focus();
    })

  $register.click(function (event){
      console.log('Button clicked, register slide');
      event.preventDefault();
      $('#register-form').toggle();
      $('#login-form').hide();
      $('input#first-name.col-lg').focus();
    })

//timeStamp converter
  function convertDate(dateNow, dateCreated) {
    let timeAmount = dateNow - dateCreated;
   // Less than a minute
    if (timeAmount < 60000) {
      return "Less than a minute ago";
   // One minute or minutes up to an hour
    } else if (timeAmount < 3600000) {
      let minutes = Math.floor(timeAmount / 60000);
      if (minutes === 1) {
        return "One minute ago";
      } else {
        return minutes + " minutes ago";
      }
   // One hour or hours up to a day
    } else if (timeAmount < 86400000) {
      let hours = Math.floor(timeAmount / 3600000);
      if (hours === 1) {
        return "One hour ago";
      } else {
        return hours + " hours ago";
      }
   // One day or days up to a year
    } else if (timeAmount < 31556952000) {
      let days = Math.floor(timeAmount / 86400000);
      if (days === 1) {
        return "One day ago";
      } else {
        return days + " days ago";
      }
   // Over a year
    } else {
      return "Over a year ago";
    }
  }
  //
  // {
  //   id: 1,
  //   title: "in illo voluptatum",
  //   description: "Laboriosam dignissimos voluptatum pariatur enim sed molestias. Nobis distinctio adipisci voluptatibus molestiae. Doloremque unde consequatur expedita nemo. Maiores nemo consequatur qui ex tempora sed rerum.",
  //   topic_id: null,
  //   user_id: null,
  //   created_at: "2017-09-29T18:16:04.550Z",
  //   url: "tiara.org"
  // },

  function createNewCard(cardObject) {
    var $card = $('<div>').addClass('card');
    var $imgWrapper = $('<div>').addClass('pin-image-wrapper');
    var $img = $('<img src="../../images/architecture.jpg"/>').addClass('card-img-top');
    var $imgOverlay = $('<div>').addClass('card-img-overlay');
    var $like = $('<div>').addClass('liked text-right');
    var $icon = $('<i>').addClass('fa fa-heart-o');

    $icon.on('click',function(){
      $(this).toggleClass('.fa-heart-o:hover');
      console.log("d")
      
      $.ajax({
        //userId grabbing from the serverside
        //by passing it to the HTML! becuase
        //app.js $ can manipulate HTML
        url: "/api/users/" + userId + "/likes",
        method: "POST",
        data: {
          resourceId: cardObject.id,
        }
      });
    });

    $like.append($icon);
    var $cardTitle = $('<h4>').addClass('card-title').text(`${cardObject.title}`);
    var $cardBody = $('<div>').addClass('card-body');
    var $cardText = $('<p>').addClass('card-text').text(`${cardObject.description}`);
    var $cardFooter = $('<div>').addClass('card-footer');
    var timeConverted = convertDate(Date.now(), `${cardObject.created_at}`);
      var $textMuted = $('<small>').addClass('text-muted').text(`Last updated ${timeConverted}`);
    $card.append($imgWrapper);
    $imgWrapper.append($img);
    $imgWrapper.append($imgOverlay);
    $imgOverlay.append($like);
    $imgOverlay.append($cardTitle);
    $card.append($cardBody);
    $cardBody.append($cardText);
    $card.append($cardFooter);
    $cardFooter.append($textMuted);
    return $card;
}

function createComment(commentObject){
  var $mediarow = $('<li>').addClass('media.row');
  var $img = $('<img>').addClass('d-flex.align-self-start.mr-3');
  var $mediabody = $('<div>').addClass('media-body');
  var $fullname = $('<h5>').addClass('mt-0').text(`${commentObject.user}`);
  var $commentText = $('<p>').addClass('commentText').text(`${commentObject.content}`);
  var $textRight = $('<p>').addClass('text-right');
  var timeConverted = convertDate(Date.now(), `${commentObject.created_at}`);
    var $commentTime = $('<p>').addClass('commentTime').text(`Created ${timeConverted}`);
  var $hr = $('<hr>')
  $mediarow.append($img);
  $mediarow.append($mediabody);
  $mediabody.append($fullname);
  $mediabody.append($commentText);
  $mediabody.append($textRight);
  $textRight.append($commentTime);
  $textRight.append($hr);
  return $mediarow;
}
//function to prepend the new card on top of UsersPage
// function renderCard(cardArray){
//   cardArray.forEach(function(card){
//     var $newcard = createNewCard(card)
//     $('container card-columns').prepend($newcard)
//   });
// }

// function loadCard(){
//   $('container card-columns').empty();
//   $.ajax({
//     method:"GET",
//     url:"/user",
//     success: function (arrayOfCards){
//       renderCard(arrayOfCards);
//     },
//   });
// }
// loadCard();

  var $comment = $('.resource-comment-form.col');
    $comment.submit(function (event) {
      console.log('Button clicked, performing ajax call...');
      event.preventDefault(); //stop form from submitting normally > will stay in the same page
      var $commentInput = $('textarea.form-control.resource-comment.col-lg').val();
      var newComment = {
        user: 'aileen',
        content: {
          text: $commentInput
        },
        created_at: Date.now(),
      };
      if($commentInput === "" ){
        $('.flash-message').text('Type Something');
        event.stopPropagation;
      } else if($commentInput.length > 140){
        $('.flash-message').text('Comment too long');
        event.stopPropagation;
      } else {
        $('#list-unstyled.row').prepend(createComment(newComment));
      };
      //Send form data using post with element id && using AJAX requests
      $.ajax({
        url: '/resource/:resourceid', //here im posting through AJAX
        method: 'POST', //into the POST request body in the server
        data: {
          user: 'aileen',
          text: $('form textarea.form-control.resource-comment.col-lg').val(),
        },
        success: function (data) {
          console.log('Success: ', data);
          loadComment();//load Comment from DB,
        },
      });
    });

    //ajax is async, renderTweets once the REQUEST is done
    // function loadComment(){
    //   //jQuery to make a request to /tweets and receive the array of tweets as JSON.
    //   $("#commentscontainer").empty();
    //   $.ajax({
    //     url: '/resource/:resourceid', //im getting another page through AJAX
    //     method: 'GET',
    //     success: function (arrayOfComment) {
    //       console.log('Success: ', arrayOfComment);
    //       renderComment(arrayOfComment);
    //     },
    //   });
    // };
    //
    // //forEach of the element in the Array create DOM structure and append
    // function renderComment(commentarray) {
    //   commentarray.forEach(function(comment){
    //     var $comment = createComment(comment);
    //     $('#commentscontainer').prepend($comment);
    //   });
    // };
    //   loadComment();





  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((resources) => {
    var cards = $("<div>");
    for(eachResource of resources) {
      cards.append( createNewCard(eachResource) );
      }
      $(".container.card-columns").append(cards);
    });

//when topicid click, get routes
    $('.topicID').click(function(e) {
      e.preventDefault();
      const topicId = $(this).data("id");
      $.ajax({
        method:"GET",
        url: "/api/topics/" + topicId + "/resources"
      }).done((arrayOfResources)=>{
        console.log(arrayOfResources)
      });
    });
//when clicking the card, direct to comment page

  $('.card').click(function(e){
    e.preventDefault();
    $.ajax({
      method:"GET",
      url:""
    })
  })



})

//when
