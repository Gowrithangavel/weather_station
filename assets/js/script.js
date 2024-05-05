'echarts';

var getdata;


//****************************  Login *******************************/

function login() 
{
        console.log("Login button clicked");

            // Prevent form submission
            event.preventDefault();

            // Get username and password
            var username = document.getElementById("L_username").value;
            var password = document.getElementById("L_password").value;

            var Lerrormesssage = document.getElementById("L_error_message");


            const L_Jsondata = {"username" : username , "password" : password};
            const L_Jsondata_stringfy =JSON.stringify(L_Jsondata);
            console.log(L_Jsondata_stringfy);

            console.log("Username:", username);
            console.log("Password:", password);

            // Simulate successful login for testing
            if (username === "admin" && password === "admin")
            {
                Lerrormesssage.innerText = "Login successful";
                Lerrormesssage.style.color ="green";
                console.log("Login successful");
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } 
            else 
            {
                console.log("Login failed");
                Lerrormesssage.innerText ="Login Failed";
                Lerrormesssage.style.color = "red";
                // Handle login failure, display error message, etc.
            }
}


//  .....................................SIGNUP PAGE

function signin() 
{
    console.log("am sigin");

    // Prevent form submission
    event.preventDefault();

    var username = document.getElementById("R_username").value;
    var password = document.getElementById("R_password").value;
    var mail = document.getElementById("R_mail").value;
    var mobilenumber = document.getElementById("R_mobile_number").value;
    var Rerrormesssage = document.getElementById("R_error_message");

    // Check if any field is empty
    if (username === "") 
    {
        console.log("username is required");
        Rerrormesssage.innerText = "* Username is required";
        return; // Stop further execution
    } 
    else if (password === "") 
    {
        Rerrormesssage.innerText = "* Password is required";
        return;
    } 
    else if (mail === "") 
    
    {
        Rerrormesssage.innerText = "* Mail is required";
        return;
    } 
    else if (mobilenumber === "") {
        Rerrormesssage.innerText = "* Mobile number is required";
        return;
    }

    // Clear any existing error message
    Rerrormesssage.innerText = "";

    // Create an object with the signin data
    var signinData = {
        "username": username,
        "password": password,
        "mail": mail,
        "mobilenumber": mobilenumber
    };

    // Convert signinData object to JSON string
    var jsonData = JSON.stringify(signinData);

    // Send AJAX request to the server
    $.ajax({
        type: "POST",
        // url: "server.php/Signdata",
        url: "test_data/Signdata.json",
        data: jsonData,
        contentType: "application/json",
        success: function(response) 
        {
            // Handle success response here if needed
            console.log("Data stored successfully:", response);
            // Redirect to index.html
            window.location.href = "index.html";
        },
        error: function(xhr, status, error) {
            // Handle error response here
            console.error("Error storing data:", error);
            // You can optionally display an error message to the user
        }
    });
}



//***********************  DATE AND TIME **********************/

function update_date() 
{
    var dt = new Date();
    var dateElement = document.getElementById("date_time");

    if (dateElement) 
    {
        
        // Formatting date and time without timezone offset
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        var dateTimeString = dt.toLocaleDateString(undefined, options);
        var gmtString = 'GMT' + (dt.getTimezoneOffset() < 0 ? '+' : '-') + 
                        ('0' + Math.abs(dt.getTimezoneOffset() / 60)).slice(-2) + 
                        ('0' + Math.abs(dt.getTimezoneOffset() % 60)).slice(-2) + 
                        ' (India Standard Time)';
            
        // Combining date and time with GMT offset
        var dateTimeWithGMT = dateTimeString + '<br>' + gmtString;
        dateElement.innerHTML = dateTimeWithGMT;
    } 
    else 
    {
        console.log('Element not found');
    }
}




//--------------------------- Sidebar -------------------------------

