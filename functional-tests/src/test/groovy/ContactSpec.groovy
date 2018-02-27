import geb.spock.GebReportingSpec

import spock.lang.Narrative
import spock.lang.Title
import spock.lang.Unroll

import pages.app.ContactPage
import pages.external.ExternalLinkPage

@Title("Basic Navigational Tests")
@Narrative("""As a user I expect all links in the EAO Public contact page to work.""")
class ContactSpec extends GebReportingSpec {

  @Unroll
  def "Navigate Page from: ContactPage, click body Link: #ItemSelector, Assert Page: #AssertPage"(){
    given: "I start on the ContactPage"
      to ContactPage
    when: "I click on the link #ItemSelector"
      waitFor { commonLink.clickMainContentLink(SectionSelector, ItemSelector) }
    then:
      at AssertPage

    where:
      SectionSelector                                                           | ItemSelector                                || AssertPage
      [ tag : "h3", text : "Contact the BC Environmental Assessement Office" ]  | [ text : "EAO B.C. Government Directory" ]  || new ExternalLinkPage("BC Government Directory, ENV - Environmental Assessment Office", "dir.gov.bc.ca")
      [ tag : "h3", text : "Report Natural Resource Violations" ]               | [ text : "here" ]                           || new ExternalLinkPage("Report Natural Resource Violations - Province of British Columbia", "https://www2.gov.bc.ca/gov/content/environment/natural-resource-stewardship/natural-resource-law-enforcement/report-natural-resource-violations")
  }
}
