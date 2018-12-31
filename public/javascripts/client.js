$(document).ready(function() {

  // Form Handling
  $('form').on('submit', function(e) {
    e.preventDefault();

    // Terms
    var terms = '';
    $(this).find('input[type="checkbox"]:checked').each(function(ind, elem) {
      var text = $(elem).parent().text().trim().replace(/[^a-zA-Z0-9 ]+/g, '');
      terms += text + ",";
    });

    // Other
    var other = $('#otherBox').val();
    if (other) {
      terms += other + ",";
    }

    terms = terms.substr(0, terms.length-1);
    var newUrl = '/results?q=' + terms;

    // Category
    var category = $("#category").val();
    if (category) {
      newUrl += '&c=' + category;
    }

    // Child's name
    var name = $('#firstname').val();
    if (name) {
      newUrl += '&n=' + name;
    }
    window.location = newUrl;
  });


  // Share Link
  $('.share-link input').val(window.location.href).on("click", function () {
    $(this).select();
  });

});