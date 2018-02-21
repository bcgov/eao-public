package pages.app

import geb.Page

import modules.CommonLinkModule

class ContactPage extends Page {

  static url = "/contact"
  static at = { pageTitle.text().equals("Connect with us...") }

  static content = {
    pageTitle { $("app-contact div.hero-banner h1") }

    commonLink { module(CommonLinkModule) }
  }
}
