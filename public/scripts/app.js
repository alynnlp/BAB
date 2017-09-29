$(document).ready(function() {
  //toggling login and Register
  var $login = $('button.loginbut')
  var $register = $('button.registerbut')

  // $login.click(function(event){
  //   console.log('Button clicked, login slide')
  //   event.preventDefault();
  //   $('#login-form').slideUp();
  //   $('input').focus();
  // })
  //
  // $register.click(function (event){
  //   console.log('Button clicked, register slide');
  //   event.preventDefault();
  //   $('#register-form').slideUp();
  //   $('nameinput').focus();
  // });

  $login.click(function(event){
      console.log('Button clicked, login slide')
      event.preventDefault();
      $('#login-form').slideDown();
      $('#register-form').slideUp();
      $('input#username.col-lg').focus();
    })

  $register.click(function (event){
      console.log('Button clicked, register slide');
      event.preventDefault();
      $('#register-form').slideDown();
      $('#login-form').slideUp();
      $('nameinput').focus();
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

//1. JS function for Saving New Card on Users Page
  function createNewCard(cardObject) {
  //$('') > going to search for the tag name in html; $("< >") > going to add an element TAG
    var $card = $('<div>').addClass('card');
    var $icon = $('<div>').addClass('icon');
    var $imgWrapper = $('<div>').addClass('pin-image-wrapper');
    //tweetobject.user.avatars.small - place holder
    var $img = $('<img src="../../images/architecture.jpg"/>').addClass('card-img-top');
    var $imgOverlay = $('<div>').addClass('card-img-overlay');
    //cardtitle place holder
    var $cardTitle = $('<h4>').addClass('card-title').text(`card-title`);
    var $cardBody = $('<div>').addClass('card-body');
    var $cardText = $('<p>').addClass('card-text').text(`At est quidam suavitate, error delicatissimi cum no. Nam falli dictas maluisset ea, te laudem iracundia usu. Pro elit albucius ei, ex inani repudiandae usu. Modus audiam scribentur in eos, in sit purto gloriatur, saperet meliore ius te. Democritum voluptaria ne vim, eos mundi apeirian conclusionemque ex, ea qui duis option temporibus.`);
    var $cardFooter = $('<div>').addClass('card-footer');

    var timeConverted = convertDate(Date.now(),timePosted);
    var $textMuted = $('<small>').addClass('text-muted').text(`Last updated ${timeConverted} mins ago`);

    var $pIcon = $('<p>').addClass('icon');
        var iconsArray = ['fa-bookmark-o','fa-heart','fa-star'];
        iconsArray.map(function(icon) {
          var iconList = '<i class="fa' + ' ' + icon + '"></i>';
          $pIcon.append(iconList);
        });
    //jQuery to put the Tag together
    $card.append($icon);
    $card.append($imgWrapper);
    $imgWrapper.append($img);
    $imgWrapper.append($imgOverlay);
    $imgOverlay.append($cardTitle);
    $card.append($cardBody);
    $cardBody.append($cardText);
    $card.append($cardFooter);
    $cardFooter.append($textMuted);
    return $card;
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



//heart on click change to RED and stay to page

//save on click, redirect to add-resource

//individual card on click, redirect to resources



//get users
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;



//
})
