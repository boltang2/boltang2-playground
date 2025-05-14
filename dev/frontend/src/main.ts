import { HtmlService } from './service/HtmlService.js';
import { DynamicDomRenderer } from './global/Observer.js';
import { DynamicDomListener } from './global/EventListener.js';
import { IndexPageController } from './page/Index.js';

$(() => {
      (async () => {
            await HtmlService.getInstance().doGetTemplate('T', $('#template'));
            await DynamicDomRenderer.getInstance().initializeObservingDomChanges();
            await DynamicDomRenderer.getInstance().initializeCustomElements(document);
            await DynamicDomRenderer.getInstance().initializeCustomGridStyles(document);
            await DynamicDomListener.getInstance().disposeEventListener();
            await DynamicDomListener.getInstance().initializeEventListener();
            await IndexPageController.getInstance().disposeEventListener();
            await IndexPageController.getInstance().initializeEventListener();
      })();
});
