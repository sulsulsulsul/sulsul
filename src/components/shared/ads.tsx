import Script from 'next/script';

export default function Ads() {
  return (
    <>
      <Script id="kakao-ads" strategy="lazyOnload">
        {`
          (function() {
            var container = document.createElement('aside');
            container.id = 'kakao-ad-container';
            container.style.width = '100%';
            container.style.display = 'flex';
            container.style.position = 'absolute';
            container.style.bottom = '0';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';

            const ins = document.createElement('ins');
            ins.className = 'kakao_ad_area';

            const windowSize = window.innerWidth;
            if (windowSize < 1024) {
              ins.setAttribute('data-ad-unit', 'DAN-UydmU7g5E3notBGb');
              ins.setAttribute('data-ad-width', '320');
              ins.setAttribute('data-ad-height', '50');
            }
            container.appendChild(ins);
            document.body.appendChild(container);

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
            script.async = true;
            document.body.appendChild(script);
          })();
        `}
      </Script>
    </>
  );
}
