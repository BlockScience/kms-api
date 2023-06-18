
function on(eventType: any, listener: any) {
  document.addEventListener(eventType, listener);
}

function off(eventType: any, listener: any) {
  document.removeEventListener(eventType, listener);
}

function once(eventType: any, listener: any) {
  on(eventType, handleEventOnce);
  function handleEventOnce(event: any) {
    listener(event);
    off(eventType, handleEventOnce);
  }
}

function trigger(eventType: any, data: any) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, once, off, trigger };
