import { HtmlService } from '../service/HtmlService.js';

$(() => {
      (async () => {
            // await IndexPageController.getInstance().disposeEventListener();
            // await IndexPageController.getInstance().initializeEventListener();
      })();
});
export class IndexPageController extends HtmlService {
      static instance: any;
      public $container: JQuery<HTMLElement>;
      public $sidebar: JQuery<HTMLElement>;

      constructor() {
            super();
            this.$container = $('#container');
            this.$sidebar = $('#container__sidebar');
      }

      static getInstance() {
            if (!IndexPageController.instance) {
                  IndexPageController.instance = new IndexPageController();
            }
            return IndexPageController.instance;
      }

      async initializeEventListener() {
            const $mainbar = this.$sidebar.find('#sidebar__mainbar');
            const $panelbar = this.$sidebar.find('#sidebar__panelbar');

            $mainbar.on('oneway:before', '[data-action-type*="oneway"]', (e) => {
                  const $btn = $(e.target).closest(`[data-action-type]`);
                  const $title = $('#header-title-box');
                  const text = $btn.attr('id');
                  $title.text(text?.trim() ?? '');
            });

            $mainbar.on('selected:before', '.mainbar__li[data-action-type*="selected"]', (e) => {
                  const $btn = $(e.target).closest(`[data-action-type]`);
                  $('.panelbar__ul').addClass('hide');
                  $(`#panelbar__${$btn.attr('id')}`).removeClass('hide');
            });

            $panelbar.on('selected:before', '.panelbar__li[data-action-type*="selected"]', (e) => {
                  $panelbar.find('.panelbar__li').removeClass('selected');
            });
      }

      async disposeEventListener() {}
}
