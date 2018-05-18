<?php


echo '
<div data-closable class="alert-box callout alert">
  <i class="fa fi-alert"></i> You are going to remove your email from our list. <br>Are you sure?
<button class="close-button" aria-label="Dismiss alert" type="button" data-close>
    <span aria-hidden="true">&CircleTimes;</span>
  </button>
</div>

<div class="simple-subscription-form ">
            <form  action="conf/Unsubscribe.php" method="post">
              <h4 style="color: #eaa228;"><strong>Leave The Mailing List</strong></h4>
              <div class="input-group-dark">
                <span class="input-group-dark-label">
                  <i class="fi-mail"></i>
                </span>
                <input class="input-group-dark-field" 
                type="email" 
                placeholder="Remove Email Address" 
                name="email" 
                required>
                <button class="gold round button" type="submit" >Bye Bye</button>
              </div>
            </form>
          </div>

          ';
?>          