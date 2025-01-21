"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

// TODO: Replace 'G-CXHYSXSLXP' with your actual Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-CXHYSXSLXP"

declare global {
  interface Window {
    gtag: any
    dataLayer: any[]
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()

    if (typeof window.gtag !== "undefined") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                        });

                        // Custom event tracking function
                        window.trackEvent = function(eventName, eventParams = {}) {
                            gtag('event', eventName, eventParams);
                        };

                        // Set user properties function
                        window.setUserProperties = function(properties) {
                            gtag('set', 'user_properties', properties);
                        };

                        // Track timing function
                        window.trackTiming = function(category, variable, value, label) {
                            gtag('event', 'timing_complete', {
                                name: variable,
                                value: value,
                                event_category: category,
                                event_label: label
                            });
                        };

                        // Track exception function
                        window.trackException = function(description, fatal = false) {
                            gtag('event', 'exception', {
                                description: description,
                                fatal: fatal
                            });
                        };
                    `,
        }}
      />
    </>
  )
}

