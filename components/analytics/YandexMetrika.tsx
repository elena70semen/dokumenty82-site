import { analyticsConfig } from "@/lib/integrations/analytics-config";

export function YandexMetrika() {
  if (!analyticsConfig.canLoadScript) return null;

  const counterId = analyticsConfig.yandexMetrikaId;
  const initParams = {
    clickmap: analyticsConfig.clickmap,
    trackLinks: analyticsConfig.trackLinks,
    accurateTrackBounce: analyticsConfig.accurateTrackBounce,
    webvisor: analyticsConfig.webvisor
  };

  return (
    <>
      <script
        id="yandex-metrika"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');

            ym(${counterId}, 'init', ${JSON.stringify(initParams)});
          `
        }}
      />
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${counterId}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
        </div>
      </noscript>
    </>
  );
}