document.addEventListener("DOMContentLoaded", function() 
{
    console.log("DOMContentLoaded event fired");

    // Prevent form submission
    event.preventDefault();

    const sidebarToggler = document.querySelector(".sidebar-icon");
    const sidebar = document.querySelector("#Sidebar");

    function toggleSidebar() 
    {
        if (sidebar) 
        {
            sidebar.classList.toggle("collapsed");
        }
    }

    if (sidebarToggler && sidebar) 
    {
        sidebarToggler.addEventListener('click', function() 
        {
            console.log("Sidebar toggled");
            toggleSidebar();
        });
    }
    
    function updateSidebarVisibility() 
    {
        // Hide sidebar by default on mobile view
        if (window.innerWidth <= 1440) 
        {
            console.log("Hiding sidebar on mobile view");
            sidebar.classList.add("collapsed");
        } 
        else 
        {
            sidebar.classList.remove("collapsed");
        }
    }

    // Initial check
    updateSidebarVisibility();

    // Update sidebar visibility when viewport size changes
    window.addEventListener('resize', updateSidebarVisibility);

});


//--------------------------- Main and sidebar --------------------------

document.addEventListener("DOMContentLoaded", function() 
{
    // Get references to the main element and the sidebar toggle button
    const main = document.getElementById('main');
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');

    // Add an event listener to the toggleSidebarBtn to toggle the classes on the main element
    toggleSidebarBtn.addEventListener('click', function() 
    {
        main.classList.toggle('full-screen');
    });

})


//-------------------------------- Test server --------------------------

function test_server()
{
    console.log("am test server");
    var test_field = document.getElementById("test_field").value;
    var test_data = parseInt(document.getElementById("test_data").value);

    const test_Jsondata ={};
    test_Jsondata[test_field] = test_data;
    const test_Jsondata_stringify = JSON.stringify(test_Jsondata);
    console.log(test_Jsondata_stringify);

    test_server_http_post(test_Jsondata_stringify);
}


function test_server_http_post( getdata)
{
    console.log("am getdata");
    console.log(getdata);
    $.ajax({
        type: "POST",
        // url: "server.php/rawdata",
        url: "test_data/rawdata.json",
        data: getdata,
        contentType: "application/json",
        success: function(response)
        {
          // Handle success response
          console.log(response);
        var stringify_response = JSON.stringify(response);
        var parsedata = JSON.parse(stringify_response);
        var server_response_status = parsedata.status;
        document.getElementById("display_response").innerHTML = server_response_status;
        
        },
        error: function(xhr, status, error) 
        {
          // Display error message
          document.getElementById("error_message").innerHTML = "Error: " + xhr.responseText;
      
        }
      
      });
}


//------------------ Display page------------------------


