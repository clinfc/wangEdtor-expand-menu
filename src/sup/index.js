import Editor from "wangeditor"

import "~/assets/sass/index.scss"

// 获取必要的变量，这些在下文中都会用到
const { $, BtnMenu } = Editor

/**
 * 验证光标所在位置是否处于 sup 标签中
 * @param {wangEditor} editor wangEditor 实例
 */
function checkActive(editor) {
    const elem = editor.selection.getSelectionContainerElem()
    return elem && elem.getNodeName() === "SUP" ? true : false
}

function selectElem(editor) {
    const elem = editor.selection.getSelectionContainerElem()

    if (elem) {
        editor.selection.createRangeByElem(elem)
        editor.selection.restoreSelection()
    }
}

class Sup extends BtnMenu {
    constructor(editor) {
        const elem = $(`<div class="w-e-menu"><i class="icon-superscript"></i></div>`)
        super(elem, editor)
    }

    clickHandler() {
        const editor = this.editor
        const isEmpty = editor.selection.isSelectionEmpty()

        // 光标在 sup 标签中（取消）
        if (checkActive(editor)) {
            const elem = editor.selection.getSelectionContainerElem()
            if (elem) {
                editor.selection.createRangeByElem(elem)
                editor.cmd.do("insertHTML", elem.text())
            }
        }
        // 光标不在 sup 中（设置）
        else {
            // 默认值，无选区时的值
            let text = "2"

            // 如果有选区
            if (!isEmpty) {
                text = editor.selection.getSelectionText()
            }

            editor.cmd.do("insertHTML", `<sup>${text}</sup>&#8203`)
        }
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
 * 将上标菜单注册到编辑器
 * @param {wangEditor} editor wangEditor 实例
 */
export default function registerSupMenu(editor) {
    const key = "sup"

    editor.menus.extend(key, Sup)

    if (editor.config.menus.indexOf(key) === -1) {
        editor.config.menus.push(key)
    }
}
