
var songs = [];

function getConfig() {
    return {
        apiKey: "ECLJI0GPBJVEXSZDT",
        spotifySpace: "spotify",
        echoNestHost: "http://developer.echonest.com/"
    };
}

/* Tools for making working with the Spotify and Echo Nest APIs easier */
function getSpotifyPlayButtonForPlaylist(title, playlist) {
    var embed = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:TRACKS" style="width:640px; height:520px;" frameborder="0" allowtransparency="true"></iframe>';
    var tids = [];
    playlist.forEach(function(song) {
        var tid = fidToSpid(song.tracks[0].foreign_id);
        tids.push(tid);
    });
    var tracks = tids.join(',');
    var tembed = embed.replace('TRACKS', tracks);
    tembed = tembed.replace('PREFEREDTITLE', title);
    var li = $("<span>").html(tembed);
    return $("<span>").html(tembed);
}

/* converts full URI to just the simple spotify id */

function fidToSpid(fid) {
    var fields = fid.split(':');
    return fields[fields.length - 1];
}

function getSpotifyPlayer(inPlaylist, callback) {
    var curSong = 0;
    var audio = null;
    var player = createPlayer();
    var playlist = null;

    function addSpotifyInfoToPlaylist() {
        var tids = [];
        inPlaylist.forEach(function(song) {
            var tid = fidToSpid(song.tracks[0].foreign_id);
            tids.push(tid);
        });

        $.getJSON("https://api.spotify.com/v1/tracks/", { 'ids': tids.join(',')})
            .done(function(data) {
                console.log('sptracks', tids, data);


                data.tracks.forEach(function(track, i) {
                    inPlaylist[i].spotifyTrackInfo = track;
                });

                console.log('inPlaylist', inPlaylist);
                playlist = filterSongs(inPlaylist);
                songs = [];
                for (var i = 0; i < playlist.length; i++) {
                    var song_info = {};
                    song_info['album'] = playlist[i].spotifyTrackInfo.album['name'];
                    song_info['artist'] = playlist[i].artist_name;
                    song_info['name'] = playlist[i]['title'];
                    song_info['art'] = getBestImage(playlist[i].spotifyTrackInfo.album['images'], 900);
                    song_info['spotify-link'] = playlist[i].spotifyTrackInfo.external_urls.spotify;
                    songs.push(song_info);

                }

                showCurSong(false);
                callback(player);
            })
            .error( function() {
                info("Whoops, had some trouble getting that playlist");
            }) ;
        $('#m-artist').html($("#artist").val());
        console.log(playlist);

    }

    function filterSongs(songs) {
        var out = [];

        function isGoodSong(song) {
            return song.spotifyTrackInfo.preview_url != null;
        }

        songs.forEach(function(song) {
            if (isGoodSong(song)) {
                out.push(song);
            }
        });

        return out;
    }

    function showSong(song, autoplay) {
        $(player).find(".sp-album-art").attr('src', getBestImage(song.spotifyTrackInfo.album.images, 300).url);
        $(player).find(".sp-title").text(song.title);
        $(player).find(".sp-artist").text(song.artist_name);
        audio.attr('src', song.spotifyTrackInfo.preview_url);
        $('#songs').html("");
        for (var i = 0; i < 20; i++) {
            var el = ""
            console.log(i);
            if ('art' in songs[i]) {
                if ('url' in songs[i]['art']){
                    el += "<div class='song'><img class='cover-art' src='" + songs[i].art['url'] + "'/><div class='desc'><h1>" + songs[i]['name'] + "</h1><h2>" + songs[i].artist + " - " + songs[i].album + "</h2>";
                    el += "<a href='" + songs[i]['spotify-link'] + "'>View on Spotify</a></div></div>";
                }
                else{
                    el += "<div class='song'><img class='cover-art' src='assets/default.jpg'/><div class='desc'><h1>" + songs[i]['name'] + "</h1><h2>" + songs[i].artist + " - " + songs[i].album + "</h2>";
                    el += "<a href='" + songs[i]['spotify-link'] + "'>View on Spotify</a></div></div>";
                }
            }
            else {
                el += "<div class='song'><img class='cover-art' src='assets/default.jpg'/><div class='desc'><h1>" + songs[i]['name'] + "</h1><h2>" + songs[i].artist + " - " + songs[i].album + "</h2>";
                el += "<a href='" + songs[i]['spotify-link'] + "'>View on Spotify</a></div></div>";
            }

            $('#songs').append(el);
        }
        if (autoplay) {
            audio.get(0).play();
        }
    }


    function getBestImage(images, maxWidth) {
        var best = images[0];
        images.reverse().forEach(
            function(image) {
                if (image.width <= maxWidth) {
                    best = image;
                }
            }
        );
        return best;
    }

    function showCurSong(autoplay) {
        showSong(playlist[curSong], autoplay);
    }

    function nextSong() {
        if (curSong < 21) {
            curSong++;
            showCurSong(true);
        } else {
        }
    }

    function prevSong() {
        if (curSong > 0) {
            curSong--;
            showCurSong(true);
        }
    }

    function togglePausePlay() {
        console.log('tpp', audio.get(0).paused);
        if (audio.get(0).paused) {
            audio.get(0).play();
        } else {
            audio.get(0).pause();
        }
    }

    function createPlayer() {
        var main = $("<div class='sp-player'>");
        var img = $("<img class='sp-album-art'>");
        var info  = $("<div class='sp-info'>");
        var title = $("<div class='sp-title'>");
        var artist = $("<div class='sp-artist'>");
        var controls = $("<div class='btn-group sp-controls'>");

        var next = $('<button class="btn btn-primary btn-sm" type="button"><i class="fa fa-step-forward"></button>');
        var prev = $('<button class="btn btn-primary btn-sm" type="button"><i class="fa fa-step-backward"></span></button>');
        var pausePlay = $('<button class="btn btn-primary btn-sm" type="button"><i class="fa fa-play"></span></button>');


        audio = $("<audio>");
        audio.on('pause', function() {
            var pp = pausePlay.find("i");
            pp.removeClass('fa-pause');
            pp.addClass('fa-play');
        });

        audio.on('play', function() {
            var pp = pausePlay.find("i");
            pp.addClass('fa-pause');
            pp.removeClass('fa-play');
        });

        audio.on('ended', function() {
            console.log('ended');
            nextSong();
        });

        next.on('click', function() {
            nextSong();
        });

        pausePlay.on('click', function() {
            togglePausePlay();
        });

        prev.on('click', function() {
            prevSong();
        });


        info.append(title);
        info.append(artist);

        controls.append(prev);
        controls.append(pausePlay);
        controls.append(next);

        main.append(img);
        main.append(info);
        main.append(controls);

        main.bind('destroyed', function() {
            console.log('player destroyed');
            audio.pause();
        });
        return main;
    }

    addSpotifyInfoToPlaylist();
    return player;
}

