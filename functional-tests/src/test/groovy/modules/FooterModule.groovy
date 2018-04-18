package modules

import geb.Module

/**
 * Contains objects and methods for interacting with the global footer bar.
 */
class FooterModule extends Module {
  static content = {
    projectListLink { $("footer.app-footer a", href : "/project") }
    projectMapLink { $("footer.app-footer a", href : "/map") }
    legislationLink { $("footer.app-footer a", href : "/legislation") }
    processLink { $("footer.app-footer a", href : "/process") }
    complianceLink { $("footer.app-footer a", href : "/compliance-oversight") }
    contactBtn { $("footer.app-footer a", href : "/contact") }

    // admin navigation
    homeLink { $("footer.app-footer a", href : "/") }
    copyRightLink { $("footer.app-footer a", href : "http://www2.gov.bc.ca/gov/content/home/copyright") }
    disclaimerLink { $("footer.app-footer a", href : "http://www2.gov.bc.ca/gov/content/home/disclaimer") }
    privacyLink { $("footer.app-footer a", href : "http://www2.gov.bc.ca/gov/content/home/privacy") }
    accessibilityLink { $("footer.app-footer a", href : "http://www2.gov.bc.ca/gov/content/home/accessibility") }
    signinLink { $("footer.app-footer a", text : "Sign In") }

    // connect links
    facebookConnect { $("footer .fb-share-button") }
    twitterConnect { $("footer .twitter-share-button") }
    gplusConnect { $("footer a").$("img", alt:"Share on Google+") }
  }
}
