"use strict";

import {AnimationAdapterInterface} from "../view-interface.ts";
import {isMobile} from "../../util/browser.ts";
import {cssAttributeSupport} from "../../util/style-sheets.ts";
import {ViewManager} from "../view-manager.ts";

/**
 * 波浪动画
 */
export class Ripple implements AnimationAdapterInterface {

    protected context:ViewManager;

    constructor(context:ViewManager) {
        this.context = context;
    }

    /**
     * 标准动画
     * @param coordinateParameter
     */
    public basicOpenAnimation(coordinateParameter:any) {
        this.context.viewManager.body.style.background = 'rgb(255, 255, 255)';
        this.context.viewManager.body.style.borderRadius = '3px';
        if (!isMobile()) {
            this.context.viewManager.body.style.boxShadow = '1px 2px 10px 0px rgba(0, 0, 0, 0.6)';
        }
        this.context.viewManager.body.style.width = coordinateParameter.bearingWidth + 'px';
        this.context.viewManager.body.style.height = coordinateParameter.bearingHeight + 'px';
        this.context.viewManager.body.appendChild(this.context.viewManager.view);
        $(this.context.viewManager.background).css({
            'display': 'block'
        });
        $(this.context.viewManager.body).css({'opacity': 0, 'marginTop': coordinateParameter.offsetY + 3})
            .animate({opacity: 1, 'marginTop': coordinateParameter.offsetY}, this.context.time);
    };

