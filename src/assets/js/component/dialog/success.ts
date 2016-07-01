/// <reference path="../../../../typings/jquery/jquery.d.ts"/>

"use strict";

import {ViewManager} from "../window/view-manager";
import {Ripple} from "../window/animation/ripple";
import {AnimationAdapterInterface} from "../window/view-interface";
import {isMobile} from "../util/browser";
import * as $ from 'jquery';

/**
 * 成功提示弹层
 * @param content 内容
 * @param title 标题
 * @param event 鼠标事件，用于确定释放位置
 * @param success 成功事件
 * @param style 样式
 */
export function success(content:string, title?:string, event?:MouseEvent,
                      success?:Function, style?:{confirmButtonText?:string, cancelButtonText?:string}) {
    var style = style || {};
    var successDialog:Success = new Success();
    successDialog.setContent(content).setTitle(title).setEvent(event);
    successDialog.success(success).error(success);
    successDialog.setCancelButtonText(style.cancelButtonText);
    successDialog.setConfirmButtonText(style.confirmButtonText);
    successDialog.open();
}

export class Success extends ViewManager {

    /**
     * 动画适配器
     */
    protected animationAdapter:AnimationAdapterInterface;

    protected contentDocument:any;

    protected view:{
        toolbar?:HTMLDivElement,
        operation?:HTMLDivElement,
        title?:HTMLSpanElement,
        body?:HTMLDivElement,
        successButton?:HTMLDivElement,
        errorButton?:HTMLDivElement
    } = {};

    protected classPrefix = 'success-view';
    protected content = "(null)";
    protected title = '提示信息';
    protected height = 140;
    protected maxWidth = 350;
    protected top = 150;
    protected successEvent = undefined;
    protected errorEvent = undefined;
    protected promptText = '确认';
    protected cancelText = '取消';

    constructor() {
        super();
        this.animationAdapter = new Ripple(this);
    }

    /**
     * 设置内容
     * @param content
     * @returns {Success}
     */
    public setContent(content) {
        if (content !== undefined)
            this.content = content;
        return this;
    };

    /**
     * 设置弹层标题
     * @param title
     * @returns {Success}
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
        this.view.operation = document.createElement('div');
        this.view.title = document.createElement('span');
        this.view.body = document.createElement('div');
        this.view.successButton = document.createElement('div');
        this.view.errorButton = document.createElement('div');
        var operationHeight = 50;

        this.view.operation.className = this.getClassPrefix() + 'operation';
        this.view.title.className = this.getClassPrefix() + 'title';
        this.view.successButton.className = this.getClassPrefix() + 'success';
        this.view.body.className = this.getClassPrefix() + 'body';

        this.view.title.innerHTML = this.title;
        this.view.title.style.cssFloat = 'left';

        this.view.body.innerHTML = this.content;
        this.view.body.style.height = (this.coordinateParameter.bearingHeight - (operationHeight + 30)) + 'px';

        this.view.operation.style.height = operationHeight + 'px';
        this.view.operation.style.width = '100%';

        this.view.successButton.innerHTML = this.promptText;

        this.view.operation.appendChild(this.view.successButton);
        this.viewManager.view.appendChild(this.view.body);
        this.viewManager.view.appendChild(this.view.operation);

        this.view.successButton.onclick = function () {
            if (_this.successEvent) _this.successEvent();
            _this.close();
        };

        this.viewManager.background.onclick = function () {
            if (_this.successEvent) _this.successEvent();
            _this.close();
        };

        if (!isMobile()) {
            view.css({opacity: 0, marginTop: 3});
            setTimeout(function () {
                view.animate({opacity: 1, marginTop: 0}, _this.time * (4 / 3));
            }, this.time * (1 / 30));
        }
    };

    public success(success) {
        if (success !== undefined)
            this.successEvent = success;
        return this;
    };

    public error(error) {
        if (error !== undefined)
            this.errorEvent = error;
        return this;
    };

    public setConfirmButtonText(text) {
        if (text !== undefined)
            this.promptText = text;
    };

    public setCancelButtonText(text) {
        if (text !== undefined)
            this.cancelText = text;
    };

}