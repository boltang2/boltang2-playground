$(() => {
      (async () => {
            // await DynamicDomRenderer.getInstance().initializeObservingDomChanges();
            // await DynamicDomRenderer.getInstance().initializeCustomElements(document);
            // await DynamicDomRenderer.getInstance().initializeCustomGridStyles(document);
      })();
});

export class DynamicDomRenderer {
      static instance: any;
      public $template: JQuery<DocumentFragment>;

      constructor() {
            this.$template = $(($('#template')[0] as HTMLTemplateElement).content);
      }

      static getInstance() {
            if (!DynamicDomRenderer.instance) {
                  DynamicDomRenderer.instance = new DynamicDomRenderer();
            }
            return DynamicDomRenderer.instance;
      }

      initializeObservingDomChanges() {
            const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                        if (mutation.type === 'childList' && mutation.addedNodes.length) {
                              mutation.addedNodes.forEach((node) => {
                                    if ($(node).is('[data-custom-svg]') || $(node).is('[data-custom-img]')) this.handleCustomElementInjection(node);
                                    if ($(node).is(`[data-css-row]`) || $(node).is(`[data-css-column]`)) this.handleCustomGridStyles(node);
                              });
                        }
                  });
            });

            observer.observe(document.body, {
                  childList: true,
                  subtree: true,
            });
      }

      handleCustomElementInjection(node: Node) {
            try {
                  const svg = $(node).attr(`data-custom-svg`);
                  if (svg) {
                        let clone = this.$template.find(`[data-template="svg"] [ data-template-id="${svg}"]`).clone();
                        $(node).append(clone);
                  }
                  const img = $(node).attr(`data-custom-img`);
                  if (img) {
                        let clone = this.$template.find(`[data-template="img"] [ data-template-id="${img}"]`).clone();
                        $(node).append(clone);
                  }
            } catch (e) {
                  console.log(e);
            }
      }

      handleCustomGridStyles(node: Node) {
            try {
                  const css: { [key: string]: string } = {};
                  const row = $(node).attr(`data-css-row`);
                  if (row) {
                        const [size, gap, template] = row.split(' ');
                        if (template)
                              css['grid-template-rows'] = template.split(':').reduce((acc: string, u: string) => {
                                    if (u.includes('fr') || u.includes('auto')) acc += `${u} `;
                                    else if (u.includes('rep')) acc += `repeat(${u.split('/')[1]}, ${Number(size) * Number(u.split('/')[2])}px) `;
                                    else acc += `${Number(size) * Number(u)}px `;
                                    return acc;
                              }, '');
                        if (gap) css['row-gap'] = `${gap}px`;
                        $(node)
                              .children()
                              .toArray()
                              .forEach((row, index) => {
                                    row.setAttribute(`data-row-index`, `${index}`);
                              });
                  }
                  const column = $(node).attr(`data-css-column`);
                  if (column) {
                        const [size, gap, template] = column.split(' ');
                        if (template)
                              css['grid-template-columns'] = template.split(':').reduce((acc: string, u: string) => {
                                    if (u.includes('fr') || u.includes('auto')) acc += `${u} `;
                                    else if (u.includes('rep')) acc += `repeat(${u.split('/')[1]}, ${Number(size) * Number(u.split('/')[2])}px) `;
                                    else acc += `${Number(size) * Number(u)}px `;
                                    return acc;
                              }, '');
                        if (gap) css['column-gap'] = `${gap}px`;
                        $(node)
                              .children()
                              .toArray()
                              .forEach((col, index) => {
                                    col.setAttribute(`data-column-index`, `${index}`);
                              });
                  }
                  $(node).css(css);
            } catch (e) {
                  console.log(e);
            }
      }

      initializeCustom(node: Node) {
            this.initializeCustomElements(node);
            this.initializeCustomGridStyles(node);
      }

      initializeCustomElements(nodes: Node) {
            $(nodes)
                  .find(`[data-custom-svg], [data-custom-img]`)
                  .toArray()
                  .forEach((node) => this.handleCustomElementInjection(node));
      }

      initializeCustomGridStyles(nodes: Node) {
            $(nodes)
                  .find(`[data-css-row], [data-css-column]`)
                  .toArray()
                  .forEach((node) => this.handleCustomGridStyles(node));
      }
}
