import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

exec = Npm.require('child_process').exec;


Meteor.methods({
	getEmotions: function(url){
		var result = HTTP.post("https://api.projectoxford.ai/emotion/v1.0/recognize",
			{
			    headers: {
			      "Content-type":"application/json",
			      "Host":"api.projectoxford.ai",
			      "Ocp-Apim-Subscription-Key":"29563363851649dd8494f38822736c8e"
			    },
			    data: {
			      "url": url
			   }
			}
		);
		console.log(result.content);
		console.log(result.data);
		return result.data;
		
	},
	execCmd: function(cmd){
		spawn = Npm.require('child_process').spawn;

		command = spawn('python ~/Desktop/scripts/xkcde_Control.py "play some music"', ['-la']);

		command.stdout.on('data',  function (data) {
		  console.log('stdout: ' + data);
		  return data;
		});

		command.stderr.on('data', function (data) {
		  console.log('stderr: ' + data);
		  return data;
		});

		command.on('exit', function (code) {
		  console.log('child process exited with code ' + code);
		  return code;
		});

		return false;

	},
	consoleExecSync : function(seq) {

			var cmd = "python ~/Desktop/scripts/xkcde_Control.py \""+seq+"\"";

			exec(cmd, Meteor.bindEnvironment(
				function(error, stdout, stderr) {
					if (error) {
						console.log(error);
						throw new Meteor.Error(error, error);
					}
					if (stdout) {
						console.log(stdout);
						return stdout;
					}
					if (stderr) {
						console.log(stderr);
						return stderr;
					}
				}
			));
		}
});

/*"https://oxford-speech.cloudapp.net/token/issueToken" -H "Content-type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials&client_id=d8e121b3b1294bd9988615bfa976bd47&client_secret=d8e121b3b1294bd9988615bfa976bd47&scope=https://speech.platform.bing.com'*/