/*
 Written by beeven on 3/17/2015
*/

var animations = (function() {
    var that = this;
    var slides = $(".slide");
    var currentSlide = -1;
    function ShowNextSlide() {
        currentSlide++;
        if(currentSlide >= slides.length) {
            currentSlide = -1;
        }
        slides.removeClass("current");
        if(currentSlide!=-1) {
            $(slides[currentSlide]).addClass("current");
            var fn = $(slides[currentSlide]).attr('data-animation')
            if(fn == null || typeof(fn) === 'undefined') {
                fn = function(){}
            }
            return Q.fcall(that[fn]);
        } else {
            return Q(null);
        }

    }

    this.ShowTitle = function() {
        // return Q.all([
        //     Q.Promise(function(resolve,reject,notify){
        //         $("#slide1").animate({backgroundColor: "#333"},500,null,function(){resolve()});
        //     }),
        //     Q.Promise(function(resolve,reject,notify){
        //         $(".title").show('slow',function(){resolve()});
        //     })
        // ]);
        return Q("hello1");
    }

    this.ShowSlide2 = function() {
        return Q.Promise(function(resolve,reject,notify){
            $("#slide2 .typed").typed({
                strings: ["Hello, Maeva", "I have something to share with you."],
                typeSpeed: 0,
                callback: function(){resolve()}
            });
        });
    }

    this.ShowSlide3 = function() {
        return Q.Promise(function(){
            mapslides.ShowNextPoi().then(function(){
                
                    mapslides.ShowNextPoi();

                
            });
        })
    }


    return {
        ShowNextSlide: ShowNextSlide
    }
})();





