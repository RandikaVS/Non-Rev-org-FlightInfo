
<!DOCTYPE html>
<html>



<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Flight Info</title>

    <!-- Font Awesome -->
            <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            rel="stylesheet"
            />
            <!-- Google Fonts -->
            
            <!-- MDB -->
            

        <!-- MDB -->
        <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.js"
        ></script>

        <style>
            body{
            font-family: 'Open Sans';
            }
        </style>
        <!-- custom css -->
        <link
        href="css/flightapi.css"
        rel="stylesheet"
        />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css" rel="stylesheet"/>

        <link href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css" rel="stylesheet"/>

        <link href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css" rel="stylesheet"/>

        

        <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">

        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
        
</head>

<body>

<div class="container">
  <div class="row" style="padding: 50px;">
        <div class="col-md-12 col-lg-6 col-sm-12">

            <i class="fas fa-search text-primary fa-2x" ></i>
                <span style="font-size: x-large;margin-left:10px;">Search</span>
                    <hr>
                        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="list">
                            <option>---Give location permission to get your nearest airport---</option>
                        </select>
                        <br>
                        <div class="row">
                        <div class="col-md-12 col-lg-6 col-sm-12">
                                
                            <select id="example-select" style="display:none"></select>
                                <input class="form-control mr-2" id="filterByAirline" type="search" placeholder="Filter by airline" aria-label="Search">
                            
                        </div>
                        <div class="col-md-12 col-lg-6 col-sm-12">
                            <select class="browser-default custom-select" style="display:none"></select>
                                <input class="form-control mr-2" id="filterByTerminal" type="search" placeholder="Filter by terminal" aria-label="Search">
                        </div>
                        </div>
        </div>

        <div class="col-md-12 col-lg-6 col-sm-12" id="checkTimeSection" style="pointer-events:none;opacity: 0.4;">

        <i class="fas fa-clock text-primary fa-2x"></i>
                <span style="font-size: x-large; margin-left:10px;">Check other time periods</span>
                <p>12.00 hours range only</p>
                    <hr>

                    <div class="row">
                        <div class="col-md-12 col-lg-6 col-sm-12">
                            <input type="date" id="inputDate" name="birthday" style="width:100%">
                        </div>

                        <div class="col-md-12 col-lg-3 col-sm-12">
                           <input type="time" id="myTime1" name="appt" style="width:100%" >
                        </div>

                        <div class="col-md-12 col-lg-3 col-sm-12">
                           <input type="time" id="myTime2" name="appt" style="width:100%" >
                        </div>

                    </div>
                    <br>
                    <button type="button" style="background-color:#327dff; border-radius:10px; width:100%; height:40px; font-size:20px" onclick="searchByDateTime()">Search</button>
                    <a href="#" ><p style="margin-left:35vw;" onclick="resetDate()"><u>Reset</u></p></a>
                    
        </div>
  </div>
</div>

<div class="container" style="border:1px">
<table class="table table-striped" id="tables" width="100%">

<thead id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="1" width="100%" style="border:1px">
    <tr>
      <th>Destination</th>
      <th>Scheduled Time(Utc)</th>
      <th>Flight</th>
      <th>Airline</th>
      <th>Terminal</th>
      <th>Status</th>
      <!-- <th>Status</th> -->
    </tr>
  </thead>
  <tbody id="table_body">
    
    
  </tbody>


</table>
  <i class="fas fa-exclamation-circle fa-4x text-danger m-3" style="font-size:20px;" id="noData">  No Data available</i>

<br><br>
</div>

 
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>


<script src="js/flightinfo.js"></script>

</body>


</html>