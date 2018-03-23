package pages.external

import geb.Page

class SignInPage extends Page {
  static at = {
    browser.withWindow({ title.equals("Government of British Columbia") }, close:true) {
      assert browser.getAvailableWindows().size().equals(2)
      assert browser.getCurrentUrl().startsWith("https://logon.gov.bc.ca")
      assert pageTitle.text().equals("Log in to projects.eao.gov.bc.ca")
    }
  }
  static content = {
    pageTitle { $("header div.site-title") }
  }
}
