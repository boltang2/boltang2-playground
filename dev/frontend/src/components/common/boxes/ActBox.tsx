import { stat } from 'fs';
import { useEffect } from 'react';

interface ParsedAction {
      act: string;
      op: string[];
      status: string;
}

const parseActHandler = (raw: string): ParsedAction => {
      const match = raw.match(/^([a-zA-Z]+)(\(([^)]*)\))?/);
      if (!match) return { act: '', op: [], status: '' };

      const act = match[1]; // 예: "toggle", "oneway"
      const op = match[3]?.split(':') ?? []; // 예: "a:b:c" → ["a", "b", "c"]

      return { act, op, status: '' };
};

const useActionBox = (ref: React.RefObject<HTMLElement>, actEvent?: string, actHandler?: string, actTarget?: string) => {
      useEffect(() => {
            if (!actEvent || !actHandler || !actTarget || !ref.current) return;

            const el = ref.current;

            const handleEvent = () => {
                  const key = el.getAttribute('data-act-key');
                  const allWithSameKey = document.querySelectorAll(`[data-act-key="${key}"]`);
                  if (!key && !allWithSameKey) return;

                  const acts = actHandler.split('/');

                  acts.forEach((_a) => {
                        let { act, op, status } = parseActHandler(_a);

                        // 🔸 BEFORE 이벤트 디스패치
                        const beforeEvent = new CustomEvent(`${act}:before`, {
                              detail: { act, op, source: el },
                        });
                        el.dispatchEvent(beforeEvent);

                        switch (act) {
                              case 'oneway':
                                    allWithSameKey.forEach((sibling) => {
                                          if (sibling !== el) {
                                                status = sibling.getAttribute('data-act-status') ?? '';
                                                status = op[0];
                                                sibling.setAttribute('data-act-status', status);
                                          }
                                    });
                                    break;
                              case 'toggle':
                                    allWithSameKey.forEach((sibling) => {
                                          status = sibling.getAttribute('data-act-status') ?? '';
                                          let index = op.findIndex((item) => item === status) + 1;
                                          let r = op.length;
                                          status = op[index % r];
                                          sibling.setAttribute('data-act-status', status);
                                    });
                                    break;
                              case 'selected':
                                    status = op[0];
                                    allWithSameKey.forEach((sibling) => {
                                          if (sibling !== el && !sibling.contains(el)) {
                                                sibling.removeAttribute('data-act-selected');
                                          } else {
                                                sibling.setAttribute('data-act-selected', status);
                                          }
                                    });
                                    break;
                        }

                        console.log(`Action '${act}' executed on #${actTarget} | Status: ${status}`);

                        // 🔸 AFTER 이벤트 디스패치
                        const afterEvent = new CustomEvent(`${act}:after`, {
                              detail: { act, op, source: el },
                        });
                        el.dispatchEvent(afterEvent);
                  });
            };

            el.addEventListener(actEvent, handleEvent);
            return () => el.removeEventListener(actEvent, handleEvent);
      }, [actEvent, actHandler, actTarget, ref]);
};

export default useActionBox;
