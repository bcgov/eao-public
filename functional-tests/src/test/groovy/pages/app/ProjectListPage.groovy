package pages.app

import pages.base.BaseAppPage

class ProjectListPage extends BaseAppPage {
  static at = { pageTitle.text().equals("Find EA Projects in British Columbia") }
  static url = "/project"
  static content = {
    pageTitle { $("app-project div.hero-banner h1") }
  }
}
