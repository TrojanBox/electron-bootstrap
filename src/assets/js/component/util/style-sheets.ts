"use strict";

/**
 * css 属性支持
 * @param style
 * @returns {boolean}
 */
export function cssAttributeSupport(style:string):boolean {
    var prefix:any = ['webkit', 'Moz', 'ms', 'o'],
        i:any,
        humpString:any = [],
        htmlStyle:CSSStyleDeclaration = <CSSStyleDeclaration>document.documentElement.style,
        _toHum = function (string:any) {
            return string.replace(/-(\w)/g, function ($0:any, $1:any) {
                return $1.toUpperCase();
            });
        };

    for (i in prefix) if (prefix.hasOwnProperty(i)) {
        humpString.push(_toHum(prefix[i] + '-' + style));
    }
    humpString.push(_toHum(style));

    for (i in humpString) if (humpString.hasOwnProperty(i)) {
        if (humpString[i] in htmlStyle) return true;
    }
    return false;
}