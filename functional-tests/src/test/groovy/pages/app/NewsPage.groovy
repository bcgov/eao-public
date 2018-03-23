package pages.app

import pages.base.BaseAppPage

class NewsPage extends BaseAppPage {
  static at = { pageTitle.text().equals("Activities & Updates") }
  static url = "/news"
  static content = {
    pageTitle { $("app-news div.hero-banner h1") }
  }
}
