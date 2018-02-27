package pages.app

import geb.Page

import modules.CommonLinkModule

class LegislationPage extends Page {

  static url = "/legislation"
  static at = { pageTitle.text().equals("Legislation") }

  static content = {
    pageTitle { $("app-legislation div.hero-banner h1") }

    commonLink { module(CommonLinkModule) }
  }
}
