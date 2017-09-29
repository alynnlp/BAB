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
    // var $iconlist = $('<div>').addClass('iconList');
    //   var iconsArray = ['fa-bookmark-o','fa-heart'];
    //   iconsArray.map(function(icon) {
    //     var $indicon = '<i class="fa' + ' ' + icon + '"></i>';
    //   });
    //   $iconList.append(indicon);
    var $imgWrapper = $('<div>').addClass('pin-image-wrapper');
    var $img = $('<img src="../../images/architecture.jpg"/>').addClass('card-img-top');
    var $imgOverlay = $('<div>').addClass('card-img-overlay');
    var $cardTitle = $('<h4>').addClass('card-title').text(`${cardObject.title}`);
    var $cardBody = $('<div>').addClass('card-body');
    var $cardText = $('<p>').addClass('card-text').text(`${cardObject.description}`);
    var $cardFooter = $('<div>').addClass('card-footer');
    var timeConverted = convertDate(Date.now(), `${cardObject.created_at}`);
    var $textMuted = $('<small>').addClass('text-muted').text(`Last updated ${timeConverted}`);
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

  $('i.fa.fa-heart-o').on('click',function(){
    $(this).toggleClass('redBackground');
    // $.ajax({
    //   method:"POST",
    //   url:"users/:userid"
    //   success: function (newcard){
    //     renderCard(newcard)
    //   },
    // });
  });



  // $('.topicID').click(function() {
  //   window.location.replace("/topic/:topic")
  // });






//Homepage with PEOPLES CARDS
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
