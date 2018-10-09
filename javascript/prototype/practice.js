/* 객체를 다루지 않으면 자바 스크립트에서 아주 멀리 떨어져있을 수 없습니다. 
그것들은 JavaScript 프로그래밍 언어의 거의 모든 측면에 기초합니다. 

객체는 키 / 값 쌍입니다. 
객체를 만드는 가장 일반적인 방법은 중괄호 {}를 사용하는 것이며 점 표기법을 사용하여 객체에 속성과 메소드를 추가합니다. */

let animal = {};
animal.name = 'Leo';
animal.energy = 10;

animal.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

animal.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

animal.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

/* 지금 우리의 적용에서 우리는 하나 이상의 동물을 만들어야 합니다.
당연히 이 다음 단계는 새로운 동물을 만들 필요가있을 때마다 우리가 호출 할 수있는 함수 안에 그 논리를 캡슐화하는 것입니다. 
이 패턴은 Functional Instantiation이라고 부르며, 새로운 객체를 "구성"하는 역할을하기 때문에 함수 자체를 "생성자 함수"라고 부릅니다.  */

function Animal(name, energy) {
  let animal = {};
  animal.name = name;
  animal.energy = energy;

  animal.eat = function(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  };

  animal.sleep = function(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  };
  animal.play = function(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  };

  return animal;
}

const leo = Animal('Leo', 7);
const snoop = Animal('Snoop', 10);

/* 이제 우리가 새로운 인스턴스를 만들고 싶을 때마다 동물의 이름과 에너지 수준을 전달하는 동물 함수를 호출해야합니다. 
우리가 해결하려고 시도하는 것 중 가장 큰 것은 먹고, 자고, 놀리는 세 가지 방법과 관련이 있습니다. 
이것이 의미하는 바는 새로운 동물을 만들 때마다 우리가 현재하고있는 것처럼 그 방법들을 다시 만들 이유가 없다는 것입니다. 
우리는 이 패턴을 Shared Methods로 Functional Instantiation이라고 부를 수 있습니다. */

const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  },
  playing(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= amount;
  },
};

function Animal(name, energy) {
  let animal = {};
  animal.name = name;
  animal.energy = energy;
  animal.eat = animalMethods.eat;
  animal.sleep = animalMethods.sleep;
  animal.play = animalMethods.play;

  return animal;
}

/*공유 메서드를 자신의 개체로 이동하고 Animal 함수 내에서 해당 개체를 참조하면 메모리 낭비와 지나치게 큰 동물 개체 문제를 해결할 수 있습니다. */

const leo = Animal('Leo', 7);
const snoop = Animal('Snoop', 10);

/* Object.create를 사용하면 실패한 조회에서 다른 객체에 위임 할 객체를 만들 수 있습니다. 
다르게 말하면, Object.create는 객체를 생성 할 수있게 해 주며, 
객체에 대한 속성 조회가 실패 할 때마다 다른 객체를 참조하여 다른 객체가 그 속성을 가지고 있는지 확인할 수 있습니다.  */

const parent = {
  name: 'Stacey',
  age: 35,
  heritage: 'Irish',
};

const child = Object.create(parent);
child.name = 'Ryan';
child.age = 7;

console.log(child.name); // Ryan
console.log(child.age); // 7
console.log(child.heritage); // Irish

/* 그래서 위의 예제에서는 자식이 Object.create (부모)로 만들어 졌기 때문에 자식에 대한 속성 조회가 실패 할 때마다 
JavaScript는 해당 조회를 부모 객체에 위임합니다. 자식이 가지고 있지 않더라도, 부모가 기록 할 때 그렇게합니다.   */

const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  },
  play(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  },
};

function Animal(name, energy) {
  let animal = Object.create(animalMethods);
  animal.name = name;
  animal.energy = energy;

  return animal;
}

const leo = Animal('Leo', 7);
const snoop = Animal('Snoop', 10);

leo.eat(10);
snoop.play(5);

/* 이제 leo.eat를 호출하면 JavaScript가 leo 객체에서 eat 메서드를 찾습니다.  Object.create 때문에, 그것은 먹는 곳인 animalMethods 객체에 위임 할 것입니다.
여러 인스턴스에서 메소드를 공유하기 위해 별도의 객체 (animalMethods)를 관리해야하는 "해킹"이 조금 있습니다. 
이것은 언어 자체로 구현되기를 원하는 공통적 인 기능처럼 보입니다. - 프로토 타입입니다.
그렇다면 JavaScript의 프로토 타입은 무엇입니까? 간단히 말해서 JavaScript의 모든 함수에는 객체를 참조하는 프로토 타입 속성이 있습니다.  */

