// export function throttle(callback, delay) {
//   let timerID = null;
//   const throttledFunction = function (...args) {
//     if (timerID) return;

//     timerID = setTimeout(() => {
//       callback.apply(this, args);
//       timerID = null;
//     }, delay);
//   };

//   return throttledFunction;
// }
