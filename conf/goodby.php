<?php
$email = ($_GET['email']);

echo "<div data-closable class='alert-box callout warning'><i class='fa fi-alert'></i> Oh No! ";
echo $email;
echo " has been removed from the list. <button class='close-button' aria-label='Dismiss alert' type='button' data-close><span aria-hidden='true'>&CircleTimes;</span></button></div> ";
?>