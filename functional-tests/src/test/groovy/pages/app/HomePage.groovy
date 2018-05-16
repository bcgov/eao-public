package pages.app

import pages.base.BaseAppPage

class HomePage extends BaseAppPage {
  static at = { pageTitle.text().equals("BC Environmental Assessment Office") }
  static url = ""
  static content = {
    // hero banner elements
    pageTitle { $("app-home div.hero-banner h1") }
    viewListBtn { $("app-home div.hero-banner div.hero-banner__actions-buttons a", 0) }
    viewMapBtn { $("app-home div.hero-banner div.hero-banner__actions-buttons a", 1) }

    // body content elements
    activitiesAndUpdates { $("app-home .home-project-activities") }
    activitiesAndUpdatesLink { $("app-home .home-news-feed a", href : "/news") }
    legislationBtn { $("app-home .feature-blocks a", href : "/legislation") }
    processBtn { $("app-home .feature-blocks a", href : "/process") }
    complianceBtn { $("app-home .feature-blocks a", href : "/compliance-oversight") }
  }
}
