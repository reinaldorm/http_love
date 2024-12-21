export default function observe_class(element: HTMLElement, callback: Function) {
  const observer = new MutationObserver(observerCallback);

  const config = { attributes: true };

  console.log(element);

  observer.observe(element, config);

  function observerCallback(mutationsList: MutationRecord[]) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        callback();
        observer.disconnect();
      }
    }
  }
}
