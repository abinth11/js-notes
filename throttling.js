function doSomething() {
  let count = 0;
  console.log("called do something", count++);
}

function throttle(fn, limit) {
  let flag = true;
  return function () {
    if (flag) {
      fn.apply(null, arguments);
      flag = false;
      setTimeout(function () {
        flag = true;
      }, limit);
    }
  };
}

const throttledDoSomething = throttle(doSomething, 300);
