// var header = document.querySelector('header');
// var section = document.querySelector('section');
console.log("JS here")
// $("button#submit").on("click", function () { $("search-term").text("Hello")})
$(".wiki-content").prepend('<h1 class="display-6 pb-4 text-white">Random Wiki</h1>');
$("#card-deck").append('<div class="col-md-6 col-lg-3"><div class="card border-3 bg-light mb-4"><img src="https://placekitten.com/640/360" class="card-img-top img-fluid" alt="Kitten"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn wiki-btn text-white">Go somewhere</a></div></div></div>');
$("#card-deck").append('<div class="col-md-6 col-lg-3"><div class="card border-3 bg-light mb-4"><img src="https://placekitten.com/640/360" class="card-img-top img-fluid" alt="Kitten"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn wiki-btn text-white">Go somewhere</a></div></div></div>');
$("#card-deck").append('<div class="col-md-6 col-lg-3"><div class="card border-3 bg-light mb-4"><img src="https://placekitten.com/640/360" class="card-img-top img-fluid" alt="Kitten"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn wiki-btn text-white">Go somewhere</a></div></div></div>');
$("#card-deck").append('<div class="col-md-6 col-lg-3"><div class="card border-3 bg-light mb-4"><img src="https://placekitten.com/640/360" class="card-img-top img-fluid" alt="Kitten"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p><a href="#" class="btn wiki-btn text-white">Go somewhere</a></div></div></div>');

$("#search-bar").submit(function(event) {
  var keyword = $('#search-term').val();
  $(".wiki-content h1").remove();
  $(".wiki-content").prepend('<h1 class="display-6 pb-4 text-white">Search results:</h1>');
  console.log(keyword);
  event.preventDefault();
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + keyword + "&limit=20&callback=?",
    dataType: "jsonp",
    success: function(response) {
      $("#card-deck").html("");
      $("#keyword-name").html("");
        console.log(response[1].length);
        if (response[1].length == 0) {
          //showError(keyword);
          alert("Error retrieving search results, please refresh the page");
        }
        else {
          //  $("#container").prepend('<h2 id=keyword-name>' + keyword + '</h2>');
          // .split(/\s+/).slice(0,10).join(" ")  <!-- code to slice by word not character --> wikiPara.slice(0, 50) <!-- slice by char -->
            for (var i = 0; i < response[1].length; i++ ) {
              console.log(response[3][i])
              wikiLink = response[3][i];
              wikiTitle = response[1][i];
              wikiPara = response[2][i];
              $("#card-deck").append('<div class="col-md-6 col-lg-3"><div class="card border-3 bg-light mb-4" id="image' + [i] + '"'+ '><div class="card-body"><h5 class="card-title">' + wikiTitle + '</h5><p class="card-text">' + wikiPara + '...</p><a href=' + wikiLink + ' class="btn wiki-btn text-white" target="_blank">Open in wiki</a></div></div></div>');
            }
            $.ajax({
                    url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=" + keyword + "&gpslimit=20",
                    method: "GET",
                    dataType: "jsonp",
                    success: function(newData) {
                      for (var i = 0; i < 20; i++) {
                        if (newData.query.pages[i].hasOwnProperty("thumbnail") === true) {
                          $('#image' + (newData.query.pages[i].index - 1)).prepend(`<img src=${newData.query.pages[i].thumbnail.source} class="card-img-top img-fluid">`);
                         } //else {
                        //   $('#image' + (newData.query.pages[i].index - 1)).prepend('<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Article_icon_cropped.svg/512px-Article_icon_cropped.svg.png" class="card-img-top img-fluid" >');
                        // }
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