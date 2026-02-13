const Item = require("../domain/Item");

class Boost extends Item {
  constructor() {
    super("Boost");
  }

  use(user, target, raceContext) {
    user.setStatus("boosted");
    console.log(`${user.name} usou um turbo e ganhará velocidade extra neste turno!`);
  }
}

module.exports = Boost;
