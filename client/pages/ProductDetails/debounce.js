export function debounce_leading(func, timeout = 2000){
  let timer;
  return (...args) => {
    // OK to call func if no timer running
    if (!timer) {
      func.apply(this, args);
    }
    // Reset the timer every time button is pressed
    clearTimeout(timer);
    // Set a new timer every time button is pressed
    timer = setTimeout(() => {
      // Delete timer after timeout has passed
      timer = undefined;
    }, timeout);
  };
}