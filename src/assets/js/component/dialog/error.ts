"use strict";

import {ViewManager} from "../window/view-manager.ts";
import {Ripple} from "../window/animation/ripple.ts";
import {AnimationAdapterInterface} from "../window/view-interface.ts";
import {isMobile} from "../util/browser.ts";


/**
 * 错误提示弹层
 * @param content 内容
 * @param title 标题
 * @param event 鼠标事件，用于确定释放位置
 * @param success 成功事件
 * @param error 失败事件
 * @param style 样式
 */
export function error(content:string, title?:string, event?:MouseEvent,
                      success?:Function, error?:Function,
                      style?:{confirmButtonText?:string, cancelButtonText?:string}) {
    var style = style || {};
    var errorDialog:Error = new Error();
    errorDialog.setContent(content).setTitle(title).setEvent(event);
    errorDialog.success(success).error(error);
    errorDialog.setCancelButtonText(style.cancelButtonText);
    errorDialog.setConfirmButtonText(style.confirmButtonText);
    errorDialog.open();
}

/**
 * 错误弹层
 */
export class Error extends ViewManager {

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

    protected classPrefix:any = 'error-view';
    protected content:any = "(null)";
    protected title:any = '提示信息';
    protected height:any = 140;
    protected maxWidth:any = 350;
    protected top:any = 150;
    protected successEvent:any = undefined;
    protected errorEvent:any = undefined;
    protected promptText:any = '确认';
    protected cancelText:any = '取消';

    constructor() {
        super();
        this.animationAdapter = new Ripple(this);
    }

    /**
     * 设置内容
     * @param content
     * @returns {Error}
     */
    public setContent(content:any) {
        if (content !== undefined)
            this.content = content;
        return this;
    };

    /**
     * 设置弹层标题
     * @param title
     * @returns {Error}
     */
    public setTitle(title:any) {
        if (title !== undefined)
            this.title = title;
        return this;
    };

    /**
     * 创建内容视图
     */
    public createView() {

        var view = $(this.viewManager.view);
        var _this:Error = this;
        this.view.operation = document.createElement('div');
        this.view.title = document.createElement('span');
        this.view.body = document.createElement('div');
        this.view.successButton = document.createElement('div');
        this.view.errorButton = document.createElement('div');
        var toolbarHeight = 50;
        var operationHeight = 50;

        this.view.operation.className = this.getClassPrefix() + 'operation';
        this.view.title.className = this.getClassPrefix() + 'title';
        this.view.successButton.className = this.getClassPrefix() + 'success';
        this.view.errorButton.className = this.getClassPrefix() + 'error';
        this.view.body.className = this.getClassPrefix() + 'body';

        this.view.title.innerHTML = this.title;
        this.view.title.style.cssFloat = 'left';

        this.view.body.innerHTML = this.content;
        this.view.body.style.height = (this.coordinateParameter.bearingHeight - (operationHeight + 30)) + 'px';

        this.view.operation.style.height = operationHeight + 'px';
        this.view.operation.style.width = '100%';

        this.view.successButton.innerHTML = this.promptText;
        this.view.errorButton.innerHTML = this.cancelText;

        this.view.operation.appendChild(this.view.errorButton);
        this.view.operation.appendChild(this.view.successButton);
        this.viewManager.view.appendChild(this.view.body);
        this.viewManager.view.appendChild(this.view.operation);

        this.view.successButton.onclick = function () {
            if (_this.successEvent) _this.successEvent();
            _this.close();
        };

        this.view.errorButton.onclick = function () {
            if (_this.errorEvent) _this.errorEvent();
            _this.close();
        };

        if (!isMobile()) {
            view.css({opacity: 0, marginTop: 3});
            setTimeout(function () {
                view.animate({opacity: 1, marginTop: 0}, _this.time * (4 / 3));
            }, this.time * (1 / 30));
        }
    };

    /**
     * 成功事件回调处理
     * @param success
     * @returns {Error}
     */
    public success(success:any) {
        if (success !== undefined)
            this.successEvent = success;
        return this;
    };

    /**
     * 失败事件回调处理
     * @param error
     * @returns {Error}
     */
    public error(error:any) {
        if (error !== undefined)
            this.errorEvent = error;
        return this;
    };

    public setConfirmButtonText(text:any) {
        if (text !== undefined)
            this.promptText = text;
        return this;
    };

    public setCancelButtonText(text:any) {
        if (text !== undefined)
            this.cancelText = text;
        return this;
    };
}