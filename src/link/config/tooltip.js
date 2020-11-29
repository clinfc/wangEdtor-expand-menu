/**
 * @deprecated 绑定 tooltip
 */

import Editor from "wangeditor"
import { createPanel, deleteLink } from "./fns"

const { $, Tooltip } = Editor

function craeteShowHideTooltipCallback(editor, menu) {
    let tooltip

    function showTooltip(linkElem) {
        const config = [
            {
                $elem: $(`<span>取消链接</span>`),
                onClick: function (editor, linkElem) {
                    deleteLink(editor)
                    return true
                },
            },
            {
                $elem: $(`<span>编辑链接</span>`),
                onClick: function () {
                    createPanel(menu)
                    return true
                },
            },
        ]

        tooltip = new Tooltip(editor, linkElem, config)
        tooltip.create()
    }

    function hideTooltip() {
        if (tooltip) {
            tooltip.remove()
            tooltip = null
        }
    }

    return {
        showTooltip,
        hideTooltip,
    }
}

export default function bindTooltip(editor, menu) {
    const { showTooltip, hideTooltip } = craeteShowHideTooltipCallback(editor, menu)

    // 点击链接元素是，显示 tooltip
    editor.txt.eventHooks.linkClickEvents.push(showTooltip)

    // 点击其他地方，或者滚动时，隐藏 tooltip
    editor.txt.eventHooks.clickEvents.push(hideTooltip)
    editor.txt.eventHooks.keyupEvents.push(hideTooltip)
    editor.txt.eventHooks.toolbarClickEvents.push(hideTooltip)
    editor.txt.eventHooks.menuClickEvents.push(hideTooltip)
    editor.txt.eventHooks.textScrollEvents.push(hideTooltip)
}
