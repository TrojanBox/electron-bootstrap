var uuidGenerator = require('./uuid.generator');

/**
 * 成员生成器
 * @param template
 * @param config
 * @constructor
 */
var ElementGenerator = function (template, config) {
    this.containerId = undefined;
    this.idMapping = {};
    this.root = {};
    this.template = template;
    var elementGen = function (sO, template, conf, root, mapping) {
        if (root == undefined) sO = {sO: sO};
        var tac = conf ? conf : config;
        for (var i in tac[template].element) {
            if (tac[template].element.hasOwnProperty(i)) {
                var object = document.createElement(tac[template].element[i].tag);
                var uuid = uuidGenerator.uuidGenerator();
                object.id = uuid;
                if (tac[template].element[i].name) {
                    mapping[tac[template].element[i].name] = uuid;
                }
                if (tac[template].element[i].className) {
                    object.className = tac[template].element[i].className;
                }
                if (tac[template].element[i].name) {
                    object.setAttribute('data-tag-name', tac[template].element[i].name);
                }
                if (tac[template].element[i].attribute) {
                    for (var a in tac[template].element[i].attribute) {
                        if (tac[template].element[i].attribute.hasOwnProperty(a)) {
                            object.setAttribute(a, tac[template].element[i].attribute[a]);
                        }
                    }
                }
                if (tac[template].element[i].style) {
                    for (var s in tac[template].element[i].style) {
                        if (tac[template].element[i].style.hasOwnProperty(s)) {
                            object.style[s] = tac[template].element[i].style[s];
                        }
                    }
                }
                if (tac[template].element[i].innerHTML) {
                    object.innerHTML = tac[template].element[i].innerHTML;
                }
                if (tac[template].element) elementGen(object, i, tac[template].element, false, mapping);
            }
            sO.appendChild(object);
        }
        return object;
    };
    this.elementGen = elementGen;
};

/**
 * 设置成员放置容器
 * @param id
 * @returns {ElementGenerator}
 */
ElementGenerator.prototype.setContainer = function (id) {
    this.containerId = id;
    return this;
};

/**
 * 生成
 * @param conf
 * @returns {{root: *, mapping: {}}}
 */
ElementGenerator.prototype.generator = function (conf) {
    var mapping = {};
    var root;
    root = this.elementGen(document.getElementById(this.containerId), this.template, conf, true, mapping);
    this.root = root;
    this.idMapping = mapping;
    return {
        root: root,
        mapping: mapping
    }
};

/**
 * 取得ID映射列表
 * @returns {{}|*}
 */
ElementGenerator.prototype.getIdMapping = function () {
    return this.idMapping;
};

/**
 * 取得跟
 * @returns {{}|*}
 */
ElementGenerator.prototype.getRoot = function () {
    return this.root;
};

exports.ElementGenerator = ElementGenerator;