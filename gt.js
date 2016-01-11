var initGeetest = (function (window, document) {

    var random = function () {
        return parseInt(Math.random() * 10000) + (new Date()).valueOf();
    };

    var head = document.getElementsByTagName("head")[0];

    var callbacks = [];

    var run = function () {
        for (var i = 0, len = callbacks.length; i < len; i = i + 1) {
            callbacks[i]();
        }
        callbacks = [];
    };

    var status;

    if (window.Geetest || document.getElementById("gt_lib")) {

        status = "loaded";

    } else {

        status = "loading";

        // 加载Geetest库
        var cb = "geetest_" + random();

        window[cb] = function () {

            status = "loaded";

            run();

            window[cb] = undefined;
            try {
                delete window[cb];
            } catch (e) {
            }
        };

        var s = document.createElement("script");

        s.onerror = function () {

            status = "fail";

            run();

        };

        s.src = (location.protocol === "https:" ? "https:" : "http:") + "//api.geetest.com/get.php?callback=" + cb;

        head.appendChild(s);

    }

    return function (config, callback) {

        var protocol = config.https ? "https://" : "http://";

        var init = function () {

            callback(new window.Geetest(config));

        };

        var down = function () {

            var s = document.createElement("script");

            s.id = "gt_lib";

            s.src = protocol + "static.geetest.com/static/js/geetest.0.0.0.js";

            s.charset = "UTF-8";

            s.type = "text/javascript";

            head.appendChild(s);

            s.onload = s.onreadystatechange = function () {

                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {

                    init();

                    s.onload = s.onreadystatechange = null;
                }
            };
        };

        if (status === "loaded") {

            // Geetest对象已经存在，则直接初始化
            init();

        } else if (status === "fail") {

            // 无法动态获取Geetest库，则去获取geetest.0.0.0.js
            down();

        } else if (status === "loading") {

            // 之前已经去加载Geetest库了，将回调加入callbacks，等Geetest库好后去回调
            callbacks.push(function () {

                if (status === "fail") {

                    down();

                } else {

                    init();
                }
            });
        }
    };

}(window, document));