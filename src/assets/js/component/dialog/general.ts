/// <reference path="../../../../typings/jquery/jquery.d.ts"/>

"use strict";

import {ViewManager} from "../window/view-manager";
import {Ripple} from "../window/animation/ripple";
import {AnimationAdapterInterface} from "../window/view-interface";
import {isMobile} from "../util/browser";
import * as $ from 'jquery';

/**
 * 提示弹层
 * @param content 内容
 * @param title 标题
 * @param event 鼠标事件，用于确定释放位置
 */
export function general(content:string, title?:string, event?:MouseEvent) {
    var general:General = new General();
    general.setContent(content).setTitle(title).setEvent(event);
    general.open();
}

export class General extends ViewManager {

    /**
     * 动画适配器
     */
    protected animationAdapter:AnimationAdapterInterface;

    protected contentDocument:any;

    protected view:{
        toolbar?:HTMLDivElement,
        title?:HTMLSpanElement,
        closeButton?:HTMLSpanElement,
        body?:HTMLDivElement
    } = {};

    protected classPrefix = 'general-view';
    protected content = "(null)";
    protected title = '提示信息';

    constructor() {
        super();
        this.animationAdapter = new Ripple(this);
    }

    /**
     * 设置内容
     * @param content
     * @returns {General}
     */
    public setContent(content) {
        if (content !== undefined)
            this.content = content;
        return this;
    };

    /**
     * 设置弹层标题
     * @param title
     * @returns {General}
     */
    public setTitle(title) {
        if (title !== undefined)
            this.title = title;
        return this;
    };

    /**
     * 创建内容视图
     */
    public createView() {

        var view = $(this.viewManager.view);
        var _this = this;
        this.view.toolbar = document.createElement('div');
        this.view.title = document.createElement('span');
        this.view.closeButton = document.createElement('span');
        this.view.body = document.createElement('div');
        var toolbarHeight = 50;

        this.view.toolbar.className = this.getClassPrefix() + 'toolbar';
        this.view.title.className = this.getClassPrefix() + 'title';
        this.view.closeButton.className = this.getClassPrefix() + 'close';
        this.view.body.className = this.getClassPrefix() + 'body';

        this.view.toolbar.style.width = '100%';
        this.view.toolbar.style.height = toolbarHeight + 'px';
        this.view.title.innerHTML = this.title;
        this.view.title.style.cssFloat = 'left';

        this.view.closeButton.innerHTML = 'x';
        this.view.closeButton.style.cssFloat = 'right';

        this.view.body.style.margin = '5px';
        this.view.body.innerHTML = this.content;
        this.view.body.style.height = (this.coordinateParameter.bearingHeight - (toolbarHeight + 10)) + 'px';

        this.view.toolbar.appendChild(this.view.title);
        this.view.toolbar.appendChild(this.view.closeButton);
        this.viewManager.view.appendChild(this.view.toolbar);
        this.viewManager.view.appendChild(this.view.body);

        _this.viewManager.background.onclick = function () {
            _this.close();
        };
        _this.view.closeButton.onclick = function () {
            _this.close();
        };

        if (!isMobile()) {
            view.css({opacity: 0, marginTop: 3});
            setTimeout(function () {
                view.animate({opacity: 1, marginTop: 0}, _this.time * (4 / 3));
            }, this.time * (1 / 3));
        }
    };

}