console.log("Тест sum:", sum(1, 2, 3) === 6);
console.log("Тест createUser:", createUser({ name: "Иван", age: 25 }) === "Пользователь: Иван, возраст: 25, email: не указан");

const secret = secretMessage("123", "Секрет");
console.log("Тест secretMessage:", secret("123") === "Секрет" && secret("wrong") === "Доступ запрещен");

// Т
const double = x => x * 2;
const add5 = x => x + 5;
console.log("Тест compose:", compose(add5, double)(5) === 15);

console.log("Тест myMap:", JSON.stringify(myMap([1, 2, 3], double)) === JSON.stringify([2, 4, 6]));
console.log("Тест myFilter:", JSON.stringify(myFilter([1, 2, 3, 4], x => x % 2 === 0)) === JSON.stringify([2, 4]));
console.log("Тест myReduce:", myReduce([1, 2, 3], (acc, x) => acc + x, 0) === 6);

const multiply = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiply);
console.log("Тест curry:", curriedMultiply(2)(3)(4) === 24);

const memoizedSum = memoize(sum);
console.log("Тест memoize:", memoizedSum(1, 2, 3) === 6);

const validator = createValidator({ minLength: 6, requireDigits: true, requireUppercase: true });
console.log("Тест validator:", validator("Pass123") === true && validator("short") === false);