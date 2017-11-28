//todo 1
/*
var generator = sequence(10, 3);
var generator2 = sequence(7, 1);
console.log(generator()); // 10
console.log(generator()); // 13
console.log(generator2()); // 7
console.log(generator()); // 16
console.log(generator2()); // 8*/

function sequence(start, step) {
    if(!start)
        start = 0;
    if(!step)
        step = 1;
    var i = 0;
    return function() {
        if (i > 0) {
            return start += step;
        }
        else {
            i++;
            return start;
        }
    }
}

//todo 2
/*
 var gen2 = sequence(0, 2);
 console.log(take(gen2, 5)); // [0, 2, 4, 6, 8 ]*/
function take(fn, count) {
    var arr = [];
    for (var i = count; i > 0; i--) {
        arr.push(fn());
    }
    return arr;
}

//todo 3
/*
function square(x) { return x * x; } // возведение в квадрат
console.log(map(square, [1, 2, 3, 4])); // [1, 4, 9, 16]
console.log(map(square, [])); // []

var arr = [1, 2, 3];
console.log(map(square, arr)); // [1, 4, 9]
console.log(arr); // [1, 2, 3]*/

function map(fn, array) {
    var arr = [];
    for (var i = 0, len = array.length; i < len; i++){
        arr.push(fn(array[i]));
    }
    return arr;
}

//todo 4
/*
var gen = sequence(1, 1);
function square(x) { return x * x; }
var squareGen = fmap(square, gen);

function add(a, b) {
    return a + b;
}
var squareAdd = fmap(square, add);
console.log(squareAdd(2, 3)); // 25 = (2 + 3) ^ 2
console.log(squareAdd(5, 7)); // 144 = (5 + 7) ^ 2

console.log(squareGen()); // 1
console.log(squareGen()); // 4
console.log(squareGen()); // 9
console.log(squareGen()); // 16*/

function fmap(a, gen) {
    return function() {
        return a(gen.apply(null, arguments));
    }
}

//todo 5
/*function add(a, b) { return a + b; }
function mult(a, b, c, d) { return a * b * c * d; }

var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13

var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6*/

function partial(fn, ...argsPart) {
    return function(...argsFn) {
        return fn.apply(null, argsPart.concat(argsFn));
    }
}

//todo 6 - ERROR - может вызываться несколько раз и результаты во второй раз не зависят от первого => не можу зрозуміти як це виправити?
function test(a, b, c) { return 'a=' + a + ',b=' + b + ',c=' + c; }
var test1_3 = partialAny(test, 1, undefined, 3);
console.log(test1_3(5)); // a=1,b=5,c=3

function partialAny(fn, ...argsPart) {
    var argsNew = argsPart.slice();
    return function(...argsFn) {
        var argsTemp = argsFn.slice();
        for(var i = 0, len = argsNew.length; i < len; i++) {
            if(argsNew[i] === undefined) {
                argsNew[i] = argsTemp.shift();
            }
        }
        return fn.apply(null, argsNew.concat(argsTemp));
    }
}

/*function partialAny(fn, ...argsPart) {
    return function(...argsFn) {
        for(var i = 0, len = argsPart.length; i<len; i++) {
            if(argsPart[i] === undefined) {
                argsPart[i] = argsFn.shift();
            }
        }
        return fn.apply(null, argsPart.concat(argsFn));
    }
}*/

//todo 7
/*window.x = 1;
var ctx = { x: 2 };

function testThis(a) { console.log("x=" + this.x + ", a=" + a); }
console.log(testThis(100)); // x=1, a=100
var boundFunction = bind(testThis, ctx);
console.log(boundFunction(100)); // x=2, a= 100*/

function bind(fn, context) {
    return function() {// (*)
        return fn.apply(context, arguments);
    };
}

//todo 8
/*var characters = [
    { 'name': 'barney', 'age': 36 },
    { 'name': 'fred', 'age': 40 }
];

console.log(pluck(characters, 'name')); // ['barney', 'fred']*/

function pluck(objects, fieldName) {
    var arr = [];
    for (var i = 0, len = objects.length; i < len; i++){
        if (objects[i].hasOwnProperty(fieldName)){
            arr.push(objects[i][fieldName]);
        }
    }
    return arr;
}

//todo 9
/*var input = [1, 2, 3, 4, 5, 6];
function isEven(x) { return x % 2 == 0; } // проверяет на четность
console.log(filter(input, isEven)); // [2, 4, 6]
console.log(input); // [1, 2, 3, 4, 5, 6]*/

function filter(arr, func) {
    var arrFiltered = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var j = arr[i];
        if (func(j) === true) {
            arrFiltered.push(j);
        }
    }
    return arrFiltered;
}

//todo 10
/*var a = { a: 1, b: 2 };
console.log(count(a)); // 2
var b = function () {};
console.log(count(b)); // 0
var c = [1, 2, 3];
console.log(count(c)); // 3
var d = [];
d[100] = 1;
console.log(count(d)); // 1*/

function count (obj) {
    return Object.keys(obj).length;
}
