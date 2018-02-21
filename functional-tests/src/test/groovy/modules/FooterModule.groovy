package modules

import geb.Module

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
      signinLink { $("footer.app-footer a", href : "https://projects.eao.gov.bc.ca/authentication/signin") }

      // connect links
      facebookConnect { $("footer.app-footer a", href : "https://www.facebook.com/sharer/sharer.php?u=https://esm-master.pathfinder.gov.bc.ca&src=sdkpreparse") }
      twitterConnect { $("footer.app-footer a", href : "https://twitter.com/share") }
      gplusConnect { $("footer.app-footer a", href : "https://plus.google.com/share?url=https://esm-master.pathfinder.gov.bc.ca") }
    }
}
