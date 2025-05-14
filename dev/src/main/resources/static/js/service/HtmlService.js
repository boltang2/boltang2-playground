import { DynamicDomRenderer } from '../global/Observer.js';
$(() => {
    (async () => {
        // await HtmlService.getInstance().doGetTemplate('T', $('#template'));
        // await DynamicDomRenderer.getInstance().initializeCustomElements(document);
        // await DynamicDomRenderer.getInstance().initializeCustomGridStyles(document);
    })();
});
export class HtmlService extends DynamicDomRenderer {
    static instance;
    $container;
    map;
    constructor() {
        super();
        this.$container = $('#container');
        this.map = {
            pre: () => '',
        };
    }
    static getInstance() {
        if (!HtmlService.instance) {
            HtmlService.instance = new HtmlService();
        }
        return HtmlService.instance;
    }
    async doGetTemplate(key, $container) {
        const inst = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/view/html/template.do',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    $container.html(data);
                    resolve(data);
                },
                error: function (xhr, status, error) {
                    reject();
                },
            });
        });
    }
    async doGetHtml(key, $container) {
        if (!key)
            return;
        const inst = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/view/html/get.do',
                type: 'GET',
                data: { key: key },
                dataType: 'html',
                success: function (data) {
                    HtmlService.getInstance().doGetJS(inst.map[key]);
                    HtmlService.getInstance().initializeCustom($container[0]);
                    resolve(data);
                },
                error: function (xhr, status, error) {
                    reject();
                },
            });
        });
    }
    async doGetJS(_class) {
        // (window as any).CurrentPageClass?.removeEventListener();
        // (window as any).CurrentPageClass = _class();
        // (window as any).CurrentPageClass.init();
    }
}
