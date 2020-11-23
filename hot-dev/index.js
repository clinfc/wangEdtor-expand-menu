// 热替换开发模式

import registerMenu from "../src/index.js"
import wangEditor from "wangeditor"

const editor = new wangEditor("#div1")

registerMenu(editor)

editor.create()
