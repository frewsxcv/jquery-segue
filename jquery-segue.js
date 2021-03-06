(function ($) {
    var preloadImg = function (src, callback) {
        var img = new Image();
        img.onload = function () { callback(img); };
        img.src = src;
    };

    var preloadBgImg = function (src, callback) {
        var img = new Image();
        img.onload = function () { callback(); };
        img.src = src;
    };
    
    $.fn.segue = function (a, b) {
        var $this = $(this),
            $divs = $this.filter("[data-segue-src]"),
            $bgDivs = $this.filter("[data-segue-bgsrc]"),
            callback,
            speed;

        if (b !== undefined) {
            speed = a;
            callback = b;
        } else if (typeof a === "function") {
            callback = a;
        } else if (typeof a === "number" || typeof a === "string") {
            speed = a;
        }

        $divs.each(function () {
            var $div = $(this),
                src = $div.data("segue-src");
            $div.data("segue-src", "");
            preloadImg(src, function (img) {
                var $img = $(img);
                $img.hide().appendTo($div).css({
                    "width": "100%",
                    "height": "100%"
                });
                if (callback !== undefined) {
                    callback($img);
                }
                $img.fadeIn(speed);
            });
        });

        $bgDivs.each(function () {
            var $div = $(this),
                src = $div.data("segue-bgsrc");
            $div.data("segue-bgsrc", "");
            preloadBgImg(src, function () {
                var $img = $("<div>");
                $img.hide().appendTo($div).css({
                    "background-image": "url('" + src + "')",
                    "width": "100%",
                    "height": "100%"
                });
                if (callback !== undefined) {
                    callback($img);
                }
                $img.fadeIn(speed);
            });
        });

        return $this;
    };
}(window.jQuery));
