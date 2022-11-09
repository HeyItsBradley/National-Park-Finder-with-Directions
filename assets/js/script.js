$(document).ready(function () {
  $(".selectState li").on("click", function () {
    //delete all lis in select park ul
    $("#parkUl").empty();

    console.log($(this).text());
    $("#stateInput").val($(this).text());
    //once on click has started
    //take this.text value(the state)
    //plug that value into the featch function paramater(in the link)
    //take the data and make new lis under the park dropdown ul
    var selectedState = $(this).text();
    fetch(
      "https://developer.nps.gov/api/v1/parks?&stateCode=" +
        selectedState +
        "&api_key=b295jCwiBszLNsrrMo1lhHZLgvlqvNzbudqN6gHc"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.total; i++) {
          console.log(data);

          var createLi = document.createElement("li");
          var createA = document.createElement("a");
          var selectPark = document.getElementById("parkUl");
          createA.setAttribute("class", "dropdown-item");
          createA.setAttribute("href", "#");

          createA.textContent = data.data[i].name;
          createLi.appendChild(createA);
          selectPark.appendChild(createLi);
        }
        $(".selectPark a").on("click", function () {
          console.log("second click is working");
          $("#activitiesUl").empty();
          console.log($(this).text());
          $("#parkInput").val($(this).text());
        });
      });
  });
});
