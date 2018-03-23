package pages.app

import pages.base.BaseAppPage

class ProjectMapPage extends BaseAppPage {
  static at = { mapContainer.displayed }
  static url = "/map"
  static content = {
    mapContainer { $(".map-container") }
  }
}