// set up a handler so if an element is destroyed,
// the 'destroyed' handler is invoked.
// See // http://stackoverflow.com/questions/2200494/jquery-trigger-event-when-an-element-is-removed-from-the-dom

(function($){
  $.event.special.destroyed = {
    remove: function(o) {
      if (o.handler) {
        o.handler()
      }
    }
  }
})(jQuery);

jQuery.ajaxSettings.traditional = true;
var config = getConfig();

function fetchArtistPlaylist(artist,  wandering, variety) {
    var url = config.echoNestHost + 'api/v4/playlist/static';
    $("#all_results").empty();
    info("Creating the playlist ...");
    $.getJSON(url, { 'artist': artist,
            'api_key': config.apiKey,
            'bucket': [ 'id:' + config.spotifySpace, 'tracks'],
            'song_selection' : 'energy-bottom',
            'sort' : 'energy-asc',
            'limit' : true,
            'variety' : 1, 'results': 40, 'type':'artist-radio',  })
        .done(function(data) {
            info("");
            if (! ('songs' in data.response)) {
                info("Can't find that artist");
            } else {
                var title = "Artist radio for " + artist;
                getSpotifyPlayer(data.response.songs, function(player) {
                    console.log('got the player');
                    $("#all_results").append(player);
                });
            }
        })
        .error( function() {
            info("Whoops, had some trouble getting that playlist");
        }) ;
}


function newArtist() {
    var artist = $("#artist").val();
    fetchArtistPlaylist(artist, false, .2);
}

function info(txt) {
    $("#info-song").text(txt);
}

function initUI() {
    $("#artist").on('keydown', function(evt) {
        if (evt.keyCode == 13) {
            newArtist();
        }
    });
    $("#go").on("click", function() {
        newArtist();
    });
}

$(document).ready(function() {
    initUI();
    newArtist();

});
