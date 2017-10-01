$(document).ready(function() {
  //toggling login and Register
  var $login = $('button.loginbut')
  var $register = $('button.registerbut')
  $login.click(function(event){
      console.log('Button clicked, login slide')
      event.preventDefault();
      $(".mobile-menu").hide();
      $('#login-form').toggle();
      $('#register-form').hide();
      $('input#username.col-lg').focus();
    })
  $register.click(function (event){
      console.log('Button clicked, register slide');
      event.preventDefault();
      $(".mobile-menu").hide();
      $('#register-form').toggle();
      $('#login-form').hide();
      $('input#first-name.col-lg').focus();
    })

  // Responsive for when screen width < 520px

  $(".mobile-button").hide();
  $(".mobile-menu-row").hide();

  function responsiveHeader() {
    if ($(window).width() <= 520){
      $(".mobile-button").show();
      $(".mobile-menu-row").show();
      $(".mobile-menu").hide();
      $("#login-register").find("ul").appendTo(".mobile-menu");
      $("#discover-container").find("form").appendTo(".mobile-menu");
    }
  }

  responsiveHeader();

  $(window).resize(function(){
    responsiveHeader();
    if ($(window).width() > 520){
      $(".mobile-button").hide();
      $(".mobile-menu-row").hide();
      $(".mobile-menu").find("ul").appendTo("#login-register");
      $(".mobile-menu").find("form").appendTo("#discover-container");
    }
  });

  $(".mobile-button").click((event) => {
    event.preventDefault();
    $('#register-form').hide();
    $('#login-form').hide();
    $(".user-account-logout").hide();
    $(".mobile-menu").slideToggle();
  })


// User Dropdown List Event Handler

  $(".user-account-logout").hide();

  $(".user-dropdown").click((event) => {
    event.preventDefault();
    $(".mobile-menu").hide();
    $(".user-account-logout").slideToggle();
  })


//timeStamp converter


  function convertDate(dateNow, dateCreated) {
    let dateUpdated = new Date(dateCreated);
    console.log(dateUpdated)
    dateUpdated = dateUpdated.valueOf();
    let timeAmount = dateNow - dateUpdated;
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
        url: "/api/users/" + userId + "/likes",
        method: "POST",
        data: {
          resourceId: cardObject.id,
        }
      });
    });
    var $cardTitle = $('<h4>').addClass('card-title').text(`${cardObject.title}`);
    var $cardBody = $('<div>').addClass('card-body');
    var $cardText = $('<p>').addClass('card-text').text(`${cardObject.description}`);
    var $cardFooter = $('<div>').addClass('card-footer');
    var timeConverted = `${convertDate(Date.now(), cardObject.created_at)}`;
      var $textMuted = $('<small>').addClass('text-muted').text(`Last updated ${timeConverted}`);
    $card.append($imgWrapper);
    $like.append($icon);
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
function createSavedResource(likedObject){
  var $likedCard = $('<div>').addClass('card');
  var $deletebutton = $('<button>').addClass('deleteLike');
  var $pinwrap = $('<div>').addClass('pin-image-wrapper');
  var $img = $('<img src="../../images/architecture.jpg" alt="architecture">').addClass('card-img-top');
  var $likedoverlay = $('<div>').addClass('card-img-overlayy');
  var $likedtitle = $('<h4>').addClass('card-title').text(`${likedObject.title}`);
  var $likedbody = $('<div>').addClass('card-body')
  var $likedText = $('<p>').addClass('card-text').text(`${likedObject.description}`);
  var $likedfooter = $('<div>').addClass('card-footer');
  var timeConverted = convertDate(Date.now(), `${likedObject.created_at}`);
    var $likedTime = $('<small>').addClass('text-muted').text(`Last updated ${timeConverted}`);
  $likedCard.append($deletebutton);
  $likedCard.append($pinwrap);
  $pinwrap.append($img);
  $pinwrap.append($likedoverlay);
  $likedoverlay.append($likedtitle);
  $likedCard.append($likedbody);
  $likedCard.append($likedfooter);
  $likedbody.append($likedText);
  $likedfooter.append(likedTime);
  return $likedCard;
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

  $('i.fa.fa-heart-o').on('click',function(){
    $(this).toggleClass('redBackground');
    // //     //likedresources POST
    $.ajax({
      //userId grabbing from the serverside
      //by passing it to the HTML! becuase
      //app.js $ can manipulate HTML
      url: "/api/users/" + userId + "/likes",
      method: "POST",
      data: {
        resourceId: 123
      }
    });
  });

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
          text: $('form textarea.form-control.resource-comment.col-lg').val()
        },
        success: function (data) {
          console.log('Success: ', data);
          loadComment();//load Comment from DB,
        },
      });
    });



