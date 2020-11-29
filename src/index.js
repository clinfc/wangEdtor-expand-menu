import "~/assets/icon/index.css"

import registerSupMenu from "./sup"
import registerFontColorMenu from "./font-color"
import registerLinkMenu from "./link"

// 向外暴露注册菜单的接口
export default function registerMenu(e) {
    registerSupMenu(e)
    registerFontColorMenu(e)
    registerLinkMenu(e)
}
