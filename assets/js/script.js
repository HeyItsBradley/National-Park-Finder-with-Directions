var parkCode = "";
var allParkCodes = [];
var parksInState = [];

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
        console.log(data);
        for (var i = 0; i < data.total; i++) {
          var createLi = document.createElement("li");
          var createA = document.createElement("a");
          var selectPark = document.getElementById("parkUl");
          createA.setAttribute("class", "dropdown-item");
          createA.setAttribute("href", "#");
          createA.setAttribute("id", "parkIndex" + [i]);

          createA.textContent = data.data[i].name;
          createLi.appendChild(createA);
          selectPark.appendChild(createLi);

          allParkCodes.push(data.data[i].parkCode);
          parksInState.push(data.data[i].name);
        }
        console.log(allParkCodes);
        console.log(parksInState);

        // this is a future function to link activities

        // $(".selectPark a").on("click", function () {
        //   console.log("second click is working");
        //   $("#activitiesUl").empty();
        //   $("#parkInput").val($(this).text());
        //   var parkText = this.id;
        //   console.log(parkText);
        //   // Pulls out number in a string, the index
        //   var parkIndex = parkText.replace(/\D/g, "");
        //   console.log(parkIndex);
        //   // pulled the index to meet the park code
        //   // var parkCode = allParkCodes[parkIndex];
        //   // console.log(parkCode);

        //   fetch(
        //     "https://developer.nps.gov/api/v1/thingstodo?stateCode=" +
        //       parkCode +
        //       "&api_key=b295jCwiBszLNsrrMo1lhHZLgvlqvNzbudqN6gHc"
        //   )
        //     .then(function (response) {
        //       return response.json();
        //     })
        //     .then(function (data) {
        //       console.log(data);
        //     });
      });
  });
});
