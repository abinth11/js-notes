
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


## Throttling Function

The `throttle` function is designed to limit the rate at which a given function is called. It ensures that the function is invoked at most once within a specified time period. Throttling is useful in scenarios where you want to control the frequency of function calls, particularly for actions that can be resource-intensive or impact performance.

### Function Signature

```javascript
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
```

### Parameters

- `fn`: The function to be throttled. This is the function that will be executed within the throttle limit.
- `limit`: The time limit in milliseconds that specifies the minimum interval between function invocations.

### Explanation

1. The `throttle` function is defined using the `function` keyword, which allows access to the `arguments` object within the function body.

2. It returns an inner function that serves as the throttled version of the original function (`fn`).

3. The throttled function checks the `flag` variable to determine if the function is currently allowed to execute. If the `flag` is `true`, indicating that the function is not in a cooldown period, the original function (`fn`) is executed.

4. After executing the original function, the `flag` variable is set to `false`, indicating that the throttled function is now in a cooldown period and should not execute the original function again immediately.

5. A `setTimeout` function is used to delay setting the `flag` back to `true` after the specified `limit` time. This establishes a time window during which the throttled function will not execute the original function, even if it is called.

6. Within the `setTimeout` callback function, the `flag` is set to `true`, allowing the throttled function to execute the original function again once the cooldown period has passed.

### Usage

To use the `throttle` function, create a throttled version of any function by passing it as the first argument and specifying the desired throttle limit in milliseconds as the second argument.

Here's an example:

```javascript
function doSomething() {
  let count = 0;
  console.log("called do something", count++);
}

const throttledDoSomething = throttle(doSomething, 300);
```

In this example, `doSomething` is the original function that we want to throttle, and `300` is the throttle limit in milliseconds. Adjust the limit according to your requirements.

Now, whenever `throttledDoSomething` is called, it will execute the `doSomething` function only once within a 300-millisecond interval. If `throttledDoSomething` is called multiple times within that interval, only the first call will execute the original function.

You can replace `doSomething` with your own function or logic that needs to be throttled.


### Throttling vs. Debouncing: A Comparison

**Throttling** and **debouncing** are both techniques used to control the frequency of function calls, but they differ in how they achieve this goal and the use cases they are best suited for.

#### Throttling:

- **Definition**: Throttling limits the rate at which a function is called, ensuring that it is invoked at most once within a specified time interval.
- **Function Execution**: Throttling allows the function to execute immediately when called for the first time within the throttle limit, and then waits for the specified time interval before allowing another execution.
- **Execution Pattern**: Throttled functions are executed at regular intervals, maintaining a consistent execution rate.
- **Use Cases**:
  - Limiting the rate of function calls in response to continuous events like scroll, resize, or keystrokes.
  - Preventing multiple rapid clicks on a button or element to avoid triggering unintended actions.
  - Controlling the frequency of API requests to avoid overwhelming the server.

#### Debouncing:

- **Definition**: Debouncing delays the execution of a function until a certain amount of time has passed without any further invocations.
- **Function Execution**: Debouncing starts a timer when the function is called, and if the function is called again within the specified time interval, the timer is reset. The function is only executed after a pause in the input or event stream.
- **Execution Pattern**: Debounced functions are executed after a quiet period, discarding intermediate function calls and executing only the final call made within the debounce limit.
- **Use Cases**:
  - Handling user input events like typing in search boxes or autocomplete suggestions.
  - Performing expensive computations or API requests only after the user has finished interacting with a UI element.
  - Preventing unnecessary UI updates or rendering while the user is actively interacting with the interface.

### Choosing Between Throttling and Debouncing:

- **Throttling** is suitable when you want to enforce a minimum delay between function invocations. It ensures that the function is executed at regular intervals, regardless of the frequency of calls within that interval.
- **Debouncing** is suitable when you want to handle actions that occur in rapid succession but only need to respond to the final action or a pause in the input stream. It allows you to wait for a quiet period before triggering the function, discarding intermediate calls.

When deciding whether to use throttling or debouncing, consider the specific requirements of your use case and how you want the function to behave in terms of execution rate and response to rapid calls.

By understanding the differences between throttling and debouncing and their respective use cases, you can choose the most appropriate technique to control function invocation frequency and optimize your application's performance.

