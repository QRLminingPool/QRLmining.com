<?php
$email = ($_GET['email']);
echo "<div data-closable class='alert-box callout success'><i class='fa fi-check'></i> Success! ";
echo $email;
echo " has been added to the list. <button class='close-button' aria-label='Dismiss alert' type='button' data-close><span aria-hidden='true'>&CircleTimes;</span></button></div> ";
?>