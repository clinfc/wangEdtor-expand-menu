/**
 * @deprecated 检查 选区/光标 是否包含在超链接中
 */

import Editor from "wangeditor"
import createPanelConfig from "./tab-config"

const { $, Panel, Tooltip } = Editor

export function checkActive(editor) {
    const elem = editor.selection.getSelectionContainerElem()

    return elem && elem.getNodeName() === "A"
}

/**
 * 执行插入链接操作
 * @param {wangEditor} editor
 * @param {Object} formData 插入的链接的信息
 */
export function insertLink(editor, formData) {
    if (checkActive(editor)) {
        const link = editor.selection.getSelectionContainerElem()
        editor.selection.createRangeByElem(link)
        editor.selection.restoreSelection()
    }
    editor.cmd.do("insertHTML", `<a href="${formData.url}" target="${formData.target}">${formData.text}</a>`)
}

/**
 * 删除超链接
 * @param {wangEditor} editor
 */
export function deleteLink(editor) {
    if (checkActive(editor)) {
        const link = editor.selection.getSelectionContainerElem()
        editor.selection.createRangeByElem(link)
        editor.selection.restoreSelection()

        editor.cmd.do("insertHTML", `<span>${link.text()}</span>`)
    }
}

/**
 * 创建 panel
 * @param {PanelMenu} menu 当前超链接的菜单实例
 */
export function createPanel(menu) {
    const config = createPanelConfig(menu.editor)
    console.log(config)
    new Panel(menu, config).create()
}
