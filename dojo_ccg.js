class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name, cost);
        this.power = power;
        this.res = res;
    }
    
    play(){
        console.log(`${this.name}: ${this.power} power, ${this.res} resilience`)
    }

    attack(target){
        const damage = (target.res * this.power)
        target.res -= damage;
        console.log (`${this.name} attacked ${target.name}, dealing ${damage} damage`);
        target.play()
    }
}

class Effect extends Card {
    constructor(name, cost, stat, magnitude, target){
        super(name, cost);
        this.stat = stat;
        this.magnitude = magnitude;
        this.target = target;
    }

    playEffect(target){
        if (target instanceof Unit) {
            if (this.stat === "resilience") {
                target.res += this.magnitude;
            }
            else {
                target.power += this.magnitude;
            }
            console.log(`${this.name} was played on ${target.name}`);
            if (this.magnitude > 0){
                var direction = "Increase";
            }
            else {
                var direction = "Decrease";
            }
            console.log(`${direction} ${target.name}'s ${this.stat} by ${this.magnitude}`);
            target.play();
        } 
        else {
            throw new Error( "Target must be a unit!" );
        }
    }
}

const RedBeltNinja = new Unit("Red Belt Ninja", 3, 3, 5)
const BlackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4)
const HardAlgorithm = new Effect("Hard Algorithm", 2, "resilience", 3)
const UnhandledPromiseRejection = new Effect("Unhandled Promise Rejection", 1, "resilience", -2)
const PairProgramming = new Effect("Pair Programming", 3, "power", 2)

HardAlgorithm.playEffect(RedBeltNinja)
RedBeltNinja.attack(BlackBeltNinja)
UnhandledPromiseRejection.playEffect(BlackBeltNinja)
PairProgramming.playEffect(RedBeltNinja)