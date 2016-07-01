/// <reference path="../../typings/tsd.d.ts" />

import * as path from 'path';

/**
 * 项目跟目录
 * @type {string}
 */
export const APP_ROOT_PATH = path.join(__dirname, '..', '..');

/**
 * 项目发布目录
 * @type {string}
 */
export const APP_RELEASE_PATH = path.join(APP_ROOT_PATH, 'release');

/**
 * 项目资源目录
 * @type {string}
 */
export const APP_ASSETS_PATH = path.join(APP_RELEASE_PATH, 'assets');

/**
 * 模板资源目录
 * @type {string}
 */
export const APP_TEMPLATE_PATH = path.join(APP_ASSETS_PATH, 'template');