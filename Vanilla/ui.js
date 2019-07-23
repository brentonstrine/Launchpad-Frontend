//
// Submit a comment to the API
//
var submitComment = function(){
  var endpoint = "/launchpad/api/postComment";
  var payload = {
    "username": document.querySelector(".comment-form .username").value,
    "message": document.querySelector(".comment-form .commentBox").value
  };
  var responseElem = document.querySelector(".comment-form .responseBox");
  hitEndpoint(endpoint, payload, function(response){
    responseElem.innerText = response;
    getComments();
  });
}

document.querySelector(".submit-comment").addEventListener("click", submitComment);

//
// Get all comments from the API
//
var getComments = function(){
  var endpoint = "/launchpad/api/getComments";
  var responseElem = document.querySelector(".comments");
  var buildPostedString = function(comment, time, timestamp){
      var ago = new Date() - timestamp;
      if ((ago/=1000) < 60) {
          ago = Math.round(ago) + " seconds ago";
      } else if ((ago/=60) < 60) {
          ago = ago + " minutes ago";
      } else if ((ago/=60) < 24) {
          ago = Math.round(ago) + " hours ago";
      } else if ((ago/=24) < 30) {
          ago = Math.round(ago) + " days ago";
      } else {
          ago = time.toDateString();
      }
      return "Posted " + ago;
  };

  hitEndpoint(endpoint, "", function(response){
    if(response.type === "success") {
      response.comments.forEach(function(comment){
        var time = new Date(comment.timestamp)
        var timestamp = time.valueOf();
        var postedTime = buildPostedString(comment, time, timestamp);
        var dom = `<div class="comment" id="${timestamp}">
                      <div class="meta">
                        <div class="username">${comment.username}</div>
                        <div class="date">${postedTime}</div>
                      </div>
                      <div class="message">
                        ${comment.message}
                      </div>
                    </div>`;
      });
      responseElem.innerHTML = dom;
    } else {
      responseElem.innerHTML = response;
    }
  });
};

// When the DOM is done loading, get comments from the API
window.addEventListener("DOMContentLoaded", function(){
  //getComments();
});
