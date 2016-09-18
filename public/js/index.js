$(document).ready(function(){

    var data = {
        'devices' : [
            {
                'name': "Ishaan's Macbook Pro",
                'data': [['IP', '127.0.0.1'],['Status', 'On']],
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': 'https://upload.wikimedia.org/wikipedia/commons/0/07/Macbook_Pro_PSD.png'
            },
            {
                'name': "Google Nexus 6P",
                'data': [['IP', '127.0.0.2'],['Status', 'On']],
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': 'http://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/topic_images/2015/nexus-6p-topic-full.png'
            },
            {
                'name': "Raspberry Pi 3",
                'data': [['IP', '127.0.0.42'],['Status', 'On']],
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': ''
            },
            {
                'name': "Philips LED - Floor",
                'data': [['Color', 'Multiple'],['Status', 'On']],
                'commands': ['Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'],
                'image': ''
            },
            {
                'name': "Philips LED - Bedside",
                'data': [['Color', 'Yellow'],['Status', 'Off']],
                'commands': ["Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
                'image': ''
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

    for (var i = 0; i < data.devices.length; i++) {
        var el = "<div class='tile'><div class='content'><div class='image picture-contain' data-bg='"+ data.devices[i].image +"'></div><div class='desc'><div class='left'><h3>";
        el += data.devices[i].name + "</h3><h5>Commands:</h5><p>";
        for (var j = 0; j < data.devices[j]['commands'].length; j++){
            el += data.devices[i]['commands'][j] + "<br>"
        }
        el += "</p></div><div class='right'>";
        for (var j = 0; j < data.devices[j].data.length; j++){
            el += "<h5>" + data.devices[i].data[j][0] + " : <span>" + data.devices[i].data[j][1] + "</span></h5>";
        }
        el += "</div></div></div></div>";
        $('#devices').append(el);
    }

    for (var i = 0; i < data.songs.length; i++) {
        var el = "<div class='song'><div class='picture cover-art' data-bg='" + data.songs[i].art + "'></div><div class='desc'><h1>" + data.songs[i]['name'] + "</h1><h2>" + data.songs[i].artist + " - " + data.songs[i].album + "</h2><a href='"+ data.songs[i]['buy-link'] +"'>Buy</a> <span>&bull;</span>";
        el += " <a href='" + data.songs[i]['spotify-link'] + "'>View on Spotify</a></div></div>";
        $('#songs').append(el);
    }

    $('.picture').each(function(){
        $this = $(this);
        $this.css({
            'background': "url('" + $this.attr('data-bg') + "')",
            "background-size": "cover",
            "background-position": "center center",
            "background-repeat": "no-repeat"
        });
    });

    $('.picture-contain').each(function(){
        $this = $(this);
        $this.css({
            'background': "url('" + $this.attr('data-bg') + "')",
            "background-size": "contain",
            "background-position": "center center",
            "background-repeat": "no-repeat"
        });
    });

    $('.trigger').click(function(){
        if ($(window).scrollTop() > $(window).outerHeight()){
            $('#menux').toggleClass('visible');
            $(this).toggleClass('open');
        }
    });

    $('.scroller').click(function(e){
        e.preventDefault();
        var $this = $(this);
        var dest = $($this.attr("scrollTo")).offset().top;
		$("html,body").animate({scrollTop: dest},600,$.bez([.56,0,.39,1]));
    });

    $(window).scroll(function(){
        if ($('#menux').hasClass('visible')){
            $('#menux').removeClass('visible');
            $('.trigger').removeClass('open');
        }
    });

});
