<?php
echo '
<div class="simple-subscription-form ">
            <form  action="conf/email.php" method="post" >
              <h4 style="color: #eaa228; font-size: 3rem;"><strong>Join The Mailing List</strong></h4>
              <div class="input-group-dark">
                <span class="input-group-dark-label">
                  <i class="fi-mail"></i>
                </span>
                <input class="input-group-dark-field" 
                type="email" 
                placeholder="Email@Address" 
                name="email" 
                required>
                <button class="gold round button" type="submit" >Sign Up</button>
              </div>
            </form>
          </div>';
?>