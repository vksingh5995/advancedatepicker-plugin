<?php
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo($title);?>Advance DatePicker Plugin</title>
    <style>
        .datepicker__month-day--no-checkin:after {
            background-color: #a99d9d99;
            height: 90%;
            width: 90%;
            bottom: unset;
            top: 50%;
            left: 50%;
            right: unset;
            transform: translate(-50%, -50%);
            border-radius: 4px;
        }
    </style>

</head>

<body>
    <div>
        <input id="input-id" type="text" placeholder="CheckIn/CheckOut Date">
        <h3>Copy the shortcode and paste wherever you want.</h3>
        <h3 style="color:green;">[advanceplugin_entries]</h3>
    </div>
</body>

</html>