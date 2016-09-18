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
  this.render("home", {to:"landing"}); 
  this.render("bodyFeatures", {to:"body"}); 

});

Template.home.helpers({
	message: function(){
		/*Meteor.call('getAccessToken', function(err,res){ 
			return res;
		});*/
		return Session.get("speechText");
	}
});


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

			/*Meteor.call('getAccessToken',  function(error,result){ 
				if(error){
					console.log(error.reason);
				}
				console.log(result);
			});*/


			Session.set("recording", false);

			Meteor.call('consoleExecSync', textFinal + " " + textInt, function(err,res){
      				if(err){
						console.log(err.reason);
					}
					console.log(res);
      			});
		}
		
	}

});

Template.emotions.events({
	"click .js-capture": function(event){
		
  
      var video = document.querySelector('video');

      var b_canvas1 = document.getElementById("photo");
      b_canvas1.width = 640;
	  b_canvas1.height = 480;
      var b_context1 = b_canvas1.getContext("2d");

      b_context1.drawImage(video, 0, 0);

      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.

      document.querySelector('img').src = b_canvas1.toDataURL('image/webp');

      var options = {
      	apiKey: '9fb1fd2f7d426a9',
      	image: b_canvas1.toDataURL('image/png'),

      };

      Imgur.upload(options, function(error, data){
      		if(error){
      			console.log(error);
      		}
      		else
      			console.log(data.link);
      			Meteor.call('getEmotions', data.link, function(err,res){
      				if(err){
						console.log(err.reason);
					}
					console.log(res);
      			});
      });

      var win = window.open(document.querySelector('img').src);
      win.focus();	    
	}
});
