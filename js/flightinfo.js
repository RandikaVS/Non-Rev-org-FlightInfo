$(document).ready(function () {
  $("#filterByAirline").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tables tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

$(document).ready(function () {
  $("#filterByTerminal").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tables tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

document.getElementById("noData").style.visibility = "hidden"; 

var lat, long, airportCode, fromDate, fromTime, toDate, toTime, from, to;

function resetDate(){
  getFlightData();
  document.getElementById("myTime1").value = "00:00:AM";
  document.getElementById("myTime2").value="00:00:AM";
  document.getElementById("inputDate").value="00-00-0000";
}

function searchByDateTime(){
  var date_input = document.getElementById("inputDate").value;

  fromDate = date_input;

  fromTime = "T"+document.getElementById("myTime1").value;
  toTime = "T" + document.getElementById("myTime2").value;

  console.log(fromDate);
  console.log(fromTime);
  console.log(toTime);
  setTimeRange();
  getFlightDataByDateTime();
  

};


const setTimeRange =()=>{

  from = fromDate+fromTime;

  to = fromDate+toTime;

  console.log("From time ",from);
  console.log("to time",to);
}


$(document).ready(function(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
  }
  else{
    swal("Geolocation is not supported by this browser");
  }

});

const setPosition = (position)=>{
   lat = position.coords.latitude;
   long = position.coords.longitude;
   console.log(lat, long);
   getAirportData();
}

const showError = (error)=>{
  switch (error.code) {
    case error.PERMISSION_DENIED:
      swal("Alert!", "Please accept location permission for get airport data");
      break;
    case error.POSITION_UNAVAILABLE:
      swal("Alert!", "Location information is unavailable");
      break;
    case error.TIMEOUT:
      swal("Alert!", "Request time out");
      break;

    default:
      swal("Alert!", "An unknown error occured");
  }
  
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e82537fdc6mshab8501383e1d871p14b763jsn9fbd5919215c",
    "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
  },
};

const getAirportData = ()=>{
  
    fetch(
      "https://aerodatabox.p.rapidapi.com/airports/search/location/" +
        lat +
        "/" +
        long +
        "/km/100/100?withFlightInfoOnly=false",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        $("#list")
          .append(
            response.items.map(function (v) {
              return $("<option/>", {
                value: v.icao,
                text: v.name,
              });
            })
          )
          .change(function () {
            console.log(this.value);
            airportCode = this.value;
            document.getElementById("noData").style.visibility = "hidden"; 
            $("#table_body tr").remove(); 
            getFlightData();
          });
      })
      .catch((err) => {
        console.error(err);
        swal("Alert!","Error while fetching data");
      });
  
};



const getFlightData = () =>{

   $("#table_body tr").remove(); 

  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  var nowDate =  [year, month, day].join("-");

  var nowTime = "T"+d.getHours()+":"+d.getMinutes(); //to assign 
  
  console.log(nowDate);
  console.log(nowTime);


  let destination,timeUtcflight,flight,airLine,status;

  if(airportCode){

fetch(
  "https://aerodatabox.p.rapidapi.com/flights/airports/icao/" +
    airportCode +
    "/" +
    nowDate+
    nowTime+
    "/" +
    nowDate +
    "T23:59?withLeg=true&direction=Departure&withCancelled=true&withCodeshared=true&withCargo=true&withPrivate=true&withLocation=true",
  options
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    document.getElementById("checkTimeSection").style.pointerEvents = "auto";
    document.getElementById("checkTimeSection").style.opacity = "1";
    var table_body = document.getElementById("table_body");
    data.departures.map((single) => {
      console.log(single);

      destination = single.arrival.airport.name || "Unknown";
      timeUtcflight = single.departure.scheduledTimeUtc || "Unknown";
      flight = single.aircraft.model || "Unknown";
      airLine = single.airline.name || "Unknown";
      terminal = single.arrival.terminal || "Unknown";
      status = single.status || "Unknown";

      var statusColColor, terminalColColor;

      if (status == "Unknown") {
        statusColColor = "#ff9a9a";
      } else {
        statusColColor = "#56ff75";
      }
      if (terminal == "Unknown") {
        terminalColColor = "#ff9a9a";
      } else {
        terminalColColor = "#";
      }

      var row = `<tr>
							<td>${destination}</td>
							<td>${timeUtcflight}</td>
							<td>${flight}</td>
              <td>${airLine}</td>
							<td style="background-color:${terminalColColor}">${terminal}</td>
							<td style="background-color:${statusColColor}">${status}</td>
					  </tr>`;

      table_body.innerHTML += row;
    });
  })
  .catch((err) => {
    console.error(err);
    swal("Alert!", "Error while fetching data");
    document.getElementById("noData").style.visibility = "visible";
  });
}else{
  swal("Airport code not available");
}

}

const getFlightDataByDateTime = ()=>{

  let destination, timeUtcflight, flight, airLine, status;
   $("#table_body tr").remove(); 

  document.getElementById("noData").style.visibility = "hidden";

  if (airportCode) {
    fetch(
      "https://aerodatabox.p.rapidapi.com/flights/airports/icao/" +
        airportCode +
        "/"+from+"/"+to+"?withLeg=true&withCancelled=true&withCodeshared=true&withCargo=true&withPrivate=true&withLocation=true",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        $("#table_body tr").remove(); 
        console.log(data);

        var table_body = document.getElementById("table_body");
        data.departures.map((single) => {
          console.log(single);

          destination = single.arrival.airport.name || "Unknown";
          timeUtcflight = single.departure.scheduledTimeUtc || "Unknown";
          flight = single.aircraft.model || "Unknown";
          airLine = single.airline.name || "Unknown";
          terminal = single.arrival.terminal || "Unknown";
          status = single.status || "Unknown";

          var statusColColor, terminalColColor;

          if (status == "Unknown") {
            statusColColor = "#ff9a9a";
          } else {
            statusColColor = "#56ff75";
          }
          if (terminal == "Unknown") {
            terminalColColor = "#ff9a9a";
          } else {
            terminalColColor = "#";
          }

          var row = `<tr>
							<td>${destination}</td>
							<td>${timeUtcflight}</td>
							<td>${flight}</td>
              <td>${airLine}</td>
							<td style="background-color:${terminalColColor}">${terminal}</td>
							<td style="background-color:${statusColColor}">${status}</td>
					  </tr>`;

          table_body.innerHTML += row;
        });
      })
      .catch((err) => {
        console.error(err);
        swal("Alert!", "Error while fetching data");
        document.getElementById("noData").style.visibility = "visible";
      });
  } else {
    swal("Airport code not available");
  }

}

    


 

