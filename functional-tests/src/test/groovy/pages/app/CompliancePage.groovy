package pages.app

import geb.Page

import modules.CommonLinkModule

class CompliancePage extends Page {

  static url = "/compliance-oversight"
  static at = { pageTitle.text().equals("Compliance Oversight") }

  static content = {
    pageTitle { $("app-compliance-oversight div.hero-banner h1") }

    commonLink { module(CommonLinkModule) }
  }
}
