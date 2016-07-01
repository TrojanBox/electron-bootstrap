var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
var local;
if (s = ua.match(/msie ([\d.]+)/)) {
    Sys.ie = s[1];
} else if (s = ua.match(/firefox\/([\d.]+)/)) {
    Sys.firefox = s[1];
} else if (s = ua.match(/chrome\/([\d.]+)/)) {
    Sys.chrome = s[1];
} else {
    Sys.chrome = true;
}

//以下进行测试
if (Sys.firefox) {
    local = {
        setItem: function (nam, val) {
            window.localStorage.setItem(nam, val);
        },
        getItem: function (nam) {
            return window.localStorage.getItem(nam);
        },
        removeItem: function (nam) {
            window.localStorage.removeItem(nam);
        },
        clear: function () {
            window.localStorage.clear();
        },
        length: function () {
            window.localStorage.length();
        },
        key: function (i) {
            window.localStorage.key(i);
        }
    };
}


if (Sys.ie) {
    var box = document.body || document.getElementsByTagName("head")[0] || document.documentElement;
    UserData_obj = document.createElement('input');
    UserData_obj.type = "hidden";
    UserData_obj.addBehavior("#default#userData");
    box.appendChild(UserData_obj);

    //设定对象
    local = {
        setItem: function (nam, val) {
            UserData_obj.load(nam);
            UserData_obj.setAttribute(nam, val);
            var d = new Date();
            d.setDate(d.getDate() + 700);
            UserData_obj.expires = d.toUTCString();
            UserData_obj.save(nam);
            UserData_obj.load("local_userdata");
            var dt = UserData_obj.getAttribute("local_userdata");
            if (dt == null)dt = '';
            var reg = new RegExp(nam);
            //判断nam名字是否存在，不存在添加进去
            if (!reg.test(dt)) {
                dt = dt + nam + ",";
            }
            UserData_obj.setAttribute("local_userdata", dt);
            UserData_obj.save("local_userdata");
        },

        //模拟 setItem

        getItem: function (nam) {
            UserData_obj.load(nam);
            return UserData_obj.getAttribute(nam);
        },

        //模拟 getItem
        removeItem: function (nam) {
            UserData_obj.load(nam);
            clear_userdata(nam);
            UserData_obj.load("local_userdata");
            var dt = UserData_obj.getAttribute("local_userdata");
            var reg = new RegExp(nam + ",", "g");
            dt = dt.replace(reg, '');
            var d = new Date();
            d.setDate(d.getDate() + 700);
            UserData_obj.expires = d.toUTCString();
            UserData_obj.setAttribute("local_userdata", dt);
            UserData_obj.save("local_userdata");
        },

        //模拟 removeItem
        clear: function () {
            UserData_obj.load("local_userdata");
            var dts = UserData_obj.getAttribute("local_userdata").split(",");
            for (var i in dts) if (dts.hasOwnProperty(i)) {
                if (dts[i] != '') {
                    UserData_obj.load(dts[i]);
                    UserData_obj.removeAttribute(dts[i]);
                    clear_userdata(dts[i]);
                }
            }
            UserData_obj.load("local_userdata");
            UserData_obj.removeAttribute("local_userdata");
            clear_userdata("local_userdata")
        },
        //模拟 clear();
        clear2: function () {
            UserData_obj.load("local_userdata");
            var dts = UserData_obj.getAttribute("local_userdata").split(",");
            for (var i in dts) if (dts.hasOwnProperty(i)) {
                if (dts[i] != '') {
                    UserData_obj.load(dts[i]);
                    UserData_obj.removeAttribute(dts[i]);
                    clear_userdata(dts[i]);

                }
            }
            clear_userdata("local_userdata");
        },
        each: function () {
            UserData_obj.load("local_userdata");
            var dts = UserData_obj.getAttribute("local_userdata").split(",");
            for (var i in dts) if (dts.hasOwnProperty(i)) {
                alert(dts[i]);
            }
            return dts;
        }
    };

    function clear_userdata(keyname) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        UserData_obj.load(keyname);
        UserData_obj.expires = d.toUTCString();
        UserData_obj.save(keyname);
    }
}


if (Sys.chrome) {
    local = {
        setItem: function (nam, val) {
            window.localStorage.setItem(nam, val);
        },
        getItem: function (nam) {
            return window.localStorage.getItem(nam);
        },
        removeItem: function (nam) {
            window.localStorage.removeItem(nam);
        },
        clear: function () {
            window.clear();
        },
        length: function () {
            window.localStorage.length();
        },
        key: function (i) {
            window.localStorage.key(i);
        }
    };
}

exports.localStorage = local;