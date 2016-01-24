$(window).load(function() {
  gapi.client.setApiKey('AIzaSyCBtwEiRDkKfMr2CdYnrHARVWqH3sfNZHc');
  gapi.client.load("youtube", "v3", function() {
    $('#search-button').attr('disabled', false);
  });
  $('#search-button').on("submit", function(event) {
    event.preventDefault();
    search();
  });

  $('.form-control').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      $('.form-control').blur();
      search();
    }
  });
});

// Search for a specified string.
function search() {
  $('#search-container').empty();
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 10
  });

  request.execute(function(response) {
    var results = response.result;
    for (var i = 0; i < results.items.length; i++) {
      var video_title = results.items[i]["snippet"]["title"];
      var video_id = results.items[i]["id"]["videoId"];
      $('#search-container').append("<h5>" + results.items[i]["snippet"][
          "title"
        ] +
        "</h5>");
      $('#search-container').append("<iframe" + " " +
        "src='http://www.youtube.com/embed/" + video_id + "'" + " " +
        "width='600'" + " " + "height='400'" + " " + "allowfullscreen " +
        "frameborder='0'/>" +
        "<br>")
    }
  });
}
