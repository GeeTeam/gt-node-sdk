var initGeetest = (function (window, document) {

    var head = document.getElementsByTagName("head")[0];

    var random = function () {

        return parseInt(Math.random() * 10000) + (new Date()).valueOf();

    };

    var status;

    var callbacks = [];

    return function (config, callback) {

        var protocol = config.https ? "https://" : "http://";

        var initGeetest = function () {

            callback(new window.Geetest(config));

        };

        var backendDown = function () {

            var s = document.createElement("script");

            s.id = "gt_lib";

            s.src = protocol + "static.geetest.com/static/js/geetest.0.0.0.js";

            s.charset = "UTF-8";

            s.type = "text/javascript";

            head.appendChild(s);

            s.onload = s.onreadystatechange = function () {

                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {

                    initGeetest();

                    s.onload = s.onreadystatechange = null;
                }
            };
        };

        if (status === "loaded") {

            // Geetest对象已经存在，则直接初始化
            initGeetest();

        } else if (status === "fail") {

            // 无法动态获取Geetest库，则去获取geetest.0.0.0.js
            backendDown();

        } else if (status === "loading") {

            // 之前已经去加载Geetest库了，将回调加入callbacks，等Geetest库好后去回调
            callbacks.push(function () {

                if (status === "fail") {
                    backendDown();
                } else {
                    initGeetest();
                }
            });

        } else {

            status = "loading";

            // 加载Geetest库
            var cb = "geetest_" + random();

            window[cb] = function () {

                status = "loaded";

                for (var i = 0, len = callbacks.length; i < len; i = i + 1) {
                    callbacks[i]();
                }

                initGeetest();

                window[cb] = undefined;
                try {
                    delete window[cb];
                } catch (e) {
                }
            };

            var s = document.createElement("script");

            s.onerror = function () {

                status = "fail";

                for (var i = 0, len = callbacks.length; i < len; i = i + 1) {
                    callbacks[i]();
                }

                backendDown();

            };

            s.src = protocol + "api.geetest.com/get.php?callback=" + cb;

            head.appendChild(s);

        }
    };

}(window, document));