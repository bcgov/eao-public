package pages.app

import geb.Page

import modules.HeaderModule
import modules.FooterModule

class HomePage extends Page {

  static url = ""
  static at = { pageTitle.text().equals("BC Environmental Assessment Office") }

  static content = {
    // header
    header { module(HeaderModule) }

    // hero banner elements
    pageTitle { $("app-home div.hero-banner h1") }
    viewListBtn { $("app-home div.hero-banner div.hb-btns a", 0) }
    viewMapBtn { $("app-home div.hero-banner div.hb-btns a", 1) }

    // body content elements
    activitiesAndUpdates { $("app-home .home-project-activities") }
    activitiesAndUpdatesLink { $("app-home .home-project-activities a", href : "/news") }
    legislationBtn { $("app-home .feature-blocks a", href : "/legislation") }
    processBtn { $("app-home .feature-blocks a", href : "/process") }
    complianceBtn { $("app-home .feature-blocks a", href : "/compliance-oversight") }

    // footer links
    footer { module(FooterModule) }
  }
}
