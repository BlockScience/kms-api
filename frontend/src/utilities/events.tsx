function on(eventType: string, listener: EventListenerOrEventListenerObject) {
  document.addEventListener(eventType, listener)
}

function off(eventType: string, listener: EventListenerOrEventListenerObject) {
  document.removeEventListener(eventType, listener)
}

function once(eventType: string, listener: CallableFunction) {
  on(eventType, function handleEventOnce(event: unknown) {
    listener(event)
    off(eventType, handleEventOnce)
  })
}

function trigger(eventType: string, data: unknown) {
  const event = new CustomEvent(eventType, { detail: data })
  document.dispatchEvent(event)
}

export { on, once, off, trigger }
