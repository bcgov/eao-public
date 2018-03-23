package pages.app

import pages.base.BaseAppPage

class ContactPage extends BaseAppPage {
  static at = { pageTitle.text().equals("Connect with us...") }
  static url = "/contact"
  static content = {
    pageTitle { $("app-contact div.hero-banner h1") }
  }
}
