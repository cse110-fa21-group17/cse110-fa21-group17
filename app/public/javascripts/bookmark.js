// TODO: Replace with some kind of unique identifier for the bookmark in each card
bookmark = document.getElementById('someIdFromDatabase');

bookmark.addEventListener("click", () => {
  if (bookmark.classList.contains("bi-bookmark")) {
    bookmark.classList.replace("bi-bookmark", "bi-bookmark-fill");
    console.log(bookmark);
    // TODO: Mark this recipe as saved in database
  } else if (bookmark.classList.contains("bi-bookmark-fill")) {
    bookmark.classList.replace("bi-bookmark-fill", "bi-bookmark");
    console.log(bookmark);
    // TODO: Unsave this recipe in database
  }
});