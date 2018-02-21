package pages.app

import geb.Page

import modules.HeaderModule

class NewsPage extends Page {

  static url = "/news"
  static at = { pageTitle.text().equals("Activities & Updates") }

  static content = {
    pageTitle { $("app-news div.hero-banner h1") }
  }
}
