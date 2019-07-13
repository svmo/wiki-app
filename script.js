// var header = document.querySelector('header');
// var section = document.querySelector('section');
console.log("JS here")
// $("button#submit").on("click", function () { $("search-term").text("Hello")})

$("#search-bar").submit(function(event) {
  var keyword = $('#search-term').val();
  console.log(keyword);
  event.preventDefault();
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + keyword + "&limit=20&callback=?",
    dataType: "jsonp",
    success: function(response) {
      $("#output").html("");
      $("#keyword-name").html("");
        console.log(response[1].length);
        if (response[1].length == 0) {
          //showError(keyword);
          alert("Error retrieving search results, please refresh the page");
        }
        else {
          //  $("#container").prepend('<h2 id=keyword-name>' + keyword + '</h2>');
            for (var i = 0; i < response[1].length; i++ ) {
              console.log(response[3][i])
              $("#output").append('<a href=' + response[3][i] + ' target="_blank"><div class=search-row><div class=search-img id=image' + [i] + '></div><div class=content><span class=card-title truncate>'+ response[1][i] + '</span><p>' + response[2][i] + '</p></div></div></a>');
            }
            $.ajax({
                    url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=" + keyword + "&gpslimit=20",
                    method: "GET",
                    dataType: "jsonp",
                    success: function(newData) {
                      for (var i = 0; i < 20; i++) {
                        if (newData.query.pages[i].hasOwnProperty("thumbnail") === true) {
                          $("#image" + (newData.query.pages[i].index - 1)).html(`<img src='${newData.query.pages[i].thumbnail.source}' class='responsive-img valign'>`);
                        } else {
                          $("#image" + (newData.query.pages[i].index - 1)).html("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Article_icon_cropped.svg/512px-Article_icon_cropped.svg.png' class='responsive-img valign articleIcon'>");
                        }
                      }
                    },
                    error: function() {
                      console.log("second call unsuccessful");
                    }
                  })
                }
  },
    error: function () {
    alert("Error retrieving search results, please refresh the page");
    }
  });
});

$("#clear").click(function() {
  $("#search-term").val("").focus();
  $("#output").html("");
  $("#keyword-name").html("");
});