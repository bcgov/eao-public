package pages.app

import pages.base.BaseAppPage

class ProcessPage extends BaseAppPage {
  static at = { pageTitle.text().equals("Process & Procedures") }
  static url = "/process"
  static content = {
    pageTitle { $("app-process div.hero-banner h1") }
  }
}
