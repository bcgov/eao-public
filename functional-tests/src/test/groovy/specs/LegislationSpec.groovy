import geb.spock.GebReportingSpec

import pages.app.LegislationPage

import pages.external.ExternalLinkPage

import spock.lang.Title
import spock.lang.Unroll

@Title("Functional tests for the Legislation page")
class LegislationSpec extends GebReportingSpec {
  /*
   * side links
   */
  @Unroll
  def "Navigate Page from: LegislationPage, click side Link: #ItemSelector, Assert Page: #AssertPage"(){
    given: "I start on the LegislationPage"
      to LegislationPage
    when: "I click on the link #ItemSelector"
      waitFor { commonLinkModule.clickSideBarLink(SectionSelector, ItemSelector) }
    then:
      at AssertPage
    where:
      SectionSelector                                        | ItemSelector                                        || AssertPage
      [ tag : "h4", text : "BC LAWS - ACTS & REGULATIONS" ]  | [ text : "Environmental Assessment Act" ]           || new ExternalLinkPage("Environmental Assessment Act", "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/00_02043_01")
      [ tag : "h4", text : "BC LAWS - ACTS & REGULATIONS" ]  | [ text : "Reviewable Projects Regulation" ]         || new ExternalLinkPage("Reviewable Projects Regulation", "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/13_370_2002")
      [ tag : "h4", text : "BC LAWS - ACTS & REGULATIONS" ]  | [ text : "Concurrent Approval Regulation" ]         || new ExternalLinkPage("Concurrent Approval Regulation", "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/10_371_2002")
      [ tag : "h4", text : "BC LAWS - ACTS & REGULATIONS" ]  | [ text : "Prescribed Time Limits Regulation" ]      || new ExternalLinkPage("Prescribed Time Limits Regulation", "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/11_372_2002")
      [ tag : "h4", text : "BC LAWS - ACTS & REGULATIONS" ]  | [ text : "Public Consultation Policy Regulation" ]  || new ExternalLinkPage("Public Consultation Policy Regulation", "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/12_373_2002")
      [ tag : "h4", text : "BC LAWS - ACTS & REGULATIONS" ]  | [ text : "Transition Regulation" ]                  || new ExternalLinkPage("Transition Regulation", "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/14_374_2002")
      [ tag : "h4", text : "BC LAWS - ACTS & REGULATIONS" ]  | [ text : "Fee Regulation" ]                         || new ExternalLinkPage("Environmental Assessment Fee Regulation", "http://www.bclaws.ca/civix/document/id/complete/statreg/50_2014")
  }

  /*
   * main links
   */
  @Unroll
  def "Navigate Page from: LegislationPage, click body Link: #ItemSelector, Assert Page: #AssertPage"(){
    given: "I start on the LegislationPage"
      to LegislationPage
    when: "I click on the link #ItemSelector"
      waitFor { commonLinkModule.clickMainContentLink(SectionSelector, ItemSelector) }
    then:
      at AssertPage
    where:
      SectionSelector                                     | ItemSelector                                            || AssertPage
      [ tag : "h3", text : "2016 Exemption Regulation" ]  | [ text : "Exemption Regulation" ]                       || new ExternalLinkPage("Exemption Regulation", "http://www.bclaws.ca/civix/document/id/complete/statreg/120_2016")
      [ tag : "h3", text : "2016 Exemption Regulation" ]  | [ text : "Coastal First Nations v. British Columbia" ]  || new ExternalLinkPage("2016 BCSC 34 Coastal First Nations v. British Columbia (Environment)", "https://www.courts.gov.bc.ca/jdb-txt/sc/16/00/2016BCSC0034cor1.htm")
      [ tag : "h3", text : "2016 Exemption Regulation" ]  | [ text : "BC Gov News" ]                                || new ExternalLinkPage("New exemption regulation under the Environmental Assessment Act | BC Gov News", "https://news.gov.bc.ca/releases/2016ENV0028-000821")
  }
}