function doThing() {}
console.log(doThing.prototype);

/* 메소드를 관리하기 위해 별도의 객체를 생성하는 대신에, 그 메소드 각각을 Animal 함수의 프로토 타입에 넣을까요? 
그러면 할 일은 Object.create를 사용하여 animalMethods에 위임하는 대신 Animal.prototype에 위임하는 데 사용할 수 있습니다. 
이 패턴을 Prototypal Instantiation이라고합니다.  */

function Animal(name, energy) {
  let animal = Object.create(Animal.prototype);
  animal.name = name;
  animal.energy = energy;

  return animal;
}

Animal.prototype.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

Animal.prototype.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

Animal.prototype.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

const leo = Animal('Leo', 7);
const snoop = Animal('Snoop', 10);

leo.eat(10);
snoop.play(5);

/* 프로토 타입은 JavaScript의 모든 함수가 가지고있는 속성 일뿐입니다. 함수의 모든 인스턴스에서 메소드를 공유 할 수 있습니다. 
모든 기능은 여전히 동일하지만 이제는 모든 메서드에 대해 별도의 개체를 관리하는 대신 Animal 함수 자체에 내장 된 다른 개체 인 Animal.prototype을 사용할 수 있습니다. */

/*이 시점에서 우리는 세 가지를 알 수 있습니다.

- 생성자 함수를 만드는 방법.
- 생성자 함수의 프로토 타입에 메소드를 추가하는 방법.
- Object.create를 사용하여 실패한 조회를 함수의 프로토 타입에 위임하는 방법.
자바 스크립트는 "내장 된"방법이 없어서 이 시점에서 새로운 키워드를 사용합니다.

Animal 생성자를 살펴보면, 가장 중요한 두 부분은 객체를 생성하고 반환하는 것입니다. 
Object.create를 사용하여 객체를 만들지 않으면 실패한 조회에서 함수의 프로토 타입에 위임 할 수 없습니다. return 문 없이는 생성 된 객체를 반환하지 않습니다.  */

funtion Animal(name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}

/* 새 키워드를 사용하여 함수를 호출하면 두 줄이 암시 적으로 수행됩니다 ( "내부적으로"). 생성 된 객체를 this라고합니다.  */

function Animal (name, energy){
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy
  
  // return this
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

/* and without the “under the hood” comments  */

function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

Animal.prototype.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

Animal.prototype.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

const leo = new Animal('Leo', 7);
const snoop = new Animal('Snoop', 10);

/* 다시 이 함수가 작동하고 이 객체가 생성 된 이유는 new 키워드를 사용하여 constructor 함수를 호출했기 때문입니다. 
함수를 호출 할 때 new를 사용하지 않으면이 객체가 절대 생성되지 않고 암시 적으로 반환됩니다.
아래 패턴의 이름은 Pseudoclassical Instantiation 입니다. */

function Aniaml(name, energy) {
  this.name = name;
  this.energy = energy;
}

const leo = Animal('Leo', 7);
console.log(leo); // undefined

/* 익숙하지 않은 사람들을 위해 Class는 객체에 대한 청사진을 만들 수 있게합니다. 
그런 다음 해당 클래스의 인스턴스를 만들 때마다 청사진에 정의 된 속성 및 메서드를 사용하여 개체를 가져옵니다.
기본적으로 위의 Animal 생성자 함수로 수행 한 작업입니다. 
그러나 class 키워드를 사용하는 대신 기존의 JavaScript 함수를 사용하여 동일한 기능을 다시 만들었습니다. 
2015 년에 Class와 class 키워드를 지원하는 EcmaScript (공식 JavaScript 사양) 6이 릴리스되었습니다. 위의 Animal 생성자 함수가 새로운 클래스 구문과 어떻게 비슷하게 생겼는지 살펴 보겠습니다.  */

class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  }
  play(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  }
}

const leo = new Animal('Leo', 7);
const snoop = new Animal('Snoop', 10);

/*  왜 우리는 옛날 방식으로 많은 시간을 할애 했습니까? 그 이유는 (class 키워드를 사용하는) 새로운 방법이 우리가 pseudoclassical 패턴이라고 부르는 기존 방식에 비해 주로 
쉽게 디자인 되었기 때문입니다. ES6 클래스의 편리한 구문을 완전히 이해하려면 먼저 의사 클래스 패턴을 이해해야합니다. */

/* Array Methods */

