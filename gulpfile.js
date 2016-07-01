var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var webpack = require('webpack');
var gUtil = require('gulp-util');
var webpackConf = require('./webpack.config');
var typescript = require('gulp-typescript');
var path = require('path');
var makeMapping = require('./src/webpack/make-mapping.gulp');

var src = process.cwd() + '/src/assets';
var assets = process.cwd() + '/assets';

// js 检查
gulp.task('hint', ['build:typescript'], function () {
    var jshint = require('gulp-jshint');
    var stylish = require('jshint-stylish');
    return gulp.src([
        '!' + src + '/js/lib/**/*.js',
        src + '/js/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// webpack 项目构建
gulp.task('build:webpack', [], function (done) {
    webpack(webpackConf, function (err, stats) {
        if (err) throw new gUtil.PluginError('webpack', err);
        // 生成映射文件
        var paths = [];
        var obj = stats.compilation.assets;
        for (var i in obj) if (obj.hasOwnProperty(i)) paths.push(i);
        makeMapping(paths, webpackConf);

        gUtil.log('[webpack]', stats.toString({colors: true}));
        done();
    });
});

// 构建 web ts 文件
gulp.task('build:web:typescript', function () {
    var tsProject = ts.createProject('tsconfig.json');
    gulp.src('src/assets/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest(src));
});

// 构建 app ts 文件
gulp.task('build:app:typescript', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src('src/app/**/*.ts')
        .pipe(ts(tsProject));
    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/app'))
    ]);
});

gulp.task('build:all', ['build:app:typescript', 'build:webpack'], function () {
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch('lib/*.ts', ['scripts']);
});
