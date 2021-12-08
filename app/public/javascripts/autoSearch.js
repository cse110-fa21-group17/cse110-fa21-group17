let timer = null;

$('input#search_bar').keyup(function() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    doSearch();
  }, 200);
});

/**
 * search on input
 */
function doSearch() {
  if ($('input#search_bar').val()==='') {
    $('#top-recipe').show();
    $('#result').hide();
    return;
  }
  $('#top-recipe').hide();
  $('#result').show();
  $('#result').html(
      `<h1 class="header-title top-recipes">Search Result:</h1>
        <div class="spinner-border" role="status" id="spinner">
            <span class="sr-only"></span>
        </div>`,
  );
  $.ajax({
    type: 'GET',
    url: '/search/'+$('input#search_bar').val(),
    success: function(res) {
      $('#result').html('');
      if (!res || res.length === 0 || res==='failed') {
        $('#result').html(
            `<h1 class="header-title top-recipes">No result found</h1>`,
        );
      }
      let result_html = `<h1 class="header-title top-recipes">Search Result:</h1>`;
      res.map((recipe) => {
        result_html += `<div class="recipeCard" onclick="window.location.href='/recipe_page/${recipe.id}/false'">
                                  <div class="bookmark-icon">
                                    <!--TODO: Replace with some kind of unique identifier for the bookmark in each card-->
                                    <a><i class="bi ${recipe.is_saved?'bi-bookmark-fill':'bi-bookmark'}" id="bookmark${recipe.id}" style="font-size: 2em;"
                                      onclick="bookMarkRecipe(${recipe.id}, false, ${recipe.is_saved})"></i></a>
                                  </div>
                                  <div class="cardText">
                                    <p class="recipeTitle">${recipe.title}</p>
                                    <p class="card-tags">Health Score: ${recipe.healthScore}</p>
                                    <p class="card-details">${recipe.readyInMinutes} Mins | ${recipe.extendedIngredients.length} Ingredients
                                    </p>
                                  </div>
                                  <img src="${recipe.image}" class="cardImage">
                                </div>`;
      });
      $('#result').html(
          result_html,
      );
    },
    error: function(error) {
      console.log(error);
    },
  });
}
