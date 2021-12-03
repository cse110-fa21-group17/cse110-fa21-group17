window.addEventListener('DOMContentLoaded', init);

function init() {
    // TODO: Replace with some kind of unique identifier for the bookmark in each card
    bookmark = document.querySelectorAll('#someIdFromDatabase');

    console.log(bookmark);
    for (let i = 0; i < bookmark.length; i++) {
      bookmark[i].addEventListener("click", () => {
        if (bookmark[i].classList.contains("bi-bookmark")) {
            bookmark[i].classList.replace("bi-bookmark", "bi-bookmark-fill");
            console.log(bookmark);
            // TODO: Mark this recipe as saved in database
        } else if (bookmark[i].classList.contains("bi-bookmark-fill")) {
            bookmark[i].classList.replace("bi-bookmark-fill", "bi-bookmark");
            console.log(bookmark);
            // TODO: Unsave this recipe in database
        }
      });
    }
}




function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "nav-container") {
    x.className += " responsive";
  } else {
    x.className = "nav-container";
  }
}