"use strict";

import {ViewConfigSettings} from "./view-interface.ts";
import {ViewManagerInterface} from "./view-interface.ts";
import {CoordinateParameterInterface} from "./view-interface.ts";
import {AnimationAdapterInterface} from "./view-interface.ts";

/**
 * 视图管理器
 */
export abstract class ViewManager {

    /**
     * 动画类型 自动匹配
     * @type {number}
     */
    public static ANIMATION_TYPE_AUTO:number = 1;

    /**
     * 动画类型 高级动画
     * @type {number}
     */
    public static ANIMATION_TYPE_SENIOR:number = 2;

    /**
     * 动画类型 标准动画
     * @type {number}
     */
    public static ANIMATION_TYPE_BASIC:number = 3;

    /**
     * 动画释放位置 自动匹配释放位置
     * @type {number}
     */
    public static SINGULARITY_AUTO:number = 1;

    /**
     * 动画释放位置 中心释放
     * @type {number}
     */
    public static SINGULARITY_CENTER:number = 2;

    /**
     * 窗体宽，默认自适应
     * @type {number}
     */
    protected width:number = 0;

    /**
     * 窗体高，默认自适应
     * @type {number}
     */
    protected height:number = 0;

    /**
     * 窗体坐标TOP 默认自适应
     * @type {number}
     */
    protected top:number = 0;

    /**
     * 窗体坐标LEFT 默认自适应
     * @type {number}
     */
    protected left:number = 0;

    /**
     * 窗体最小高度
     * @type {number}
     */
    protected minHeight:number = 240;

    /**
     * 窗体最小宽度
     * @type {number}
     */
    protected minWidth:number = 320;

    /**
     * 窗体最大高度
     * @type {number}
     */
    protected maxHeight:number = 750;

    /**
     * 窗体最大宽度
     * @type {number}
     */
    protected maxWidth:number = 900;

    /**
     * 高度偏移量
     * @type {number}
     */
    protected offsetHeight:number = 60;

    /**
     * 宽度偏移量
     * @type {number}
     */
    protected offsetWidth:number = 50;

    /**
     * 自动适配屏幕大小
     * @type {boolean}
     */
    protected automaticAdaptation:boolean = false;

    /**
     * 动画自动适配，默认自动
     * @type {number}
     */
    protected animationAdaptation:number = ViewManager.ANIMATION_TYPE_AUTO;

    /**
     * 动画释放位置 默认自动
     * @type {number}
     */
    protected singularity:number = ViewManager.SINGULARITY_AUTO;

    /**
     * 窗体主体内容
     * @type {string}
     */
    protected content:string = 'null';

    /**
     * 窗体动画对象
     * @type {Object}
     */
    protected animationAdapter:AnimationAdapterInterface = null;

    /**
     * css class 前缀
     * @type {string}
     */
    protected classPrefix:string = "";

    /**
     * 坐标参数
     * @type {string}
     */
    protected coordinateParameter:CoordinateParameterInterface = {};

    /**
     * 动画适配器对象
     * @type {string}
     */
    public selectAnimationAdapter:number = 0;

    /**
     * 动画过渡时间
     * @type {number}
     */
    public time:number = 250;

    /**
     * 窗体事件对象
     * @type {Function}
     */
    public event:MouseEvent;

    /**
     * 窗体管理器
     * @type {Object}
     */
    public viewManager:ViewManagerInterface;

    /**
     * 配置文件
     * @param config
     */
    constructor(config?:ViewConfigSettings) {
        this.setConfig(config);
    }

    /**
     * 窗体配置
     * @param config
     */
    public setConfig(config:ViewConfigSettings) {
        var config:ViewConfigSettings = config || {};
        this.width = config.width || this.width;
        this.height = config.height || this.height;
        this.content = config.content || this.content;
        this.animationAdaptation = config.animationAdaptation || this.animationAdaptation;
        this.automaticAdaptation = config.automaticAdaptation || this.automaticAdaptation;
        this.time = config.time || this.time;
    }

    /**
     * 承载主体生成器
     * @returns {{background: HTMLDivElement, body: HTMLDivElement, view: HTMLDivElement}}
     * @constructor
     */
    protected viewGenerator():ViewManagerInterface {
        var background:HTMLDivElement = document.createElement('div');
        var contentBody:HTMLDivElement = document.createElement('div');
        var view:HTMLDivElement = document.createElement('div');

        background.style.display = 'none';
        background.style.position = 'fixed';
        background.style.top = '0';
        background.style.left = '0';
        background.style.width = '100%';
        background.style.height = '100%';
        background.style.zIndex = '20';
        try {background.style.background = 'rgba(0, 0, 0, 0.3)';} catch (e) {}
        contentBody.style.width = '0px';
        contentBody.style.height = '0px';
        contentBody.style.marginLeft = 'auto';
        contentBody.style.marginRight = 'auto';
        contentBody.style.marginTop = '0px';
        view.style.width = '100%';
        view.style.height = '100%';

        $(contentBody).click(function (event) {
            event.stopPropagation();
        });

        background.appendChild(contentBody);
        return {
            background: background,
            body: contentBody,
            view: view
        };
    };

