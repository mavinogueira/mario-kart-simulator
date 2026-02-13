const Item = require("../domain/Item");

class Shell extends Item {
  constructor() {
    super("Shell");
  }

  use(user, target, raceContext) {
    if (!target) {
      console.log(`${user.name} tentou usar um casco, mas não havia alvo!`);
      return;
    }

    target.setStatus("stunned");
    console.log(`${user.name} lançou um casco em ${target.name}! ${target.name} ficará atordoado no próximo turno.`);
  }
}

module.exports = Shell;
