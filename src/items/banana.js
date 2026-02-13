const Item = require("../domain/Item");
const Dice = require("../engine/dice");

class Banana extends Item {
  constructor() {
    super("Banana");
  }

  use(user, target, raceContext) {
    if (!target) {
      console.log(`${user.name} jogou uma banana, mas ninguém estava atrás!`);
      return;
    }

    if (Dice.chance(50)) {
      target.setStatus("stunned");
      console.log(`${target.name} escorregou na banana de ${user.name} e perdeu o próximo turno!`);
    } else {
      console.log(`${target.name} desviou da banana de ${user.name}!`);
    }
  }
}

module.exports = Banana;