// var $comment = $('.resource-comment-form.col');
//   $comment.submit(function (event) {
//     console.log('Button clicked, performing ajax call...');
//     event.preventDefault(); //stop form from submitting normally > will stay in the same page
//     var $commentInput = $('textarea.form-control.resource-comment.col-lg').val();
//     var newComment = {
//       user: 'aileen',
//       content: {
//         text: $commentInput
//       },
//       created_at: Date.now(),
//     };
//     if($commentInput === "" ){
//       $('.flash-message').text('Type Something');
//       event.stopPropagation;
//     } else if($commentInput.length > 140){
//       $('.flash-message').text('Comment too long');
//       event.stopPropagation;
//     } else {
//       $('#list-unstyled.row').prepend(createComment(newComment));
//     };
//     //Send form data using post with element id && using AJAX requests
//     $.ajax({
//       url: '/resource/:resourceid', //here im posting through AJAX
//       method: 'POST', //into the POST request body in the server
//       data: {
//         user: 'aileen',
//         text: $('form textarea.form-control.resource-comment.col-lg').val(),
//       },
//       success: function (data) {
//         console.log('Success: ', data);
//         loadComment();//load Comment from DB,
//       },
//     });
//   });
//   // function loadComment(){
//   //   //jQuery to make a request to /tweets and receive the array of tweets as JSON.
//   //   $("#commentscontainer").empty();
//   //   $.ajax({
//   //     url: '/resource/:resourceid', //im getting another page through AJAX
//   //     method: 'GET',
//   //     success: function (arrayOfComment) {
//   //       console.log('Success: ', arrayOfComment);
//   //       renderComment(arrayOfComment);
//   //     },
//   //   });
//   // };
//   //
//   // //forEach of the element in the Array create DOM structure and append
//   // function renderComment(commentarray) {
//   //   commentarray.forEach(function(comment){
//   //     var $comment = createComment(comment);
//   //     $('#commentscontainer').prepend($comment);
//   //   });
//   // };
//   //   loadComment();

//$('.deleteLike').on('click',function(){
//   console.log("d")
//   var userid =
//   var resourceid =
//   $.ajax({
//     url: "/user/" + userid + "/" + resourceid + "/delete",
//     method: "POST",
//     data: {
//       resourceId: likedObject.id,
//     }
//   });
// });

//when I get to User page, load LIKED resources
// $.ajax(
//   var userId = req.params.userid {
//   method: "GET",
//   url: "/users/" + userId + "/likes"
// }).done((likedResources) => {
//   var cards = $("<div>");
//   for(eachResource of likedResources) {
//     cards.append( createSavedResource(eachResource) );
//   }
//   $(".col-8.card-columns.myLikes").append(likedCard);
// });

//when I get the homepage, load new CARD from DATABASE's resources
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

//when topicId click, go to topicID Resource!!
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

//when clicking the card on HOME, direct to comment page
$('.card').click(function(e){
  e.preventDefault();
  const resourceId = $(this).data("id");
  $.ajax({
    method:"GET",
    url:"/resources/" + resourceId
  }).done((arrayofResources)=>{
    console.log(arrayofResources)
  });
});

})

