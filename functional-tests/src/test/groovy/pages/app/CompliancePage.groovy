package pages.app

import pages.base.BaseAppPage

class CompliancePage extends BaseAppPage {
  static at = { pageTitle.text().equals("Compliance Oversight") }
  static url = "/compliance-oversight"
  static content = {
    pageTitle { $("app-compliance-oversight div.hero-banner h1") }
  }
}