/*클래스의 인스턴스간에 메소드를 공유하려면 클래스 (또는 함수) 프로토 타입에 해당 메소드를 붙여야합니다.
 Array 클래스를 보면이 동일한 패턴이 증명 된 것을 볼 수 있습니다. */

const friends = [];

/* 이것이 Array 클래스의 새로운 인스턴스를 만드는 것 이상입니다. */

const friendsWithSugar = [];

const friendsWithoutSugar = new Array();

/* 한 가지 생각해 보지 못한 것은 배열의 모든 인스턴스가 메서드 (스플 라이스, 슬라이스, 팝 등)로 만들어진 모든 것을 어떻게 갖게되는 것입니까?
이제 알다시피, 그 방법은 Array.prototype에 살고 있기 때문에 Array의 새 인스턴스를 만들 때 new 키워드를 사용합니다.이 키워드는 실패한 조회의 Array.prototype에 위임을 설정합니다.
Array.prototype을 기록하기 만하면 모든 배열의 메소드를 볼 수 있습니다.*/

console.log(Array.prototype);

/* 객체에 대해서도 똑같은 논리가 존재합니다. Alls 객체는 실패한 조회에서 Object.prototype에 위임하므로 모든 객체에 toString 및 hasOwnProperty와 같은 메소드가 있습니다. */

/* Static Methods
이 시점까지는 클래스의 인스턴스간에 메소드를 공유하는 이유와 방법을 다루었습니다. 
그러나 클래스에 중요하지만 인스턴스간에 공유 할 필요가없는 메소드가 있다면 어떨까요? 
예를 들어, 일련의 Animal 인스턴스를 가져 와서 다음에 먹을 필요가있는 인스턴스를 결정하는 함수가 있다면 어떻게 될까요?  */

function nextToEat(animals) {
  const sortedByLeastEnergy = animals.sort((a, b) => {
    return a.energy - b.energy;
  });

  return sortedByLeastEnergy[0].name;
}

/* 우리가 모든 인스턴스간에 공유하고 싶지 않기 때문에 nextToEat를 Animal.prototype에 게시하는 것은 이치에 맞지 않습니다. 
nextToEat가 Animal.prototype에 살면 안되면 어디에 넣어야합니까?  Animal 클래스와 같은 범위에서 nextToEat를 붙일 수 있고 우리가 평소처럼 그것을 필요로 할 때 참조 할 수 있다는 것입니다. */

class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  }
  play(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  }
}

function nextToEat(animals) {
  const sortedByLeastEnergy = animals.sort((a, b) => {
    return a.energy - b.energy;
  });

  return sortedByLeastEnergy[0].name;
}

const leo = new Animal('Leo', 7);
const snoop = new Animal('Snoop', 10);

console.log(nextToEat([leo, snoop]));

/* 클래스 자체에 고유하지만 해당 클래스의 인스턴스에서 공유 할 필요가없는 메소드가있을 때마다 클래스의 정적 속성으로 추가 할 수 있습니다.  */

class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  }
  play(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  }
  static nextToEat(animals) {
    const sortedByLeastEnergy = animals.sort((a, b) => {
      return a.energy - b.energy;
    });

    return sortedByLeastEnergy[0].name;
  }
}

/* 이제 nextToEat를 클래스의 정적 속성으로 추가했기 때문에 Animal 클래스 자체 (프로토 타입이 아님)에 있으며 Animal.nextToEat를 사용하여 액세스 할 수 있습니다.  */

const leo = new Animal('Leo', 7);
const snoop = new Animal('Snoop', 10);

console.log(Animal.nextToEat([leo, snoop]));

/* ES5를 사용하여 이와 동일한 작업을 수행하는 방법을 살펴 보겠습니다. 
위의 예제에서 static 키워드를 사용하여 메소드를 클래스 자체에 직접 배치하는 방법을 살펴 보았습니다. 
ES5의 경우 이와 동일한 패턴은 함수 객체에 메소드를 수동으로 추가하는 것만큼 간단합니다.  */

function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

Animal.prototype.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

Animal.prototype.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

Animal.nextToEat = function(animals) {
  const sortedByLeastEnergy = animals.sort((a, b) => {
    return a.energy - b.energy;
  });

  return sortedByLeastEnergy[0].name;
};

const leo = new Animal('Leo', 7);
const snoop = new Animal('Snoop', 10);

console.log(Animal.nextToEat([leo, snoop])); // Leo

/* 객체의 프로토 타입 얻기 */
/* 오브젝트를 작성하는 데 사용한 패턴에 관계없이 오브젝트의 프로토 타입을 가져 오는 것은 Object.getPrototypeOf 메소드를 사용하여 수행 할 수 있습니다.  */

