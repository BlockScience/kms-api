function on(eventType: string, listener: unknown) {
  document.addEventListener(eventType, listener);
}

function off(eventType: string, listener: unknown) {
  document.removeEventListener(eventType, listener);
}

function once(eventType: string, listener: unknown) {
  on(eventType, function handleEventOnce(event: unknown) {
    listener(event);
    off(eventType, handleEventOnce);
  });
}

function trigger(eventType: string, data: unknown) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, once, off, trigger };