function server_getdata() {
    console.log("am server.getdata");
    $.ajax({
        // type: "POST",
        type: "GET",
        // url: 'server.php/Ldata',
        url: "test_data/Ldata.json",
        dataType: "json",
        success: function(response) {
            console.log("am in response");
            console.log(response);
            var stringify_response = JSON.stringify(response);
            var parsedata = JSON.parse(stringify_response);
            var server_response_temperature = parsedata.data[0].T;
            var server_response_humidity = parsedata.data[0].H;
            var server_response_wind = parsedata.data[0].W;
            var server_response_rain = parsedata.data[0].R;
            var server_response_timestamp = parsedata.data[0].timestamp;
            var received_device_id = parsedata.data[0].did;
            var server_response_location_lat = parsedata.data[0].lat;
            var server_response_location_long = parsedata.data[0].lon;
            var Received_Date = new Date(server_response_timestamp * 1000);

            // Check if elements exist before accessing them
            var temperature_reading_elem = document.getElementById("temperature_reading");
            var humidity_reading_elem = document.getElementById("humidity_reading");
            var wind_reading_elem = document.getElementById("wind_reading");
            var rain_reading_elem = document.getElementById("rain_reading");
            var device_id_elem = document.getElementById("device_id");
            var time_stamp_elem = document.getElementById("time_stamp");
            var latitude_elem = document.getElementById("latitude");
            var longitude_elem = document.getElementById("longitude");
            var interval_elem = document.getElementById("interval");

            if (temperature_reading_elem) 
            {
                if(server_response_temperature != null)
                {
                temperature_reading_elem.innerHTML = server_response_temperature;
                }
                else
                {
                    temperature_reading_elem.innerHTML = "-";
                }
            }
            if (humidity_reading_elem) 
            {
                if(server_response_humidity != null)
                {
                    humidity_reading_elem.innerHTML = server_response_humidity;
                }
                else
                {
                    humidity_reading_elem.innerHTML = "-";
                }
            }
            if (wind_reading_elem) 
            {
                if (server_response_wind != null)
                {
                    wind_reading_elem.innerHTML = server_response_wind;
                }
                else
                {
                    wind_reading_elem.innerHTML = "-";
                }
            }
            if (rain_reading_elem) 
            {
                if(server_response_rain != null)
                {
                    rain_reading_elem.innerHTML = server_response_rain;
                }
                else
                {
                    rain_reading_elem.innerHTML = "-";
                }
            }
            if (device_id_elem)
            {
                if(received_device_id != null)
                {
                    device_id_elem.innerText = received_device_id;
                }
               else
               {
                    device_id_elem.innerText = "-";
               }
            }
            if (time_stamp_elem) 
            {
                var date = new Date(server_response_timestamp * 1000);

                // Format the date and time
                var formattedDateTime = date.toLocaleString();
                
                // Update the timestamp element with the formatted date and time
                if (time_stamp_elem) 
                {
                    time_stamp_elem.innerText = formattedDateTime;
                }

            }
            if (latitude_elem) 
            {
                if(server_response_location_lat != null)
                {
                    latitude_elem.innerHTML = "Latitude: " + server_response_location_lat;
                }
               else
               {
                latitude_elem.innerHTML = "Latitude: " + "-";
               }
            }
            if (longitude_elem) 
            {
                if(server_response_location_long != null)
                {
                    longitude_elem.innerHTML = "Longitude: " + server_response_location_long;
                }
                else
                {
                    longitude_elem.innerHTML = "Longitude: " + "-";
                }
            }
            if (interval_elem) 
            {
                var current_timestamp = Date.now();
                var reporting_interval = current_timestamp - Received_Date;
                if (reporting_interval > 60000) {
                    interval_elem.innerText = "Not Reporting";
                    interval_elem.style.color = "Brown";
                } else {
                    interval_elem.innerText = "Reporting";
                    interval_elem.style.color = "Blue";
                }
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
    console.log("am ajax.getdata");
}


document.addEventListener("DOMContentLoaded", function()
{

    // Check if the current page is dashboard.html
    if (window.location.href.includes("dashboard.html")) {
        // Call server_getdata() if the current page is dashboard.html
        server_getdata();
    }
        // Check if the current page is dashboard.html
    else if (window.location.href.includes("chart.html")) 
    {
            // Call server_getdata() if the current page is dashboard.html
            chart();
    }
            // Check if the current page is dashboard.html
    else if (window.location.href.includes("reports.html")) 
    {
                    // Call server_getdata() if the current page is dashboard.html
                    server_history_data();
    }
});


//  ************************************************************* Report page ***********************************************************************

function server_history_data()
{

    
  $.ajax({
    // type: "POST",
    type: "GET",
    // url: 'server.php/Hdata',
    url: "test_data/Hdata.json",
    dataType: "json",
    success: function(response) 
    {
      console.log("am history data");

      console.log(response);
        var server_response = JSON.stringify(response);
        var history_parsedata= JSON.parse(server_response); 
        var history_data_arrayLength = history_parsedata.data.length;

        console.log(history_data_arrayLength);

        var history_data_table = document.getElementById("add_row");
        var rowsHTML = ''; // Initialize empty string to hold rows

        for (var z = history_data_arrayLength - 1; z >= 0; z--)
        {
            // var row = document.createElement("tr");

            var history_data_timestamp = history_parsedata.data[z].timestamp;
            var Received_time = new Date(history_data_timestamp * 1000);

            var GMT_setindian_time =
            {
              timezone: 'Asia/Kolkata' //indian time zone
            };

            var human_readable_time = Received_time.toLocaleString('en-IN', GMT_setindian_time);

            rowsHTML +=
            '<tr>' +
            '<td>' + history_parsedata.data[z].did + '</td>' +
            '<td>' + history_parsedata.data[z].T + '</td>' +
            '<td>' + history_parsedata.data[z].H + '</td>' +
            '<td>' + history_parsedata.data[z].W + '</td>' +
            '<td>' + history_parsedata.data[z].R + '</td>' +
            '<td>' + history_parsedata.data[z].lat + '</td>' +
            '<td>' + history_parsedata.data[z].lon + '</td>' +
            '<td>' + human_readable_time +'</td>'+
            '<td>' + "HTTP"+'</td>'; 
            '</tr>'; 

                // Set the content of the table to the accumulated rowsHTML
            if (history_data_table != null) 
            {
                history_data_table.innerHTML = rowsHTML;
            }
        }
    },
  })
}

//------------------------- Footer ---------------------------

document.addEventListener("DOMContentLoaded", function() 
{
    // Get references to the main element and the sidebar toggle button
    const footer = document.getElementById('footer');
    const toggleFooterbtn = document.querySelector('.toggle-sidebar-btn');

    // Add an event listener to the toggleSidebarBtn to toggle the classes on the main element
    toggleFooterbtn.addEventListener('click', function() 
    {
        footer.classList.toggle('full-screen');
    });
});
// ------------------------------- Report page ----------------------------

function generatePDF() 
{
  console.log("Download button clicked");

  try 
  {
      // Create new jsPDF instance
      var doc = new jsPDF();

      // Add content to the PDF
      doc.text(20, 20, 'Weather Report');

      // Get the table element
      var table = document.getElementById('myreport_page');

      if (!table) 
      {
          throw new Error('Table element with ID "myreport_page" not found.');
      }

      // Convert the table to a PDF
      doc.autoTable({ html: table });

      // Save the PDF
      doc.save('weather_report.pdf');
  } 
  catch (error) 
  {
      console.error('Error generating PDF:', error);
  }
}




function back()
{
  window.location.href="dashboard.html";
}


//---------------------------------------- Chart page ------------------------------

function chart() {
  $.ajax({
      // type: "POST",
      type : "GET",
      // url: 'server.php/Hdata',
      url : "test_data/Hdata.json",
      dataType: "json",
      success: function(response) {
          console.log("chart loading");
          console.log(response);
          var chart_response = JSON.stringify(response);
          var chart_history_parsedata = JSON.parse(chart_response);
          var chart_history_data_arrayLength = chart_history_parsedata.data.length;

          var history_data_temperature = document.getElementById("temp_chart");
          var history_data_humidity = document.getElementById("hum_chart");
          var history_data_wind = document.getElementById("wind_chart");
          var history_data_rain = document.getElementById("rain_chart");

          // Initialize ECharts instances for chart
          var temperature_chart = echarts.init(history_data_temperature);
          var humidity_chart = echarts.init(history_data_humidity);
          var wind_chart = echarts.init(history_data_wind);
          var rain_chart = echarts.init(history_data_rain);

          var temperature_data = [];
          var humidity_data = [];
          var wind_data = [];
          var rain_data = [];
          var timestamps = [];

          let i = 0;

          for (i = 0; i < chart_history_data_arrayLength; i++) 
          {
              console.log("am temperature");
              var chart_history_data_timestamp = chart_history_parsedata.data[i].timestamp;
              var chart_history_data_temperature = chart_history_parsedata.data[i].T;
              var chart_history_data_humidity = chart_history_parsedata.data[i].H;
              var chart_history_data_wind = chart_history_parsedata.data[i].W;
              var chart_history_data_rain = chart_history_parsedata.data[i].R;

              timestamps.push(chart_history_data_timestamp);
              temperature_data.push(chart_history_data_temperature);
              humidity_data.push(chart_history_data_humidity);
              wind_data.push(chart_history_data_wind);
              rain_data.push(chart_history_data_rain);
          }

          console.log(timestamps);
          console.log(temperature_data);

          // Temperature chart
          var option_temperature = {
            // Define grid properties
            grid: {
                top: '10%', // Adjust top padding
                left: '5%', // Adjust left padding
                right: '5%', // Adjust right padding
                bottom: '10%', // Adjust bottom padding
                containLabel: true // Ensure that labels are fully displayed within the grid
            },
            xAxis: {
                type: 'category',
                name: 'Date', // X-axis label
                nameLocation: 'center', // Position on the left side of the x-axis
                nameGap: 30,
                data: timestamps.map(function(timestamp) 
                {
                    // Convert Unix timestamp to milliseconds
                    var date = new Date(timestamp * 1000);
                    // Get the month name and year
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var month = monthNames[date.getMonth()];
                    var day = date.getDate();
                    var year = date.getFullYear().toString().substr(-2); // Extract last 2 digits of the year
                    var hour = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
                    var minute = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
                    var period = hour >= 12 ? 'PM' : 'AM'; // Determine AM or PM
                    hour = hour % 12 || 12; // Convert hour to 12-hour format
                    return  "["+month + ' ' + day + ', ' + year +"]"+ ' ' + hour + ':' + minute + ' ' + period;
                                    //   return month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute;
                }),
                nameTextStyle: {
                    color: 'black', // Change the font color of the X-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: {
                    color: 'black', // Change the font color of x-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the x-axis
                    }
                },
                splitLine: {
                    show: false // Hide the grid lines for x-axis
                }
            },
            yAxis: {
                type: 'value',
                name: 'Value', // Y-axis label
                nameLocation: 'center', // Position on the left side of the y-axis
                nameGap: 30,
                nameTextStyle: {
                    color: 'black', // Change the font color of the Y-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: {
                    color: 'black', // Change the font color of y-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis grid lines
                    }
                }
            },
            tooltip: {
                trigger: 'axis', // Show tooltip when clicking on a data point
                backgroundColor: 'rgba(50,50,50,0.8)', // Set tooltip background color
                textStyle: {
                    color: 'white', // Set tooltip text color
                    fontSize: 12 // Set tooltip text size
                }
            },
            series: [{
                data: temperature_data,
                type: 'line',
                name: 'Temperature', // Series name
                smooth: true, // Enable smooth line
                lineStyle: {
                    width: 2, // Adjust line width
                    color: '#5A9BD4' // Set line color
                },
                itemStyle: {
                    color: '#5A9BD4' // Set data point color
                }
            }]
        };
        

          // Humidity chart
          var option_humidity = {
                        // Define grid properties
            grid: 
            {
                top: '10%', // Adjust top padding
                left: '5%', // Adjust left padding
                right: '5%', // Adjust right padding
                bottom: '10%', // Adjust bottom padding
                containLabel: true // Ensure that labels are fully displayed within the grid
            },
            xAxis: 
            {
                type: 'category',
                name: 'Date', // X-axis label
                nameLocation: 'center', // Position on the left side of the x-axis
                nameGap: 30,
                data: timestamps.map(function(timestamp) 
                {
                    // Convert Unix timestamp to milliseconds
                    var date = new Date(timestamp * 1000);
                     // Get the month name and year
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var month = monthNames[date.getMonth()];
                    var day = date.getDate();
                    var year = date.getFullYear().toString().substr(-2); // Extract last 2 digits of the year
                    var hour = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
                    var minute = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
                    var period = hour >= 12 ? 'PM' : 'AM'; // Determine AM or PM
                    hour = hour % 12 || 12; // Convert hour to 12-hour format
                    return  "["+month + ' ' + day + ', ' + year +"]"+ ' ' + hour + ':' + minute + ' ' + period;
                                                //   return month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute;
                }),
                nameTextStyle: 
                {
                    color: 'black', // Change the font color of the X-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: 
                {
                    color: 'black', // Change the font color of x-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the x-axis
                    }
                },
                splitLine: 
                {
                    show: false // Hide the grid lines for x-axis
                }
            },
            yAxis: 
            {
                type: 'value',
                name: 'Value', // Y-axis label
                nameLocation: 'center', // Position on the left side of the y-axis
                nameGap: 30,
                nameTextStyle: 
                {
                    color: 'black', // Change the font color of the Y-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: 
                {
                    color: 'black', // Change the font color of y-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis
                    }
                },
                splitLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis grid lines
                    }
                }
            },
            tooltip: 
              {
                trigger: 'axis', // Show tooltip when clicking on a data point
                backgroundColor: 'rgba(50,50,50,0.8)', // Set tooltip background color
                textStyle: 
                {
                    color: 'white', // Set tooltip text color
                    fontSize: 12 // Set tooltip text size
                }
            },
            series: [{
                data: humidity_data,
                type: 'line',
                name: 'Humidity', // Series name
                smooth: true, // Enable smooth line
                lineStyle: 
                {
                    width: 2, // Adjust line width
                    color: '#5A9BD4' // Set line color
                },
                itemStyle: 
                {
                    color: '#5A9BD4' // Set data point color
                }
            }]
          };

          // Wind chart
          var option_wind = {
             // Define grid properties
             grid: 
            {
                top: '10%', // Adjust top padding
                left: '5%', // Adjust left padding
                right: '5%', // Adjust right padding
                bottom: '10%', // Adjust bottom padding
                containLabel: true // Ensure that labels are fully displayed within the grid
            },
            xAxis: 
            {
                type: 'category',
                name: 'Date', // X-axis label
                nameLocation: 'center', // Position on the left side of the x-axis
                nameGap: 30,
                data: timestamps.map(function(timestamp) 
                {
                    // Convert Unix timestamp to milliseconds
                    var date = new Date(timestamp * 1000);
                     // Get the month name and year
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var month = monthNames[date.getMonth()];
                    var day = date.getDate();
                    var year = date.getFullYear().toString().substr(-2); // Extract last 2 digits of the year
                    var hour = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
                    var minute = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
                    var period = hour >= 12 ? 'PM' : 'AM'; // Determine AM or PM
                    hour = hour % 12 || 12; // Convert hour to 12-hour format
                    return  "["+month + ' ' + day + ', ' + year +"]"+ ' ' + hour + ':' + minute + ' ' + period;
                                                //   return month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute;
                }),
                nameTextStyle: 
                {
                    color: 'black', // Change the font color of the X-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: 
                {
                    color: 'black', // Change the font color of x-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the x-axis
                    }
                },
                splitLine: 
                {
                    show: false // Hide the grid lines for x-axis
                }
            },
            yAxis: 
            {
                type: 'value',
                name: 'Value', // Y-axis label
                nameLocation: 'center', // Position on the left side of the y-axis
                nameGap: 30,
                nameTextStyle: 
                {
                    color: 'black', // Change the font color of the Y-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: 
                {
                    color: 'black', // Change the font color of y-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis
                    }
                },
                splitLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis grid lines
                    }
                }
            },
            tooltip: 
            {
              trigger: 'axis', // Show tooltip when clicking on a data point
              backgroundColor: 'rgba(50,50,50,0.8)', // Set tooltip background color
              textStyle: 
              {
                  color: 'white', // Set tooltip text color
                  fontSize: 12 // Set tooltip text size
              }
            },
          series: [{
              data: wind_data,
              type: 'line',
              name: 'Wind', // Series name
              smooth: true, // Enable smooth line
              lineStyle: 
              {
                  width: 2, // Adjust line width
                  color: '#5A9BD4' // Set line color
              },
              itemStyle: 
              {
                  color: '#5A9BD4' // Set data point color
              }
            }]
          };

          // Rain chart
          var option_rain = {

              // Define grid properties
             grid: 
            {
                top: '10%', // Adjust top padding
                left: '5%', // Adjust left padding
                right: '5%', // Adjust right padding
                bottom: '10%', // Adjust bottom padding
                containLabel: true // Ensure that labels are fully displayed within the grid
            },
            xAxis: 
            {
                type: 'category',
                name: 'Date', // X-axis label
                nameLocation: 'center', // Position on the left side of the x-axis
                nameGap: 30,
                data: timestamps.map(function(timestamp) 
                {
                    // Convert Unix timestamp to milliseconds
                    var date = new Date(timestamp * 1000);
                     // Get the month name and year
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var month = monthNames[date.getMonth()];
                    var day = date.getDate();
                    var year = date.getFullYear().toString().substr(-2); // Extract last 2 digits of the year
                    var hour = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
                    var minute = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
                    var period = hour >= 12 ? 'PM' : 'AM'; // Determine AM or PM
                    hour = hour % 12 || 12; // Convert hour to 12-hour format
                    return  "["+month + ' ' + day + ', ' + year +"]"+ ' ' + hour + ':' + minute + ' ' + period;
                                                //   return month + ' ' + day + ', ' + year + ' ' + hour + ':' + minute;
                }),
                nameTextStyle: 
                {
                    color: 'black', // Change the font color of the X-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: 
                {
                    color: 'black', // Change the font color of x-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the x-axis
                    }
                },
                splitLine: 
                {
                    show: false // Hide the grid lines for x-axis
                }
            },
            yAxis: 
            {
                type: 'value',
                name: 'Value', // Y-axis label
                nameLocation: 'center', // Position on the left side of the y-axis
                nameGap: 30,
                nameTextStyle: 
                {
                    color: 'black', // Change the font color of the Y-axis name to black
                    fontSize: 14, // Adjust font size
                    fontWeight: 'bold' // Apply bold font weight
                },
                axisLabel: 
                {
                    color: 'black', // Change the font color of y-axis labels to black
                    fontSize: 12 // Adjust font size
                },
                axisLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis
                    }
                },
                splitLine: 
                {
                    lineStyle: 
                    {
                        color: 'rgba(0,0,0,0.1)' // Apply a subtle line color for the y-axis grid lines
                    }
                }
            },
            tooltip: 
            {
                trigger: 'axis', // Show tooltip when clicking on a data point
                backgroundColor: 'rgba(50,50,50,0.8)', // Set tooltip background color
                textStyle: 
                {
                    color: 'white', // Set tooltip text color
                    fontSize: 12 // Set tooltip text size
                }
            },
            series: [{
                data: rain_data,
                type: 'line',
                name: 'Rain', // Series name
                smooth: true, // Enable smooth line
                lineStyle: 
                {
                    width: 2, // Adjust line width
                    color: '#5A9BD4' // Set line color
                },
                itemStyle: 
                {
                    color: '#5A9BD4' // Set data point color
                }
            }]
          };

          // Set options for each chart
          option_temperature && temperature_chart.setOption(option_temperature);
          option_humidity && humidity_chart.setOption(option_humidity);
          option_wind && wind_chart.setOption(option_wind);
          option_rain && rain_chart.setOption(option_rain);
      },
      error: function(xhr, status, error) 
      {
          console.error("Error:", error); // Log any errors for debugging
      }
  });
}


function updateData()
 {

        // Check if the current page is dashboard.html
        if (window.location.href.includes("dashboard.html")) {
            // Call server_getdata() if the current page is dashboard.html
            // server_getdata();
            setInterval(server_getdata, 5000);

        }
            // Check if the current page is dashboard.html
        else if (window.location.href.includes("chart.html")) 
        {
                // Call server_getdata() if the current page is dashboard.html
                setInterval(chart, 5000);

        }
                // Check if the current page is dashboard.html
        else if (window.location.href.includes("reports.html")) 
        {
                        // Call server_getdata() if the current page is dashboard.html
                        setInterval(server_history_data, 5000);

        }
}

 // Function to handle sign-out
 function signOut() 
{
    // For demonstration purposes, let's just display an alert
    alert('Signing out...');

    // Redirect the user to a sign-out page after a brief delay
    setTimeout(function() 
    {
        window.location.href = "index.html"; // Replace "signout-page.html" with the actual URL of your sign-out page
    }, 500); // Delay for 2 seconds (2000 milliseconds)
}



updateData();
// setInterval(chart,1000);
// setInterval(server_getdata,1000);
// setInterval(server_history_data,1000);