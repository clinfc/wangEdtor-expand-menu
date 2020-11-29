/**
 * @deprecated 创建 panel 配置项
 */

import { checkActive, insertLink } from "./fns"

/**
 * 生成唯一字符串
 */
function uuid(prefix = "prefix") {
    return [prefix, Math.random().toString(16).slice(2)].join("-")
}

/**
 * 获取光标处的超链接信息
 * @param {wangEditor} editor
 */
function getLinkData(editor) {
    if (checkActive(editor)) {
        // 当前光标处于超链接标签中
        const elem = editor.selection.getSelectionContainerElem()
        return {
            text: elem.text(),
            url: elem.attr("href"),
            target: elem.attr("target"),
        }
    } else {
        // 当前 光标/选区 不处于超链接中
        if (editor.selection.isSelectionEmpty()) {
            return {}
        } else {
            return {
                text: editor.selection.getSelectionText(),
            }
        }
    }
}

/**
 * 插入超链接 tab 栏的配置
 */
function insertLinkConfig(editor) {
    const formId = uuid("form")
    const submitId = uuid("submit")
    const { text, url, target } = getLinkData(editor)
    const tab = {
        title: "插入超链接",
        tpl: `<form class="link-form" id="${formId}">
                <div class="form-item">
                    <input type="text" name="text" value="${text || ""}" placeholder="请出入超链接文本" />
                </div>
                <div class="form-item">
                    <input type="text" name="url" value="${url || ""}" placeholder="请出入超链接" />
                </div>
                <div class="form-item">
                    <select name="target">
                        <option ${target == "_self" ? "selected" : ""} value="_self">self</option>
                        <option ${target == "_blank" ? "selected" : ""} value="_blank">blank</option>
                        <option ${target == "_parent" ? "selected" : ""} value="_parent">parent</option>
                        <option ${target == "_top" ? "selected" : ""} value="_top">top</option>
                    </select>
                </div>
                <div class="form-submit">
                    <button type="button" id="${submitId}">插入超链接</button>
                </div>
            </form>`,
        events: [
            {
                selector: `#${submitId}`,
                type: "click",
                fn: function (e) {
                    const form = document.querySelector(`#${formId}`)

                    const data = {}
                    Array.prototype.forEach.call(form, (el) => {
                        if (el.name) {
                            data[el.name] = el.value
                        }
                    })

                    // 执行插入操作
                    insertLink(editor, data)

                    return true
                },
            },
        ],
    }

    return tab
}

/**
 * 自定义超链接列表
 * @param {wangEditor} editor
 */
function customLinkList(editor) {
    const list = editor.config.linkList
    if (list && list.length) {
        const events = []
        const items = list
            .map(({ text, url, target }) => {
                if (!text || !url) {
                    return ``
                }
                const itemId = uuid("list-item")
                events.push({
                    selector: `#${itemId}`,
                    type: "click",
                    fn: function (e) {
                        const target = e.target

                        insertLink(editor, {
                            text: target.getAttribute("text"),
                            url: target.getAttribute("url"),
                            target: target.getAttribute("target"),
                        })

                        return true
                    },
                })
                return `<div class="link-list-item" id="${itemId}" url="${url}" text="${text}" target="${target || ""}" title="${url}">${text}</div>`
            })
            .join("")

        return {
            title: "预设超链接",
            tpl: `<div class="link-list">${items}</div>`,
            events: events,
        }
    }
    return {}
}

/**
 * 生成超链接 panel 的配置
 * @param {wangEditor} editor wangEditor 的实例
 */
export default function createPanelConfig(editor) {
    return {
        width: 300,
        height: 0,
        tabs: [insertLinkConfig(editor), customLinkList(editor)],
    }
}
