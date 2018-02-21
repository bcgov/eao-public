package pages.app

import geb.Page

import modules.HeaderModule

class ProjectListPage extends Page {

  static url = "/project"
  static at = { pageTitle.text().equals("Find EA Projects in British Columbia") }

  static content = {
    pageTitle { $("app-project div.hero-banner h1") }
  }
}
