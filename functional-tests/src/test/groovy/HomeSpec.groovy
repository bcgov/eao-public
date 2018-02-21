import geb.spock.GebReportingSpec

import spock.lang.Narrative
import spock.lang.Title
import spock.lang.Unroll

import pages.app.ProcessPage
import pages.app.CompliancePage
import pages.app.ContactPage
import pages.app.HomePage
import pages.app.LegislationPage
import pages.app.NewsPage
import pages.app.ProjectListPage
import pages.app.ProjectMapPage
import pages.external.AccessibilityPage
import pages.external.CopyrightPage
import pages.external.DisclaimerPage
import pages.external.FacebookPage
import pages.external.GooglePlusPage
import pages.external.SignInPage
import pages.external.TwitterPage

@Title("Basic Navigational Tests")
@Narrative("""As a user I expect all links in the EAO Public home page to work.""")
class HomeSpec extends GebReportingSpec {

  /*
   * Header Tests
   */
  @Unroll
  def "Navigate Page from: HomePage, click header Link: #ItemSelector -> #SubItemSelector, Assert Page: #AssertPage"(){
    given: "I start on the HomePage"
      to HomePage
    when: "I click on the link #ItemSelector -> #SubItemSelector"
      header.clickMenuItem(ItemSelector, SubItemSelector)
    then:
      at AssertPage

    where:
      ItemSelector                      | SubItemSelector                    || AssertPage
      [ text : "FIND EA PROJECTS" ]     | [ text : "Find Projects by List" ] || ProjectListPage
      [ text : "FIND EA PROJECTS" ]     | [ text : "Find Projects by Map" ]  || ProjectMapPage
      [ text : "ACTIVITIES & UPDATES" ] | null                               || NewsPage
      [ text : "THE EA PROCESS" ]       | [ text : "Legislation" ]           || LegislationPage
      [ text : "THE EA PROCESS" ]       | [ text : "Process & Procedures" ]  || ProcessPage
      [ text : "THE EA PROCESS" ]       | [ text : "Compliance Oversight" ]  || CompliancePage
      [ text : "CONTACT" ]              | null                               || ContactPage
      [ text : "SIGN IN" ]              | null                               || SignInPage
  }

  /*
   * Body Tests
   */
  @Unroll
  def "Navigate Page from: HomePage, click Link: #ClickTarget, Assert Page: #AssertPage"(){
    given: "I start on the HomePage"
      to HomePage
    when: "I click on the link #ClickTarget"
      waitFor { page."$ClickTarget".click() }
    then:
      at AssertPage

    where:
      ClickTarget                || AssertPage
      "pageTitle"                || HomePage
      "viewListBtn"              || ProjectListPage
      "viewMapBtn"               || ProjectMapPage
      "activitiesAndUpdatesLink" || NewsPage
      "legislationBtn"           || LegislationPage
      "processBtn"               || ProcessPage
      "complianceBtn"            || CompliancePage
  }

  /*
   * Footer Tests
   */
  @Unroll
  def "Navigate Page from: #StartPage, click footer Link: #ClickLink, Assert Page: #AssertPage"() {
    given: "I start on the HomePage"
      to HomePage
    when: "I click on the #ClickLink"
      waitFor { footer."$ClickLink".click() }
    then: "I arrive on the #AssertPage page"
      at AssertPage
    where:
      ClickLink                 || AssertPage
      "projectListLink"         || ProjectListPage
      "projectMapLink"          || ProjectMapPage
      "legislationLink"         || LegislationPage
      "processLink"             || ProcessPage
      "complianceLink"          || CompliancePage
      "contactBtn"              || ContactPage
      "homeLink"                || HomePage
      "copyRightLink"           || CopyrightPage
      "disclaimerLink"          || DisclaimerPage
      "accessibilityLink"       || AccessibilityPage
      "signinLink"              || SignInPage
      "facebookConnect"         || FacebookPage
      "twitterConnect"          || TwitterPage
      "gplusConnect"            || GooglePlusPage
  }
}
