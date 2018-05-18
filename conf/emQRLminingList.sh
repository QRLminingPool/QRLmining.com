#!/bin/bash
#
# Create the .mail directory and place this file in it.
#
# Takes the first VAR passed to the script and assigns to $email
email=$1
message=("Welcome to the QRL mining pool. You have been added to the list. FYI your mail will not support HTML email. It would be better if it did!")
html=$(cat Welcome.html)
# replace the API key with your valid API from mailgun

validateEmail(){
curl -G --user 'api:{NUMBERS HERE}' \
-G https://api.mailgun.net/v3/mg.qrlmining.com/validate \
--data-urlencode address='$email'
}
sendMail(){
curl -s --user 'api:{NUMBERS HERE}' \
	 https://api.mailgun.net/v3/mg.qrlmining.com/messages \
	-F from='QRL Mining Pool <pool@mg.qrlmining.com>' \
	-F to=$email \
	-F subject='Welcome To QRL Mining Pool' \
	-F text="${message[*]}" \
	--form-string html="$html"
}
addList(){
curl -s --user 'api:{NUMBERS HERE}' \
    https://api.mailgun.net/v3/lists/qrlmining@mg.qrlmining.com/members \
    -F subscribed=True \
    -F address=$email 
}
# validating email
validateEmail
# then add the email to mail list
addList
# This little function sends the email
sendMail
logger 'MailGun kaPow'
