// 1
class Caller {
    static #callCounter = 0

    callMe() {
        this.constructor.#callCounter++
    }

    callCount() {
        return this.constructor.#callCounter
    }
}

const a = new Caller()
const b = new Caller()

console.log(a.callCount())
a.callMe()
b.callMe()
b.callMe()
console.log(a.callCount())
console.log(b.callCount())


// 2
class PersonGenderError extends Error {
    constructor(message) {
        super(message);
    }
}

class Person {
    static GENDER = {
        NOT_DEFINED: 0,
        MAN: 1,
        WOMAN: 2
    }

    name = 'NoName'
    #personGender = Person.GENDER.NOT_DEFINED

    get gender() {
        return this.#personGender
    }

    set gender(gender) {
        if (Object.keys(Person.GENDER).some(key => Person.GENDER[key] === gender)) {
            this.#personGender = gender
        } else {
            throw new PersonGenderError('Invalid gender')
        }
    }

    constructor(name, gender) {
        if (name) {
            this.name = name
        }

        this.gender = gender
    }
}



const alex = new Person('Alex', 2)
console.log(alex.gender)
alex.gender = 1
console.log(alex.gender)


// 3
class PersonLog extends Person {
    personLogs = []

    setLoggedProperty(property, value) {
        const oldValue = super[property]
        try {
            super[property] = value
            if (this.personLogs) {
                this.personLogs.push(`${property}: ${oldValue} ${value}`)
            }
        } catch(e) {
            console.log(e.message)
        }
    }

    get logs() {
        return this.personLogs
    }

    set logs(value) {
        throw new Error('The readOnly property cannot be written')
    }

    get name() {
        return super.name
    }

    set name(name) {
        this.setLoggedProperty('name', name)
    }

    get gender() {
        return super.gender
    }

    set gender(gender) {
        this.setLoggedProperty('gender', gender)
    }



    constructor(name, gender) {
        super(name, gender)
    }
}

const bob = new PersonLog('Bob', 2)
bob.gender = 1
bob.gender = 3
bob.gender = 2
bob.name = 'Max'
bob.gender = 0
console.log(bob.gender)
console.log(bob.name)
console.log(bob.logs)