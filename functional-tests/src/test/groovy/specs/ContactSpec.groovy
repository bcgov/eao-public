import geb.spock.GebReportingSpec

import pages.app.ContactPage

import pages.external.ExternalLinkPage

import spock.lang.Title
import spock.lang.Unroll

@Title("Functional tests for the Contact page")
class ContactSpec extends GebReportingSpec {
  @Unroll
  def "Navigate Page from: ContactPage, click body Link: #ItemSelector, Assert Page: #AssertPage"(){
    given: "I start on the ContactPage"
      to ContactPage
    when: "I click on the link #ItemSelector"
      waitFor { commonLinkModule.clickMainContentLink(SectionSelector, ItemSelector) }
    then:
      at AssertPage
    where:
      SectionSelector                                                           | ItemSelector                                || AssertPage
      // The following test consistently passes in local mode, but fails in the pipeline and is therefore temporarily commented out.
      // [ tag : "h3", text : "Contact the BC Environmental Assessement Office" ]  | [ text : "EAO B.C. Government Directory" ]  || new ExternalLinkPage("BC Government Directory, ENV - Environmental Assessment Office", "dir.gov.bc.ca")
      [ tag : "h3", text : "Report Natural Resource Violations" ]               | [ text : "here" ]                           || new ExternalLinkPage("Report Natural Resource Violations - Province of British Columbia", "https://www2.gov.bc.ca/gov/content/environment/natural-resource-stewardship/natural-resource-law-enforcement/report-natural-resource-violations")
  }
}
