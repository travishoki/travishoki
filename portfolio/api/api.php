<?php
if(isset($_REQUEST['cmd'])){
	switch($_REQUEST['cmd']){
		case 'sendContactForm':
			if(isset($_REQUEST['name']) && isset($_REQUEST['email']) && isset($_REQUEST['comment'])){
				echo sendContactForm($_REQUEST['name'], $_REQUEST['email'], $_REQUEST['comment']);
			}
			break;
	}//switch
}

function sendContactForm($name, $email, $comment){
	$to = 'travis.hoki@gmail.com';
	$subject = 'TravisHoki.com Contact Form';

	$msg = 'TravisHoki.com Contact Form';
	$msg .= 'Name: '.$name;
	$msg .= 'Email: '.$email;
	$msg .= 'Comment: '.$comment;

	// Send email
	if(mail($to,$subject,$msg)) {
		echo 'success';
	}else{
		echo 'fail';
	}
}//sendContactForm
?>