function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

Animal.prototype.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

Animal.prototype.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

const leo = new Animal('Leo', 7);
const prototype = Object.getPrototypeOf(leo);

console.log(prototype);

prototype === Animal.prototype;

/* proto는 4 가지 메소드, 생성자, 먹기, 수면 및 재생 기능을 가진 객체라는 것을 알 수 있습니다. 
인스턴스에서 전달하는 getPrototypeOf를 사용하여 모든 프로토 타입이 살아있는 인스턴스의 프로토 타입을 가져 왔습니다. 
기본적으로 프로토 타입 객체에는 원래 함수 또는 인스턴스가 생성 된 클래스를 가리키는 생성자 속성이 있습니다. 
이것이 의미하는 바는 JavaScript가 기본적으로 프로토 타입에 생성자 속성을 배치하기 때문에 모든 인스턴스가 instance.constructor를 통해 생성자에 액세스 할 수 있다는 것입니다.

Animal 생성자 함수는 모든 인스턴스에서 메소드를 공유 할 수있는 프로토 타입 속성을 가지고 있으며 getPrototypeOf를 사용하면 인스턴스 자체의 프로토 타입을 볼 수 있습니다.  */

function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

const leo = new Animal('Leo', 7);
console.log(leo.constructor);

/* 이전에 Object.create를 사용하여 이야기 한 내용과 관련 지을 수있는 이유는 Animal의 모든 인스턴스가 실패한 조회에서 Animal.prototype에 위임하기 때문입니다. 
따라서 leo.prototype에 액세스하려고하면 레오는 프로토 타입 속성이 없으므로 실제로 해당 생성자 속성이있는 Animal.prototype에 해당 조회를 위임합니다.  */

/* 프로퍼티가 프로토 타입에 존재하는지 확인하기 */
/* 프로퍼티가 인스턴스 자체에 존재하는지 또는 객체가 위임하는 프로토 타입에 존재하는지 여부를 알아야하는 특정 경우가 있습니다. 
for 루프를 사용하면 아마 이렇게 생겼을 것입니다.  */

function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

Animal.prototype.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

Animal.prototype.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

const leo = new Animal('Leo', 7);

for (let key in leo) {
  console.log(`key: ${key}. Value: ${leo[key]}`);
}

/*  for 루프는 객체 자체와 위임 한 프로토 타입 모두에서 열거 가능한 모든 속성을 반복합니다. 
기본적으로 함수의 프로토 타입에 추가하는 속성은 모두 열거 할 수 있기 때문에 이름과 에너지뿐만 아니라 프로토 타입에있는 모든 메서드 (먹고 잠자고 재생하는 방법)를 볼 수 있습니다. 
이 문제를 해결하기 위해 모든 프로토 타입 메소드를 열거 할 수 없도록 지정하거나 속성이 레오 객체 자체에 있고 레오가 실패한 조회에 위임 한 프로토 타입이 아니라면 console.log 만 사용해야합니다. 
여기서 hasOwnProperty가 우리를 도울 수 있습니다.

hasOwnProperty는 객체가 위임 할 프로토 타입이 아닌 자체 속성으로 지정된 속성을 갖는지 여부를 나타내는 부울 값을 반환하는 모든 객체의 속성입니다. 
이제 for 루프 내부에서 hasOwnProperty를 활용하도록 코드를 수정할 수 있습니다.  */

function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

Animal.prototype.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

Animal.prototype.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

const leo = new Animal('Leo', 7);