    /**
     * 高级动画
     * @param coordinateParameter
     * @returns {boolean}
     */
    public seniorOpenAnimation(coordinateParameter:any) {
        var css3Support:boolean = cssAttributeSupport('transition');
        var _this = this;
        var rectangleRightCritical:number = coordinateParameter.bearingWidth + coordinateParameter.offsetX;
        var rectangleBottomCritical:number = coordinateParameter.bearingHeight + coordinateParameter.offsetY;

        if (this.context.event.clientX - 20 > coordinateParameter.offsetX) {

        }

        var coordinateDeterminationX:number = (
            ((this.context.event.clientX - 20 > coordinateParameter.offsetX) ? 1 : 0)
            ^ ((this.context.event.clientX + 20 < rectangleRightCritical) ? 1 : 0)
        );
        var coordinateDeterminationY:any = (
            ((this.context.event.clientY - 20 > coordinateParameter.offsetY) ? 1 : 0)
            ^ ((this.context.event.clientY + 20 < rectangleBottomCritical) ? 1 : 0)
        );

        if (0 != coordinateDeterminationX
            || 0 != coordinateDeterminationY) {
            this.context.selectAnimationAdapter = ViewManager.ANIMATION_TYPE_BASIC;
            this.basicOpenAnimation(coordinateParameter);
            return true;
        }

        var abstractRectangleRightTopOffsetX:number = this.context.event.clientX - coordinateParameter.offsetX;
        var abstractRectangleRightTopOffsetY:number = this.context.event.clientY - coordinateParameter.offsetY;

        // 最长角判断
        var topLength:number = abstractRectangleRightTopOffsetY;
        var bottomLength:number = coordinateParameter.bearingHeight - abstractRectangleRightTopOffsetY;
        var leftLength:number = abstractRectangleRightTopOffsetX;
        var rightLength:number = coordinateParameter.bearingWidth - abstractRectangleRightTopOffsetX;

        // 最长宽高计算
        var lengthY:number = (topLength > bottomLength) ? topLength : bottomLength;
        var lengthX:number = (leftLength > rightLength) ? leftLength : rightLength;

        // 圆形半径长度
        var bevelAngle:number = (Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)) + 10);
        var abstractContentRectangleRelativeCoordinatePositionY:number = (bevelAngle - topLength);
        var abstractContentRectangleRelativeCoordinatePositionX:number = (bevelAngle - leftLength);

        var abstractRectangle = document.createElement('div');
        if (css3Support) {
            abstractRectangle.style.transition = 'all ' + this.context.time + 'ms ease-out';
        }
        abstractRectangle.style.width = '0px';
        abstractRectangle.style.height = '0px';
        abstractRectangle.style.position = 'absolute';
        abstractRectangle.style.top = this.context.event.clientY + 'px';
        abstractRectangle.style.left = this.context.event.clientX + 'px';
        abstractRectangle.style.borderRadius = '100%';
        abstractRectangle.style.overflow = 'hidden';

        var abstractContentRectangle:HTMLDivElement = document.createElement('div');
        abstractContentRectangle.style.marginLeft = -(leftLength) + 'px';
        abstractContentRectangle.style.marginTop = -(topLength) + 'px';
        if (css3Support) {
            abstractContentRectangle.style.transition = 'all ' + this.context.time + 'ms ease-out';
        }
        abstractContentRectangle.style.width = coordinateParameter.bearingWidth + 'px';
        abstractContentRectangle.style.height = coordinateParameter.bearingHeight + 'px';
        abstractContentRectangle.style.background = 'rgb(255, 255, 255)';
        abstractContentRectangle.style.borderRadius = '3px';
        if (!isMobile()) {
            _this.context.viewManager.body.style.boxShadow = '1px 2px 10px 0px rgba(0, 0, 0, 0)';
        }
        abstractContentRectangle.style.overflow = 'hidden';

        abstractRectangle.appendChild(abstractContentRectangle);
        this.context.viewManager.body.appendChild(abstractRectangle);

        this.context.viewManager.body.style.width = coordinateParameter.bearingWidth + 'px';
        this.context.viewManager.body.style.height = coordinateParameter.bearingHeight + 'px';
        this.context.viewManager.body.style.marginTop = coordinateParameter.offsetY + 'px';
        this.context.viewManager.body.style.marginLeft = coordinateParameter.offsetX + 'px';
        abstractContentRectangle.appendChild(this.context.viewManager.view);

        var originalStyle = function () {
            abstractRectangle.parentNode.removeChild(abstractRectangle);
            _this.context.viewManager.body.style.background = 'rgb(255, 255, 255)';
            _this.context.viewManager.body.style.borderRadius = '3px';
            _this.context.viewManager.body.style.boxShadow = '1px 2px 10px 0px rgba(0, 0, 0, 0.6)';
            _this.context.viewManager.body.style.width = coordinateParameter.bearingWidth + 'px';
            _this.context.viewManager.body.style.height = coordinateParameter.bearingHeight + 'px';
            _this.context.viewManager.body.style.marginTop = coordinateParameter.offsetY + 'px';
            _this.context.viewManager.body.style.marginLeft = 'auto';
            _this.context.viewManager.body.style.marginRight = 'auto';
            _this.context.viewManager.body.appendChild(_this.context.viewManager.view);
        };

        if (!css3Support) { // 如果不支持 css3 动画的话
            $(abstractRectangle).animate({
                width: (bevelAngle * 2),
                height: (bevelAngle * 2),
                marginLeft: -(bevelAngle) + 'px',
                marginTop: -(bevelAngle) + 'px'
            }, this.context.time);
            $(abstractContentRectangle).animate({
                marginTop: abstractContentRectangleRelativeCoordinatePositionY,
                marginLeft: abstractContentRectangleRelativeCoordinatePositionX
            }, this.context.time, function () {
                originalStyle();
            });
            $(this.context.viewManager.background).css({'display': 'block', 'opacity': 1});
        } else {
            setTimeout(function () {
                abstractRectangle.style.width = (bevelAngle * 2) + 'px';
                abstractRectangle.style.height = (bevelAngle * 2) + 'px';
                abstractRectangle.style.marginLeft = -(bevelAngle) + 'px';
                abstractRectangle.style.marginTop = -(bevelAngle) + 'px';
                abstractContentRectangle.style.marginTop = abstractContentRectangleRelativeCoordinatePositionY + 'px';
                abstractContentRectangle.style.marginLeft = abstractContentRectangleRelativeCoordinatePositionX + 'px';
            }, 20);
            this.context.viewManager.background.style.display = 'block';
            this.context.viewManager.background.style.opacity = '1';
            setTimeout(function () {
                originalStyle();
            }, this.context.time);
        }
    };

    /**
     * 标准关闭动画
     * @param coordinateParameter
     */
    public basicCloseAnimation(coordinateParameter?:any) {
        var _this = this;
        $(_this.context.viewManager.background).animate({'opacity': 0}, 100, function () {
            _this.context.viewManager.background.parentNode.removeChild(_this.context.viewManager.background);
        });
    };

    /**
     * 高级关闭动画
     * @param coordinateParameter
     */
    public seniorCloseAnimation(coordinateParameter?:any) {
        var _this = this;
        $(_this.context.viewManager.background).animate({'opacity': 0}, 200, function () {
            _this.context.viewManager.background.parentNode.removeChild(_this.context.viewManager.background);
        });
    };
}