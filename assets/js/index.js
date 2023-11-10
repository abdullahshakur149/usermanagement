// Construct the base URL dynamically based on the deployment environment
const apiUrl = process.env.VERCEL_ENV === 'production'
  ? `https://${process.env.VERCEL_URL}/api/users`
  : 'http://localhost:3000/api/users';

$("#add_user").submit(function(event) {
  alert("Data Inserted Successfully!");
});

$("#update_user").submit(function(event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function(n, i) {
    data[n['name']] = n['value'];
  });

  var request = {
    "url": `${apiUrl}/${data.id}`,
    "method": "PUT",
    "data": data
  };

  $.ajax(request).done(function(response) {
    alert("Data Updated Successfully!");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function() {
    var id = $(this).attr("data-id");

    var request = {
      "url": `${apiUrl}/${id}`,
      "method": "DELETE"
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function(response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}
