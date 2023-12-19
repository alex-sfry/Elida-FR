// Sorting array of numbers sortA - ascending, sortB - descending
const sortA = numbers => {
    return numbers.sort((a, b) => { return a - b })
}
const sortB = numbers => {
    return numbers.sort((a, b) => { return b - a })
}
//===================================================================

// function receives string and returns qty of unique symbols
const uniqueChars = str => {
    const mySet = new Set();
    let count = 0;
    str.split('').forEach(item => {
        mySet.add(item)
    })
    mySet.forEach(value => {
        count++
    })
    return count;
}
//===================================================================

// function range(min, max) returns Iterable object from min to max
const range = (min, max) => {
    return {
        [Symbol.iterator]: () => {
            let current = min;
            let last = max;
            return {
                next() {
                    if (current <= last) {
                        return {
                            done: false,
                            value: current++
                        };
                    } else return { done: true }
                }
            }
        }
    }
}
//===================================================================

// function delay(ms), can be used as 'await delay(100)' to pause execution
const delay = ms => {
    return new Promise((res) => setTimeout(res, ms))
}
//===================================================================

//// reverse string (recursion)
function reverseStr(str) {
    if (str === '') {
        return str;
    } else {
        const lastIndex = str.length - 1;
        return str[lastIndex] + reverseStr(str.slice(str[lastIndex], str.length - 1));
    }
};
//===================================================================

// function counts length of string (recursion)
function len(str, count = 0) {
    if (str === '') {
        return count;
    } else {
        return len(str.slice(1), count + 1);
    }
}
//===================================================================

// function receives chance(%) and returns true with probability of chance
const checkLuck = chance => {
    if (Math.random() <= chance / 100) {
        return true;
    } else return false;
}
//===================================================================

// factorial (n!) (recursion)
const fac = n => {
    if (n === 1) {
        return 1;
    } else {
        return n * (fac(n - 1));
    }
};
//===================================================================

// function returns n(th) fibo number (recursion)

const fib = n => {
    if (n == 1 || n == 2) {
        return 1;
    } else {
        return fib(n - 2) + fib(n - 1);
    }
}
//===================================================================

// random integer number between min and max (both included)
const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//===================================================================

// debounce

const debounce = (fn, delay) => {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments) }
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, delay)
    };
}
//===================================================================

// throttle

const throttle = (func, ms) => {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}


export {
    sortA,
    sortB,
    uniqueChars,
    range,
    delay,
    reverseStr,
    len, checkLuck,
    fac,
    fib,
    getRndInteger,
    debounce,
    throttle
};