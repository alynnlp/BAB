
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
      $("#add-resource").appendTo(".mobile-menu");
      $("#login-register").find("ul").appendTo(".mobile-menu");
      $("#discover-container").find("#discover-submit").appendTo(".mobile-menu");
    }
  }

  responsiveHeader();

  $(window).resize(function(){
    responsiveHeader();
    if ($(window).width() > 520){
      $(".mobile-button").hide();
      $(".mobile-menu-row").hide();
      $("#add-resource").appendTo("#add-resource-button");
      $(".mobile-menu").find("ul").appendTo("#login-register");
      $(".mobile-menu").find("#discover-submit").appendTo("#discover-container");
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
    var $img = $(`<img src="${cardObject.img_url}"/>`).addClass('card-img-top');
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
    var $cardTitle = $(`<h4><a data-id="${cardObject.id}" class="resourceLink" href="/resources/${cardObject.id}">${cardObject.title}</a></h4>`).addClass('card-title');
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

function createIndividualResource(resourceID, results) {
  $("#main-container").append(
    `<div class="resource-main-container">
      <div class="container resource-content">
        <div class="row resource-header">
          <h1>${results.title}</h1>
        </div>
        <hr>
        <div class="column text-center">
          <img src="${results.img_url}">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <div id="rating">
                  <span data-rating='1'>☆</span>
                  <span data-rating='1'>☆</span>
                  <span data-rating='1'>☆</span>
                  <span data-rating='1'>☆</span>
                  <span data-rating='1'>☆</span>
                </div>
              </div>
              <div class="col-sm-6 text-right">
                <a href="#>"><i class="fa fa-heart fa-heart-hover " aria-hidden="true">&nbsp Like</i></a>
              </div>
            </div>
          </div>
          <hr>
          <div class="pin-description">
            <p><a href="https://${results.url}">${results.url}</a></p>
          </div>
          <hr>
          <div class="pin-description">
            <p>${results.description}</p>
          </div>
          <div class="pin-comments text-left">
            <h1>Comments</h1>
            <hr>

            <form class="resource-comment-form col" method="POST" action="/resource/:resourceid/comments">
              <textarea class="form-control resource-comment col-lg" rows="3" name="resource-comment" placeholder="Comment on this resource."></textarea>
              <input class="col" type="submit" value="Submit">
              <span class="flash-message"></p>
            </form>

            <div class="container comments-list">
              <ul id="commentscontainer" class="list-unstyled row">
                <li class="media row">
                  <img class="d-flex align-self-start mr-3" src="../../images/male-user.jpg" alt="Generic placeholder image">
                    <div class="media-body">
                      <h5 class="mt-0">Tanner Johnson</h5>
                      <p class="commentText">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                      <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                      <div class="text-right">
                        <p class="commentTime">Created 10 minutes ago.</p>
                        <hr>
                      </div>
                    </div>
                </li>
                <li class="media row">
                  <img class="d-flex align-self-start mr-3" src="../../images/female-user.jpg" alt="Generic placeholder image">
                    <div class="media-body">
                      <h5 class="mt-0">Julia Molson</h5>
                      <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                      <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                      <div class="text-right">
                        <p>Created 20 minutes ago.</p>
                        <hr>
                      </div>
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`

    );
}

function createDiscoverPage() {
 $("#main-container").append(
  `<div id="topic">
      <div class="container">
        <div class="card-columns">

          <a href="/topics/1" data-id="1" class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/art.jpeg" alt="Art">
              <div class="card-img-overlay">
                <h4 class="card-title">Art</h4>
              </div>
            </div>
          </div></a>

          <a href="/topics/2" data-id="2" class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/literature.jpg" alt="Literature">
              <div class="card-img-overlay">
                <h4 class="card-title">Literature</h4>
              </div>
            </div>
          </div></a>

          <a href="/topics/3" data-id="3" class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/history.jpg" alt="History">
              <div class="card-img-overlay">
                <h4 class="card-title">History</h4>
              </div>
            </div>
          </div></a>

          <a href"/topics/4" data-id="4"class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/geography.jpg" alt="Geography">
              <div class="card-img-overlay">
                <h4 class="card-title">Geography</h4>
              </div>
            </div>
          </div></a>

          <a href"/topics/5" data-id="5" class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/politics.jpg" alt="Politics">
              <div class="card-img-overlay">
                <h4 class="card-title">Politics</h4>
              </div>
            </div>
          </div></a>

          <a href"/topics/6" data-id="6" class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/math.jpg" alt="Math">
              <div class="card-img-overlay">
                <h4 class="card-title">Math</h4>
              </div>
            </div>
          </div></a>

          <a href"/topics/7" data-id="7"class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/health.jpg" alt="Health">
              <div class="card-img-overlay">
                <h4 class="card-title">Health</h4>
              </div>
            </div>
          </div></a>

          <a href"/topics/8" data-id="8" class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/music.jpeg" alt="Music">
              <div class="card-img-overlay">
                <h4 class="card-title">Music</h4>
              </div>
            </div>
          </div></a>

          <a href"/topics/9" data-id="9" class="topicID"><div class="card">
            <div class="pin-image-wrapper">
              <img class="card-img-top pin-container" src="../../images/science.jpg" alt="Science">
              <div class="card-img-overlay">
                <h4 class="card-title">Science</h4>
              </div>
            </div>
          </div></a>

        </div>
      </div>
    </div>`
  )
}


function createSavedResource(likedObject){
  var $likedCard = $('<div>').addClass('card');
  var $deletebutton = $('<button>').addClass('deleteLike');
  $('.deleteLike').on('click',function(){
    console.log("delete")
    var resourceid = likedObject.id
    $.ajax({
      method: "POST",
      url: "/api/resources/" + resourceid + "/delete"
    });
  });
  var $pinwrap = $('<div>').addClass('pin-image-wrapper');
  var $img = $(`<img src="${likedObject.img_url}"/>`).addClass('card-img-top');
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
  //         text: $('form textarea.form-control.resource-comment.col-lg').val()
  //       },
  //       success: function (data) {
  //         console.log('Success: ', data);
  //         loadComment();//load Comment from DB,
  //       },
  //     });
  //   });

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
// var $comment = $('.resource-comment-form');
//   $comment.submit(function (event) {
//     console.log('Button clicked, performing ajax call...');
//     event.preventDefault(); //stop form from submitting normally > will stay in the same page
//     var $commentInput = $('textarea.form-control.resource-comment.col-lg').val();


//     var newComment = {
//       user: 'aileen',
//       content: {
//         text: $commentInput
//       },
//       created_at: 'rightnow',
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
//       url: `/resource/${resourceId}/comments`, //here im posting through AJAX
//       method: 'POST', //into the POST request body in the server
//       data: {
//         user: 'aileen',
//         text: $commentInput,
//       },
//       success: function (data) {
//         console.log('Success: ', data);

//         loadComment();//load Comment from DB,
//       },
//     });
//   });
//   function loadComment(){
//     //jQuery to make a request to /tweets and receive the array of tweets as JSON.
//     $("#commentscontainer").empty();

//     $.ajax({
//     //  url: `/api/resources/${resourceId}`, //im getting another page through AJAX
//       url:'/comments',
//       method: 'GET',
//       success: function (arrayOfComment) {
//         console.log('Success: ', arrayOfComment);
//         renderComment(arrayOfComment);
//       },
//     });
//   };

//   //forEach of the element in the Array create DOM structure and append
//   function renderComment(commentarray) {
//     commentarray.forEach(function(comment){
//       var $comment = createComment(comment);
//       $('#commentscontainer').prepend($comment);
//     });
//   };
//     loadComment();

//star rating
// var $star = $('.starRate')
// console.log($star)
// $star.on('click',function(){
//   $(this).toggleClass('.starBlue');
//   console.log('.starBlue')
//   $.ajax({
//     method: "POST",
//     url: "/api/rating"
//     data: {
//       resourceId =
//     }
//   }).done((stars) => {
//     console.log(stars)
//   });
// })

//when I get to User page, load LIKED resources
// $.ajax({
//   //from server to app.js,
//   method: "GET",
//   url: "/api/likedResources"
//   url: "/api/users/" + userId + "/likes"
// }).done((likedResources) => {
//   var likedcards = $("<div>");
//   for(eachResource of likedResources) {
//     likedcards.append( createSavedResource(eachResource) );
//   }
//   $(".col-8.card-columns.myLikes").append(likedCard);
//   $(".myLikes").append(likedCard);
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
  console.log("clickedddddddddd")
  e.preventDefault();
  console.log('topicID')
  const topicId = $(this).data("id");
  $.ajax({
    method:"GET",
    url: "/api/topics/" + topicId
  }).done((arrayOfResources)=>{
    // console.log(arrayOfResources)
    $(".container.card-columns").append(arrayOfResources)
  });


});

//when clicking the card on HOME, direct to comment page
$('#main-container').on("click", ".resourceLink", function(e){
  e.preventDefault();
  const resourceId = $(this).data("id");
  $.ajax({
    method:"GET",
    url:`/api/resources/${resourceId}`
  }).done(results =>{
    $("#main-container").empty();
    createIndividualResource(resourceId, results[0]);
  });
});


$("#nav-bar").on("click", "#discover-submit", (event) => {
    console.log("clicked");
  event.preventDefault();
  $("#main-container").empty();
  createDiscoverPage();
});

$("#main-container").on("click", ".topicID", (event) => {
  event.preventDefault();
  let topic = event.target.closest(".topicID");
  let topicNumber = $(topic).data("id");
  $.ajax({
    method: "GET",
    url: `/api/topics/${topicNumber}`
  }).done((resources) => {
    $("#main-container").empty();
    var cards = $("<div>");
    for(eachResource of resources) {
      console.log(eachResource);
      cards.append( createNewCard(eachResource) );
      }
    $("#main-container").append('<div class="container card-columns" id="pin-container"></div>')
    $("#pin-container").append(cards);
    })
});



})
