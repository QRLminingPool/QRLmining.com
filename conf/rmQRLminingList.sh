#!/bin/bash
# Takes the first VAR passed to the script and assigns to $email
email=$1
message=("You have been removed. ByeBye"
#html=file_get_contents('Welcome.html');
# replace the API key with your valid API from mailgun
)
validateEmail(){
curl -G --user 'api:{NUMBERS HERE}' \
-G https://api.mailgun.net/v3/mg.qrlmining.com/validate \
--data-urlencode address='$email'
}
#sendMail(){
#curl -s --user '${apiKey}' \
#	 https://api.mailgun.net/v3/mg.qrlmining.com/messages \
#	-F from='QRL Mining Pool <pool@mg.qrlmining.com>' \
#	-F to=$email \
#	-F subject='Welcome To QRL Mining Pool' \
#	-F text="${message[*]}" \
#	--form-string html='${html}'
#}
remList(){
# replace the API key with your valid API from mailgun
curl -s --user 'api:{NUMBERS HERE}' -X DELETE \
    https://api.mailgun.net/v3/lists/qrlmining@mg.qrlmining.com/members/$email
}
# validating email address
validateEmail
logger 'validating...'

# then removes the email to mail list
remList
logger 'removing from list'