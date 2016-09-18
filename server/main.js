import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  var data = {
        'devices' : [
            {
                'name': "Ishaan's Macbook Pro",
                'data': {
                	'IP': '127.0.0.1',
                	'Status': 'On'
                },
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Macbook_Pro_PSD.png'
            },
            {
                'name': "Google Nexus 6P",
                'data': {
                	'IP': '127.0.0.2',
                	'Status': 'On'
                },
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': 'http://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/topic_images/2015/nexus-6p-topic-full.png'
            },
            {
                'name': "Raspberry Pi 3",
                'data': {
                	'IP': '127.0.0.42',
                	'Status': 'On'
                },
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Raspberry_Pi_Logo.svg/512px-Raspberry_Pi_Logo.svg.png'
            },
            {
                'name': "Philips LED - Floor",
                'data': {
                	'Color': 'Multiple',
                	'Status': 'On'
                },
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': 'http://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/topic_images/2014/phillips-hue.png'
            },
            {
                'name': "Philips LED - Bedside",
                'data': {
                	'Color': 'Yellow',
                	'Status': 'On'
                },
                'commands': ["Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
                'image': 'http://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/topic_images/2014/phillips-hue.png'
            }

        ],
        'songs': [
            {
                'name': 'Strawberry Swing',
                'artist': 'Coldplay',
                'album': 'Viva La Vida',
                'buy-link': '',
                'spotify-link': '',
                'art': 'assets/demo.jpg'
            },
            {
                'name': '42',
                'artist': 'Coldplay',
                'album': 'Viva La Vida',
                'buy-link': '',
                'spotify-link': '',
                'art': 'assets/demo.jpg'
            },
            {
                'name': 'Viva La Vida',
                'artist': 'Coldplay',
                'album': 'Viva La Vida',
                'buy-link': '',
                'spotify-link': '',
                'art': 'assets/demo.jpg'
            },
            {
                'name': 'Violet Hill',
                'artist': 'Coldplay',
                'album': 'Viva La Vida',
                'buy-link': '',
                'spotify-link': '',
                'art': 'assets/demo.jpg'
            },
            {
                'name': 'Life in Technicolor',
                'artist': 'Coldplay',
                'album': 'Viva La Vida',
                'buy-link': '',
                'spotify-link': '',
                'art': 'assets/demo.jpg'
            }
        ]
    };
    if (!Devices.findOne()){
	    for(var i = 0; i < data.devices.length; i++){
	    	Devices.insert(data.devices[i]);
	    	console.log(data.devices[i]);
	    }
	}

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
	consoleExecSync : function(seq, emotion) {

			var cmd = "python ~/Desktop/scripts/xkcde_Control.py \""+seq+"\" "+emotion;

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