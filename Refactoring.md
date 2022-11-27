# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. The function name can be renamed to 'determinePartitionKey' rather 'deterministicPartitionKey' and is more readable.
2. Constant has been  moved outside the function as they are constant values and can be leveraged to some other place as well.
3. The function to create hash can be called once at the top, so we can avoid the duplicate calls in the function and use the one time generated value.
4. The event and candidate has dependency on each other and to some extent code can be moved within event check and rather placing a seperate candidate check. So code has been 
refactored along similar lines. Below code is such an example. 
```
  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
```
5. The length of the candidate can only go beyond 128 chars if it is provided via an event as in the code otherwise we will always land on generating the value of 128 chars. So below code 
can be moved as well if we are receiving the event.
```
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = generatedHash.update(candidate).digest("hex");
    }
```
6. The function determinePartitionKey is more readable now and is mainly seperated in 2 main flows one when event is passed another by setting TRIVIAL_PARTITION_KEY
when no event is passed.
7. The ```JSON.stringify(event)``` result has been stored in ```eventData``` variable instead of just ```data```. 