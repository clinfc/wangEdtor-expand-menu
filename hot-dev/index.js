// 热替换开发模式

import registerExpandMenu from "../src/index.js"
import wangEditor from "wangeditor"

const editor = new wangEditor("#div1")

registerExpandMenu(editor)

editor.create()
