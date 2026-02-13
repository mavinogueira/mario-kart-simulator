const Dice = require("./dice");
const Shell = require("../items/shell");
const Banana = require("../items/banana");
const Boost = require("../items/boost");
const terminal = require("../io/terminal");

class RaceEngine {
  constructor(players, track) {
    this.players = players;
    this.track = track;
    this.turn = 1;
    this.finished = false;
  }

  async start() {
    console.log("🏁 Corrida iniciada!\n");

    while (!this.finished) {
      console.log(`--- Turno ${this.turn} ---`);
      await this.executeTurn();
      this.checkWinner();
      this.turn++;
      console.log("");
    }

    terminal.closeTerminal();
  }

  async executeTurn() {
    for (const player of this.players) {

      if (player.status === "stunned") {
        console.log(`${player.name} está atordoado e perde o turno!`);
        player.setStatus("normal");
        continue;
      }

      // Chance de ganhar item
      if (Dice.chance(40)) {
        const item = this.getRandomItem();
        player.addItem(item);
        console.log(`${player.name} recebeu um item: ${item.name}`);
      }

      // USO DE ITEM
      if (player.items.length > 0) {

        if (player.isHuman) {
          const wantsToUse = await terminal.askUseItem(player);

          if (wantsToUse) {
            const item = await terminal.chooseItem(player);
            if (item) {
              const target = this.getTarget(player, item);
              item.use(player, target, this);
            }
          }

        } else {
          // BOT automático
          if (Dice.chance(50)) {
            const item = player.items.shift();
            const target = this.getTarget(player, item);
            item.use(player, target, this);
          }
        }
      }

      let roll = Dice.roll(1, 6);

      if (player.status === "boosted") {
        roll += 2;
        console.log(`${player.name} está com BOOST! +2 de velocidade`);
        player.setStatus("normal");
      }

      player.move(roll);
      console.log(`${player.name} avançou ${roll} casas (posição: ${player.position})`);
    }

    this.printRanking();
  }

  getRandomItem() {
    const items = [Shell, Banana, Boost];
    const ItemClass = items[Dice.roll(0, items.length - 1)];
    return new ItemClass();
  }

  getTarget(player, item) {
    const ranking = [...this.players].sort((a, b) => b.position - a.position);
    const index = ranking.indexOf(player);

    if (item.name === "Shell" && index > 0) {
      return ranking[index - 1];
    }

    if (item.name === "Banana" && index < ranking.length - 1) {
      return ranking[index + 1];
    }

    return null;
  }

  printRanking() {
    const ranking = [...this.players].sort((a, b) => b.position - a.position);

    console.log("\n📊 Ranking:");
    ranking.forEach((player, index) => {
      console.log(`${index + 1}º - ${player.name} (${player.position})`);
    });
    console.log("");
  }

  checkWinner() {
    for (const player of this.players) {
      if (this.track.hasFinished(player)) {
        console.log(`🏆 ${player.name} venceu a corrida!`);
        this.finished = true;
        break;
      }
    }
  }
}

module.exports = RaceEngine;
