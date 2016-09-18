import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.set("recording", false);
Session.set("speechText", "nothing yet");


// set up the main template the the router will use to build pages
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
// specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
  this.render("home", {to:"main"}); 
});

Template.home.helpers({
	message: function(){
		/*Meteor.call('getAccessToken', function(err,res){ 
			return res;
		});*/
		return Session.get("speechText");
	}
});


var audioRecorder = new AudioRecorder();

Template.home.events({
	"click .js-voice": function(event){
		console.log("button clicked");
		if(!Session.get("recording")){
			Session.set("recording", true);
		}
		else{
			var textFinal = $('#final_span').html();
			var textInt = $('#interim_span').html();

			Session.set("speechText", textFinal + " " + textInt);

			Meteor.call('getAccessToken',  function(error,result){ 
				if(error){
					console.log(error.reason);
				}
				console.log(result);
			});
			Session.set("recording", false);
		}
		
	}

});
