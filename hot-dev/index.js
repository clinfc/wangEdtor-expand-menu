// 热替换开发模式

import registerMenu from "../src/index.js"
import wangEditor from "wangeditor"

const editor = new wangEditor("#div1")

editor.config.menus = []
editor.config.showFullScreen = false

registerMenu(editor)

editor.create()
