package pages.app

import geb.Page

import modules.CommonLinkModule

class ProcessPage extends Page {

  static url = "/process"
  static at = { pageTitle.text().equals("Process & Procedures") }

  static content = {
    pageTitle { $("app-process div.hero-banner h1") }

    commonLink { module(CommonLinkModule) }
  }
}
