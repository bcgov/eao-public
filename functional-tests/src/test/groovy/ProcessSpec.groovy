import geb.spock.GebReportingSpec

import spock.lang.Narrative
import spock.lang.Title
import spock.lang.Unroll

import pages.app.ProcessPage
import pages.external.ExternalLinkPage

@Title("Basic Navigational Tests")
@Narrative("""As a user I expect all links in the EAO Public process page to work.""")
class ProcessSpec extends GebReportingSpec {

  @Unroll
  def "Navigate Page from: ProcessPage, click body Link: #ItemSelector, Assert Page: #AssertPage"(){
    given: "I start on the ProcessPage"
      to ProcessPage
    when: "I click on the link #ItemSelector"
      waitFor { commonLink.clickMainContentLink(SectionSelector, ItemSelector) }
    then:
      at AssertPage

    where:
      SectionSelector                                     | ItemSelector                                   || AssertPage
      // [ tag : "h2", text : "The Environmental Assessment Process" ]  | [ text : "PDF Version" ]           || new ExternalLinkPage("roadmap_infographic.pdf", "https://www-esm-master.pathfinder.gov.bc.ca/assets/pdf/roadmap_infographic.pdf")
      [ tag : "h3", text : "Application Review Phase" ]  | [ text : "Prescribed Time Limits Regulation" ]  || new ExternalLinkPage("Prescribed Time Limits Regulation", "http://www.bclaws.ca/EPLibraries/bclaws_new/document/ID/freeside/11_372_2002")
      // [ tag : "h3", text : "Minister's Decision" ]  | [ text : "EAO User Guide" ]                         || new ExternalLinkPage("BC Environmental Assessment Fee Guidelines - EAO-Guidance-EAO-User-Guide.pdf", "http://www.eao.gov.bc.ca/files/EAO-Guidance-EAO-User-Guide.pdf")
  }
}
