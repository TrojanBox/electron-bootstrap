
var system = require('../config/system');

/**
 * 城市搜索
 * @param id
 * @constructor
 */
var AreaListService = function (id) {
    id = id ? id : undefined;
    this.thenLoad = undefined;
    var $this = this;
    $.ajax({
        type: "GET",
        url: system.config.url.getAreaList,
        data: {id: id},
        dataType: "json",
        success: function (data) {
            $this.thenLoad(data);
        },
        error: function () {
            $this.thenLoad();
        }
    });
};

/**
 * 成功后的继续操作
 * @param fun
 */
AreaListService.prototype.then = function (fun) {
    this.thenLoad = fun;
};

exports.AreaListService = AreaListService;