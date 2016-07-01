"use strict";

/**
 * 是否是手机浏览器
 * @returns {boolean}
 */
export function isMobile() {
    var userAgent:any = navigator.userAgent.toLowerCase();
    var bIsIPad = ("ipad" == userAgent.match(/ipad/i));
    var bIsIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = userAgent.match(/midp/i) == "midp";
    var bIsUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = userAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = userAgent.match(/android/i) == "android";
    var bIsCE = userAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = userAgent.match(/windows mobile/i) == "windows mobile";
    return (bIsIPad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
}

/**
 * 取得IE版本
 * @returns {boolean|number}
 */
export function getIeVersion():(boolean|number) {
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+;/gi;
    if (agent.indexOf("msie") > 0) {
        var version = agent.match(regStr_ie);
        var result = version.toString().replace(/[^0-9.]/ig,"");
        if (result === undefined) {
            return false;
        }
        return parseInt(result);
    }
    return false;
}