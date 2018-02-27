package modules

import geb.Module
import geb.navigator.Navigator

class HeaderModule extends Module {
    static content = {
        eaoLogo { $("header div.brand-container") }
        navigationContainer { $("#mainNav") }
    }

    void clickMenuItem(Map<String, Object> itemSelector, Map<String, Object> subItemSelector) {
        def item = navigationContainer.children("ul").children(itemSelector, "li")
        interact {
          moveToElement(item)
        }

        def subItem = item.children("div").children("a").children(subItemSelector, "strong")
        if ( subItem != null && subItem.displayed ) {
          interact {
            moveToElement(subItem)
          }
          subItem.click()
        } else {
          item.click()
        }
    }
}
