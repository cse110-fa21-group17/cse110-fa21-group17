/* function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "nav-container") {
    x.className += " responsive";
  } else {
    x.className = "nav-container";
  }
} */

function bookMarkRecipe(rid, is_database, is_saved){
    event.stopPropagation();
    console.log(is_saved);
    const bookmark = document.getElementById('bookmark' + rid);
    if(bookmark.classList.contains("bi-bookmark")) {
        $.ajax({
            type: "POST",
            url: '/dashboard/saved_recipe',
            data: {rid, is_database},
            success: function (res) {
                if (res === 'success') {
                    bookmark.classList.replace("bi-bookmark", "bi-bookmark-fill");
                } else {
                    window.location.href = '/login';
                }
            },
            error: function (error) {
                window.location.href = '/login';
            },
        });
    } else {
        bookmark.classList.replace("bi-bookmark-fill", "bi-bookmark");
        $.ajax({
            type: "GET",
            url: is_database?('/dashboard/delete_recipe/'+rid):('/dashboard/delete_spoon_recipe/'+rid),
            success: function (res) {
                bookmark.classList.replace("bi-bookmark-fill", "bi-bookmark");
            },
            error: function (error) {
                bookmark.classList.replace("bi-bookmark", "bi-bookmark-fill");
                console.log(error);
            },
        });
    }
}
