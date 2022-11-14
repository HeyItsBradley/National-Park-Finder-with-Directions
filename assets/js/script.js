//VARIABLE DECLERATIONS
var parkCode = "";
var allParkCodes = [];
var parksInState = [];
var selectedParkName = "";
var lat = "";
var long = "";
var pastSearchesArr = [];
var buttonIndex = 0;
//EVENT LISTNERS

$(document).ready(function () {
  //this will listen for clicks on state and parks and return data from selected items
  $(".selectState li").on("click", function () {
    //delete all lis in select park ul
    $("#parkUl").empty();

    //state input field gets set to clicked state
    $("#stateInput").val($(this).text());
    //store selected state name in var
    var selectedState = $(this).text();
    //fetching data on the selected state using API call
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
        //for loop to create new li elements for the parks dropdown menu
        for (var i = 0; i < data.total; i++) {
          //declaring variables for createing elements
          var createLi = document.createElement("li");
          var createA = document.createElement("a");
          var selectPark = document.getElementById("parkUl");
          createA.setAttribute("class", "dropdown-item");
          createA.setAttribute("href", "#");
          createA.setAttribute("id", "parkIndex" + [i]);
          //setting text content and appending
          createA.textContent = data.data[i].name;
          createLi.appendChild(createA);
          selectPark.appendChild(createLi);
          //pushing park code and parks into an array
          // allParkCodes.push(data.data[i].parkCode);
          // parksInState.push(data.data[i].name);
        }
        //when user clicks on a park then
        $(".selectPark a").on("click", function () {
          //park input fields becomes selected park
          $("#parkInput").val($(this).text());
          //create var parktext to be set to the park name
          var parkText = this.id;
          //selected park name gets set to clicked on text
          selectedParkName = $(this).text();
          //updates card title to become selected park
          $(".card-title").text(selectedParkName);

          // Pulls out number in a string, the index
          var parkIndex = parkText.replace(/\D/g, "");
          //card text gets set to describtion of selected park
          $(".card-text").text(data.data[parkIndex].description);
          //We are creating a variable to denote the relative path to the image url and dynamically inserted it to our src variable
          var cardImg = data.data[parkIndex].images[0].url;
          //card image gets set to selcted parks image
          $(".cardImage").attr("src", cardImg);
          //Pulled variable from global and gave it a value of the latitude and longitude of the selected park
          lat = data.data[parkIndex].latitude;
          long = data.data[parkIndex].longitude;
          var searchData = {
            name: selectedParkName,
            description: data.data[parkIndex].description,
            picture: data.data[parkIndex].images[0].url,
            lat: data.data[parkIndex].latitude,
            lon: data.data[parkIndex].longitude,
          };
          pastSearchesArr.push(searchData);
          pastSearchesArr = pastSearchesArr.map(function (obj, i) {
            return { ...obj, index: i };
          });

          localStorage.setItem("PastSearches", JSON.stringify(pastSearchesArr));

          var createHistoryButton = document.createElement("button");
          createHistoryButton.type = "submit";
          createHistoryButton.className = "my-2 col-12 btn btn-primary";
          createHistoryButton.id = "pastSearchButton";
          createHistoryButton.textContent = selectedParkName;
          createHistoryButton.setAttribute("index", buttonIndex);

          document
            .getElementById("pastSearches")
            .appendChild(createHistoryButton);

          buttonIndex++;
        });
      });
  });
  //this will run when a past search is clicked on and fetch and append the info

  //Listeners for clicks on previous search buttons
  $(document).on("click", "#pastSearchButton", function () {
    console.log($(this).val());
    var selectedIndex = $(this).val();

    pastSearchesArr[0].name;

    console.log(pastSearchesArr[selectedIndex]);

    $(".card-title").text(pastSearchesArr[selectedIndex].name);

    $(".card-text").text(pastSearchesArr[selectedIndex].description);
    $(".cardImage").attr("src", pastSearchesArr[selectedIndex].picture);
    lat = pastSearchesArr[selectedIndex].lat;
    lon = pastSearchesArr[selectedIndex].lon;
    $("#parkInput").val(pastSearchesArr[selectedIndex].name);

    console.log(lat + "..." + lon);
  });
  //when run, will fetch localstorage items and append them as buttons in previous searches sections
  function getLocalStorage() {
    var KeyName = window.localStorage.key(0);
    console.log(JSON.parse(window.localStorage.getItem("PastSearches")));
    if (JSON.parse(localStorage.getItem("PastSearches")) !== null) {
      pastSearchesArr = pastSearchesArr.concat(
        JSON.parse(localStorage.getItem("PastSearches"))
      );
    }
    console.log(pastSearchesArr);

    for (let i = 0; i < pastSearchesArr.length; i++) {
      var createHistoryButton = document.createElement("button");
      createHistoryButton.type = "submit";
      createHistoryButton.className = "my-2 col-12 btn btn-primary";
      createHistoryButton.id = "pastSearchButton";
      createHistoryButton.value = pastSearchesArr[i].index;

      //want text conetnt to be localstorage,getitem[i].[1]

      createHistoryButton.textContent = pastSearchesArr[i].name;

      document.getElementById("pastSearches").appendChild(createHistoryButton);
    }
  }
  //on page load, runs this functions
  getLocalStorage();

  // listners for click on lets go button and opens new tap with directions to selected waypoint
  $("#letsGoBtn").on("click", function (e) {
    //checks if no park was selected, if so,
    //prevents default refresh and presents error modal

    if (selectedParkName == null) {
      e.preventDefault();
      $("#exampleModal").modal("show");
      console.log("hello");
      return;
      //if user has selected park,
      //them goes to new page
      //displays directions to park using waze api
    } else {
      console.log(lat + lon);
      $(this).attr("target", "_blank");
      $(this).attr(
        "href",
        "https://www.waze.com/ul?ll=" +
          lat +
          "%2C" +
          lon +
          "&navigate=yes&zoom=17"
      );
    }
  });
});
