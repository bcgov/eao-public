package pages.app

import geb.Page

import modules.HeaderModule

class ProjectMapPage extends Page {

  static url = "/map"
  static at = { mapContainer.displayed }

  static content = {
    mapContainer { $(".map-container") }
  }
}
