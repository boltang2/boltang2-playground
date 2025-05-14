$(() => {
    (async () => {
        // await DynamicDomListener.getInstance().disposeEventListener();
        // await DynamicDomListener.getInstance().initializeEventListener();
    })();
});
export class DynamicDomListener {
    static instance;
    constructor() { }
    static getInstance() {
        if (!DynamicDomListener.instance) {
            DynamicDomListener.instance = new DynamicDomListener();
        }
        return DynamicDomListener.instance;
    }
    async initializeEventListener() {
        //? action:oneway
        $(document).on('click', `[data-action-type*="oneway"]`, async (e) => {
            const $btn = $(e.target).closest(`[data-action-type]`);
            const template = $btn.data('action-template')?.split(':') ?? [];
            const [op, key] = template;
            if (!op || !key)
                return;
            const $target = $(`[data-action-for="${key}"]`);
            if (!$target[0])
                return;
            $btn.trigger(`oneway:before`, { status: op });
            $target.toArray().forEach((node) => node.setAttribute(`data-action-status`, op));
            $btn.trigger(`oneway:after`, { status: op });
        });
        //? action:toggle
        $(document).on('click', `[data-action-type*="toggle"]`, async (e) => {
            const $btn = $(e.target).closest(`[data-action-type]`);
            const template = $btn.data('action-template')?.split(':') ?? [];
            const [on, off, key] = template;
            if (!on || !off || !key)
                return;
            const $target = $(`[data-action-for="${key}"]`);
            if ($target.length === 0)
                return;
            const currentStatus = $target[0].getAttribute('data-action-status');
            const nextStatus = currentStatus === on ? off : on;
            $btn.trigger('toggle:before', { status: nextStatus });
            $target[0].setAttribute('data-action-status', nextStatus);
            $btn.trigger('toggle:after', { status: nextStatus });
        });
        //? action:selected
        $(document).on('click', `[data-action-type*="selected"]`, async (e) => {
            const $btn = $(e.target).closest(`[data-action-type]`);
            const $siblings = $btn.siblings(`[data-action-type*="selected"]`);
            $btn.trigger(`selected:before`);
            $siblings.removeClass('selected');
            $btn.addClass('selected');
            $btn.trigger(`selected:after`);
        });
    }
    disposeEventListener() { }
}
