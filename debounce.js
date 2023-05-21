const fetchData = () => {
  let count = 0;
  console.log("data fetching", count++);
};
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const result = async ()=>{
  console.log('async')
}

const debouncedFetchData = debounce(fetchData, 300);
