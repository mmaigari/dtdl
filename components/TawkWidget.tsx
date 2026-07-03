"use client";

import Script from "next/script";

// Tawk.to live chat. Loaded lazily after page interactive so it never
// blocks first paint. Set NEXT_PUBLIC_TAWK_DISABLED=1 in .env.local to
// silence it in development.
const TAWK_SRC =
  "https://embed.tawk.to/6a477593966d951d46bb0bda/1jsji6i9v";

export default function TawkWidget() {
  if (process.env.NEXT_PUBLIC_TAWK_DISABLED === "1") return null;

  return (
    <Script
      id="tawk-widget"
      strategy="lazyOnload"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),
                s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='${TAWK_SRC}';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
