"use strict";

/**
 * 视图配置
 */
export interface ViewConfigSettings {

    /**
     * 窗体宽
     */
    width?:number;

    /**
     * 窗体高
     */
    height?:number;

    /**
     * 内容
     */
    content?:string;

    /**
     * 动画适配器
     */
    animationAdaptation?:number;

    /**
     * 自动适配屏幕大小
     */
    automaticAdaptation?:boolean;

    /**
     * 动画过渡时间
     */
    time?:number;
}

/**
 * 视图生成对象
 */
export interface ViewManagerInterface {

    /**
     * 窗体背景对象
     */
    background: HTMLDivElement,

    /**
     * 窗体主体对象
     */
    body: HTMLDivElement,

    /**
     * 窗体视图对象
     */
    view: HTMLDivElement
}

/**
 * 坐标参数接口
 */
export interface CoordinateParameterInterface {
    bearingWidth?:number;
    bearingHeight?:number;
    offsetX?:number;
    offsetY?:number;
}

/**
 * 动画适配器接口
 */
export interface AnimationAdapterInterface {

    /**
     * 标准动画实现
     */
    basicOpenAnimation:any;

    /**
     * 高级动画实现
     */
    seniorOpenAnimation:any;

    basicCloseAnimation:any;

    seniorCloseAnimation:any;
}