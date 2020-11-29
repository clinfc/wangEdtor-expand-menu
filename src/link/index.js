/**
 * @deprecated 超链接
 */

import Editor from "wangeditor"
import bindTooltip from "./config/tooltip.js"
import { checkActive, createPanel } from "./config/fns.js"

const { $, PanelMenu } = Editor

class Link extends PanelMenu {
    constructor(editor) {
        const elem = $(`<div class="w-e-menu"><i class="w-e-icon-link"></i></div>`)
        super(elem, editor)

        bindTooltip(editor, this)
    }

    clickHandler() {
        createPanel(this)
    }

    tryChangeActive() {
        if (checkActive(this.editor)) {
            this.active()
        } else {
            this.unActive()
        }
    }
}

/**
 * 将超链接菜单注册到编辑器
 * @param {wangEditor} editor wangEditor 实例
 */
export default function registerLinkMenu(editor) {
    const key = "custom-link"

    editor.menus.extend(key, Link)

    if (editor.config.menus.indexOf(key) === -1) {
        editor.config.menus.push(key)
    }

    // 添加测试用例
    editor.config.linkList = [
        {
            text: "百度",
            url: "http://baidu.com",
        },
        {
            text: "UC",
            url: "http://uc123.com",
        },
    ]
}
