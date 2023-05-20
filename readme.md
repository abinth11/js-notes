
## Debounce Function

The `debounce` function is designed to limit the frequency at which a given function is called. It delays the execution of the function until a certain amount of time has passed without any further invocations. This is useful in scenarios where you want to optimize performance by reducing the number of function calls or when dealing with user input where immediate feedback is not required.

### Function Signature

```javascript
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### Parameters

- `func`: The function that needs to be debounced. This is the function that will be executed after the delay period.
- `delay`: The time in milliseconds that specifies how long to wait before invoking the debounced function.

### Explanation

1. The `debounce` function starts by declaring a local variable `timerId` that will store the identifier of the timer set by `setTimeout`.

2. It then returns an inner function that is created dynamically at runtime. This inner function serves as the debounced version of the original function (`func`).

3. The debounced function accepts any number of arguments using the rest parameter syntax `(...args)`. This allows the debounced function to be flexible and handle different argument scenarios.

4. Inside the debounced function, `clearTimeout(timerId)` is called to clear any previously set timers. This ensures that the debounced function is only executed once the specified delay has elapsed since the last invocation.

5. After clearing the timer, a new `setTimeout` is set. When the delay period (`delay`) elapses, the function provided as the second argument to `setTimeout` is executed.

6. Within the timeout callback function, `func.apply(this, args)` is called to invoke the original function (`func`) with the correct context (`this`) and arguments (`args`).

   - The `apply` method is used to execute the original function, passing in the `this` value and the array of arguments (`args`).
   - By using `apply`, the original function is called with the same `this` value as the debounced function, ensuring that the context is maintained.
   - The array of arguments (`args`) is passed as individual arguments to the original function.

7. Finally, the debounced function returns. It will only execute the original function after the specified delay if no new invocations occur during that period. If a new invocation happens, the timer is reset, and the delay period starts again.

### Usage

To use the `debounce` function, you can create a debounced version of any function by passing it as the first argument and specifying the desired delay in milliseconds as the second argument.

Here's an example:

```javascript
const fetchData = () => {
  let count = 0;
  console.log("data fetching", count++);
};

const debouncedFetchData = debounce(fetchData, 300);
```

In this example, `fetchData` is the original function that we want to debounce, and `300` is the delay in milliseconds. Adjust the delay according to your needs.

Now, whenever `debouncedFetchData` is invoked, it will wait for 300 milliseconds of inactivity before executing the `fetchData` function. If `debouncedFetchData` is invoked again within the delay period, the timer will be reset, postponing the execution of `fetchData`.

You can replace `fetchData` with your own function or logic that needs to be debounced.

Feel free to customize the `debounce`