for (let key in leo) {
  if (leo.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${leo[key]}`);
  }
}

/* 이런 방법도 가능합니다.  */

leo.hasOwnProperty('name'); // true
leo.hasOwnProperty('energy'); // true
leo.hasOwnProperty('eat'); // false
leo.hasOwnProperty('sleep'); // false
leo.hasOwnProperty('play'); // false

/* 객체가 클래스의 인스턴스인지 확인 */
/* 객체가 특정 클래스의 인스턴스인지 여부를 알고 싶어합니다. 이렇게 하려면 instanceof 연산자를 사용할 수 있습니다.   */

object instanceof Class;

/* 위의 명령문은 object가 Class의 인스턴스이면 true를 반환하고 그렇지 않은 경우 false를 반환합니다. 우리의 동물 예제로 돌아가서 우리는 이와 같은 것을 가질 것입니다.  */

function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

function User() {}

const leo = new Animal('Leo', 7);

leo instanceof Animal;
leo instanceof User;

/* instanceof가 작동하는 방식은 객체의 프로토 타입 체인에서 constructor.prototype이 있는지 확인하는 것입니다. 
위 예제에서 Object.getPrototypeOf (leo) === Animal.prototype이므로 leo instanceof Animal이 true입니다. 
또한, Object.getPrototypeOf (leo)! == User.prototype 때문에 leo instanceof User가 false입니다. */

/* 새로운 불변의 생성자 함수 만들기 */
/* 노련한 JavaScript 개발자조차 위의 예에서 가끔씩 망가질 것입니다. 
이전에 배웠던 pseudoclassical 패턴을 사용하기 때문에 Animal 생성자 함수가 호출 될 때 new 키워드로 호출해야합니다. 
그렇지 않으면 this 키워드가 작성되지 않고 암시 적으로 리턴되지 않습니다. .*/

/* 우리가 다른 개발자들과 함께 일하고 있다고 가정하면 Animal 생성자가 항상 새로운 키워드로 호출되도록하는 방법이 있을까요? 
우리가 이전에 배웠던 instanceof 연산자를 사용하면됩니다.

생성자가 new 키워드로 호출 된 경우 생성자 본문의 내부는 생성자 함수 자체의 인스턴스가 됩니다. */

function Animal(name, energy) {
  if (this instanceof Animal === false) {
    console.warn('Forgot to call Animal with the new keyword');
  }
  this.name = name;
  this.energy = energy;
}

/* 이제 함수 소비자에게 경고를 로깅하는 대신 함수를 다시 호출하지만 이번에는 new 키워드를 사용하면 어떨까요? */

function Animal(name, energy) {
  if (this instanceof Animal === false) {
    return new Animal(name, energy);
  }
  this.name = name;
  this.energy = energy;
}

/* 이제 Animal이 new 키워드로 호출되는지 여부와 상관없이 여전히 올바르게 작동합니다. */

/* Object.create 다시 만들기 */
/* 생성자 함수의 프로토 타입에 위임 한 객체를 만들기 위해 Object.create를 많이 사용했습니다. 
이 시점에서 코드 내부에서 Object.create를 사용하는 방법을 알고 있어야하지만 생각하지 못한 한 가지 방법은 Object.create가 실제로 어떻게 작동하는지입니다. 
Object.create가 어떻게 작동하는지 실제로 이해할 수 있도록, 우리는 직접 다시 작성하려고합니다.

- 그것은 객체 인 인수를 취합니다.
- 실패한 조회에서 인수 객체에 위임하는 객체를 만듭니다.
- 새로 생성 된 객체를 반환합니다. 
 */

Object.create = function(objToDelegateTo) {};

/* 실패한 조회에서 인수 객체에 위임 할 객체를 만들어야합니다. 
이건 좀 더 까다 롭습니다. 이를 위해 새 키워드와 프로토 타입이 JavaScript에서 어떻게 작동하는지에 대한 지식을 사용합니다. 
먼저 Object.create 본문 내부에서 빈 함수를 만듭니다. 
그런 다음 빈 함수의 프로토 타입을 인수 객체와 동일하게 설정합니다. 
그런 다음 새 객체를 만들려면 new 키워드를 사용하여 빈 함수를 호출합니다. */

Object.create = function(objToDelegateTo) {
  function Fn() {}
  Fn.prototype = objToDelegateTo;
  return new Fn();
};

/*  위의 코드에서 Fn을 새로 만들면 prototype 속성이 제공됩니다. 
new 키워드를 사용하여이 함수를 호출하면 실패한 조회에서 함수의 프로토 타입에 위임 할 객체가 반환된다는 것을 알 수 있습니다. 
함수의 프로토 타입을 재정의하면 실패한 조회에서 위임 할 객체를 결정할 수 있습니다. 
위의 예에서 Fn의 프로토 타입을 objToDelegateTo라고하는 Object.create가 호출 될 때 전달 된 객체로 대체합니다.*/

/* Arrow Functions */
/* 이 기능은 키워드가 없습니다. 결과적으로 화살표 함수는 생성자 함수가 될 수 없으며 new 키워드로 화살표 함수를 호출하려고하면 오류가 발생합니다. */

const Animal = () => {};

const leo = new Animal(); // Error: Animal is not a constructor

/* 또한, 우리는 pseudoclassical 패턴을 화살표 함수와 함께 사용할 수 없다는 것을 위에서 설명했기 때문에 화살표 함수도 프로토 타입 속성을 가지고 있지 않습니다. */

const Animal = () => {};
console.log(Animal.prototype); // undefined
