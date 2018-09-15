/**
 * 문제 1. 생성자
 */
function Person(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

const person = new Person('이름', 29, '사는 곳');
const person2 = new Person('이름2', 30, '사는 곳2');

Person.prototype.sayInfo = function() {
  return this.name + '님이 사는 곳은 ' + this.address + '이며 나이는 ' + this.age + '세 입니다.';
};

console.log(person.sayInfo()); // 출력: 이름님이 사는 곳은 사는 곳이며 나이는 29세 입니다.
console.log(person2.sayInfo()); // 출력: 이름2님이 사는 곳은 사는 곳2이며 나이는 30세 입니다.

/**
 * 문제 2. 프로토타입
 */

String.prototype.sayString = function() {
  return this + '을 입력하셨네요';
};

console.log('문자열'.sayString()); // 출력: 문자열을 입력하셨네요.
