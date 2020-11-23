import Editor from "wangeditor"
import ColorList from "~/assets/json/color-list.json"

import "~/assets/sass/font-color.scss"

const { $, DropListMenu } = Editor

const option = {
    link: true,
    checkLink: function (src) {
        return true
    },
    attr: function () {},
}

class FontColor extends DropListMenu {
    constructor(editor) {
        const elem = $(`<div class="w-e-menu"><i class="icon-magic-wand"></i></div>`)
        // 颜色列表配置项
        const listOpton = {
            width: 252,
            title: "字体颜色",
            // true：列表项 display: inline-block;
            // false：列表项 display: block;
            // 默认值：false
            type: true,
            list: ColorList.map((color) => ({
                $elem: $(`<i style="background-color: ${color};" class="color-list-item"></i>`),
                value: color,
            })),
            clickHandler(color) {
                editor.cmd.do("foreColor", color)
            },
        }
        super(elem, editor, listOpton)
    }

    tryChangeActive() {}
}

/**
 * 将图片工具菜单注册到编辑器
 * @param {wangEditor} editor wangEditor 实例
 */
export default function registerSupMenu(editor) {
    const key = "custom-font-color"

    editor.menus.extend(key, FontColor)

    if (editor.config.menus.indexOf(key) === -1) {
        editor.config.menus.push(key)
    }
}
