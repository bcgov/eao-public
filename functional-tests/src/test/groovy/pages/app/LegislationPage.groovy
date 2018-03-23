package pages.app

import pages.base.BaseAppPage

class LegislationPage extends BaseAppPage {
  static at = { pageTitle.text().equals("Legislation") }
  static url = "/legislation"
  static content = {
    pageTitle { $("app-legislation div.hero-banner h1") }
  }
}
