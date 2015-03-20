function MapSlides(slideDelay){
    var that = this;
    var pois = [
        {
            "name": "市桥中心小学",
            "position": {
                "lat": 22.944206348550168,
                "lng": 113.35924029350281
            },
            "view": {
                "pano": "10061017120905121452300",
                "heading": 193.2,
                "pitch": -1.5
            },
            "lines": [
                "Here was where we met",
                "We didn't know each other"
            ]
        },
        {
            "name": "星海中学",
            "position": {
                "lat":22.953078318527787,
                "lng": 113.36229801177979
            },
            "view": {
                "pano": "10061004140704133737800",
                "heading": 90.2,
                "pitch": -5.9
            },
            "lines": [
                "The first time I met you "
            ]
        }
    ]


    var map = new qq.maps.Map(document.getElementById("map"),{zoom:17})
    var pano = new qq.maps.Panorama(document.getElementById("pano"),{
                disableMove: true,
                disableCompass: true
        });

    function ShowPoi(poi) {
        var deferred = Q.defer();
        var center = new qq.maps.LatLng(poi.position.lat,poi.position.lng);
        map.panTo(center);
        pano.setPano(poi.view.pano);
        pano.setPov({heading: poi.view.heading, pitch: poi.view.pitch});
        
        setTimeout(function(){
            var marker = new qq.maps.Marker({
                position: center,
                animation: qq.maps.MarkerAnimation.DROP,
                map:map
            })
        },1000);
        setTimeout(function(){
            $("#map .lines").show('slow');
            $("#map .lines .typed").remove();
            $("<div class='typed'></div>").appendTo("#map .lines");
            $("#map .typed").typed({
                strings: poi.lines,
                typeSpeed: 50,
                showCursor: false,
                callback: function(){
                    setTimeout(function(){
                        $("#map .lines").hide('slow',function(){
                            deferred.resolve();
                        });
                    },slideDelay)
                }
            })
        },2000)
        return deferred.promise;
    }

    var current = -1;

    this.ShowNextPoi = function() {
        return Q.Promise(function(resolve,reject,notify){
            current++;
            if(current < pois.length) {
                ShowPoi(pois[current]).then(function(){
                    resolve(that);
                });
            } else {
                reject();
            }
        })
        
    }

    this.HasNext = function() {
        return current < pois.length;
    }
};

var mapslides = new MapSlides(5000);