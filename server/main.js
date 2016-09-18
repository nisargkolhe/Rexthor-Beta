import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	getAccessToken: function(wavFile){
		/*var result = HTTP.post("https://oxford-speech.cloudapp.net/token/issueToken",
			{
			    headers: {
			      "Content-type":"application/x-www-form-urlencoded"
			    },
			    data: {
			      "grant_type": "client_credentials",
			      "client_id": 'd8e121b3b1294bd9988615bfa976bd47',
			      "client_secret": '9df2da62d9c44cacbf2d061a3eed54c3',
			      "scope": "https://speech.platform.bing.com"
			   }
			}
		);
		console.log(result.content);
		console.log(result.data);*/
		var options = { 
			url: 'https://oxford-speech.cloudapp.net/token/issueToken', 
			method: 'POST',
			headers: {
			      "Content-type":"application/x-www-form-urlencoded"
		    },
		    data: {
		      "grant_type": "client_credentials",
		      "client_id": 'd8e121b3b1294bd9988615bfa976bd47',
		      "client_secret": '9df2da62d9c44cacbf2d061a3eed54c3',
		      "scope": "https://speech.platform.bing.com"
		    },
			include: true 
		};

		var obj1 = Curl.request(options, function (err, stdout, meta) {
			var obj = JSON.parse(stdout.substring(stdout.indexOf('{'),stdout.indexOf('}')+1));
			console.log(obj.access_token);
			return obj;
		});

		console.log(obj1);




	}
});

/*"https://oxford-speech.cloudapp.net/token/issueToken" -H "Content-type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials&client_id=d8e121b3b1294bd9988615bfa976bd47&client_secret=d8e121b3b1294bd9988615bfa976bd47&scope=https://speech.platform.bing.com'*/