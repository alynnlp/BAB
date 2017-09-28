function createNewResources(cardObject) {
  //$('') > going to search for the tag name in html; $("< >") > going to add an element TAG
    var $card = $('<div>').addClass('card');
    var $imgWrapper = $('<div>').addClass('pin-image-wrapper');
    //tweetobject.user.avatars.small - place holder
    var $img = $('<img src="../../images/architecture.jpg"/>').addClass('card-img-top');
    var $imgOverlay = $('<div>').addClass('card-img-overlay');
    //cardtitle place holder
    var $cardTitle = $('<h4>').addClass('card-title').text(card-title);
    var $cardBody = $('<div>').addClass('card-body');
    var $cardText = $('<p>').addClass('card-text').text(At est quidam suavitate, error delicatissimi cum no. Nam falli dictas maluisset ea, te laudem iracundia usu. Pro elit albucius ei, ex inani repudiandae usu. Modus audiam scribentur in eos, in sit purto gloriatur, saperet meliore ius te. Democritum voluptaria ne vim, eos mundi apeirian conclusionemque ex, ea qui duis option temporibus.);
    var $cardFooter = $('<div>').addClass('card-footer');
    var $textMuted = $('<small>').addClass('text-muted').text(Last updated 3 mins ago);
    var $timePosted = cardObject[]

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
      return “Over a year ago”;
    }
  }
convertDate(Date.now(),timePosted);

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