    /**
     * 关闭适配器
     * @returns {boolean}
     */
    public openAnimationAutoAdapter() {
        var _this = this;
        this.coordinateParameter.bearingWidth = (this.width == 0) ? (function () {
            if (document.documentElement.clientWidth <= _this.minWidth) return _this.minWidth - _this.offsetWidth;
            if (document.documentElement.clientWidth >= _this.maxWidth) return _this.maxWidth - _this.offsetWidth;
            return document.documentElement.clientWidth - _this.offsetWidth;
        })() : this.width;
        this.coordinateParameter.bearingHeight = (this.height == 0) ? (function () {
            if (document.documentElement.clientHeight <= _this.minHeight) return _this.minHeight - _this.offsetHeight;
            if (document.documentElement.clientHeight >= _this.maxHeight) return _this.maxHeight - _this.offsetHeight;
            return document.documentElement.clientHeight - _this.offsetHeight;
        })() : this.height;

        if (this.top != 0) {
            this.coordinateParameter.offsetY = this.top;
        } else {
            this.coordinateParameter.offsetY = (document.documentElement.clientHeight - this.coordinateParameter.bearingHeight) / 2;
        }

        if (this.left != 0) {
            this.coordinateParameter.offsetX = this.left;
        } else {
            this.coordinateParameter.offsetX = (document.documentElement.clientWidth - this.coordinateParameter.bearingWidth) / 2;
        }

        if (this.event == undefined) {
            this.selectAnimationAdapter = ViewManager.ANIMATION_TYPE_BASIC;
            this.animationAdapter.basicOpenAnimation(this.coordinateParameter);
            return false;
        }

        switch (this.animationAdaptation) {
            case ViewManager.ANIMATION_TYPE_BASIC:
                this.selectAnimationAdapter = ViewManager.ANIMATION_TYPE_BASIC;
                this.animationAdapter.basicOpenAnimation(this.coordinateParameter);
                break;
            case ViewManager.ANIMATION_TYPE_SENIOR:
                this.selectAnimationAdapter = ViewManager.ANIMATION_TYPE_SENIOR;
                this.animationAdapter.seniorOpenAnimation(this.coordinateParameter);
                break;
            case ViewManager.ANIMATION_TYPE_AUTO:
            default:
                // var ieVersion = util.getIeVersion();
                var ieVersion:any = false;
                if (ieVersion === false || ieVersion > 8) {
                    this.selectAnimationAdapter = ViewManager.ANIMATION_TYPE_SENIOR;
                    this.animationAdapter.seniorOpenAnimation(this.coordinateParameter);
                } else {
                    this.selectAnimationAdapter = ViewManager.ANIMATION_TYPE_BASIC;
                    this.animationAdapter.basicOpenAnimation(this.coordinateParameter);
                }
                break;
        }
        return true;
    };

    /**
     * 关闭适配器
     */
    public closeAnimationAutoAdapter() {
        switch (this.selectAnimationAdapter) {
            case ViewManager.ANIMATION_TYPE_BASIC:
                this.animationAdapter.basicCloseAnimation(this.coordinateParameter);
                break;
            case ViewManager.ANIMATION_TYPE_SENIOR:
                this.animationAdapter.seniorCloseAnimation(this.coordinateParameter);
                break;
            default:
                this.animationAdapter.basicCloseAnimation(this.coordinateParameter);
                break;
        }
    };

    /**
     * 开启窗口
     */
    public open() {
        this.viewManager = this.viewGenerator();
        this.openAnimationAutoAdapter();
        this.createView();
        document.getElementsByTagName('body')[0].appendChild(this.viewManager.background);
    };

    /**
     * 关闭窗口
     */
    public close() {
        this.closeAnimationAutoAdapter();
    };

    /**
     * 设置鼠标事件，需要点击位置
     * @param event
     * @returns {ViewManager}
     */
    public setEvent(event:any) {
        this.event = event;
        return this;
    };

    /**
     * 设置类前缀
     * @param prefix
     * @returns {ViewManager}
     */
    public setClassPrefix(prefix:any) {
        this.classPrefix = prefix;
        return this;
    };

    /**
     * 取得类前缀
     * @returns {string}
     */
    public getClassPrefix() {
        if (this.classPrefix == null) return '';
        return this.classPrefix + '-';
    };

    /**
     * 创建视图内容
     */
    abstract createView():void;
}