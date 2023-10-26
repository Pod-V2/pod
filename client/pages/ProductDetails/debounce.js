/**
 * Return a function that cannot be called unless a cooldown period is reached. 
 * Trying to run the function within the cooldown will cause the timer to reset.
 * @param {function} func function to run
 * @param {number} timeout ms to wait before function can be called
 */
export function debounce_leading(func, timeout = 2000){
  let timer;
  return (...args) => {
    // OK to call func if no timer running
    if (!timer) {
      func.apply(this, args);
    }
    else {
      console.log("Please wait to submit")
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
