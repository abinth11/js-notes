const fetchData = () => {
  let count = 0;
  console.log("data fetching", count++);
};
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      console.log(this)
      console.log(args)
      func.apply(this, args);
    }, delay);
  };
}

const debouncedFetchData = debounce(fetchData, 300);
