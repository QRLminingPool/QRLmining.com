<?php
// define variables and set to empty values
$emailErr = "";
$email = "";
function test_input($data)
{
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set the email var 
    if(!empty($_POST['email'])) {
    $email = test_input($_POST['email']);
    error_log("Email added for: ${email}", 0);
// set var to pass email to script, You have to change the directory
$output = shell_exec("bash /home/ubuntu/.mail/emQRLminingList.sh '".$email."'");
// Fire the script
$output;
}

header("Location: /index.php?sent=Yes&email=${email}");
exit;
}
?>