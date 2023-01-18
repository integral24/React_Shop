class DomHelper {
  addEventListener(eventType, cb) {
    return document.addEventListener(eventType, (event) => {
      event.stopPropagation();
      cb(event);
    });
  }

  removeEventListener(eventType, cb) {
    return document.removeEventListener(eventType, cb);
  }
}

export default new DomHelper();
