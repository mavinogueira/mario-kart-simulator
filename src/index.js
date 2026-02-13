const Player = require("./domain/Player");
const Track = require("./domain/Track");
const RaceEngine = require("./engine/raceEngine");

async function main() {
  console.log("🏎️  Mario Kart Simulator (Terminal Edition)\n");

  // Jogadores
  const player1 = new Player("Você", true);
  const bot1 = new Player("Luigi");
  const bot2 = new Player("Toad");

  const players = [player1, bot1, bot2];

  // Pista
  const track = new Track(30);

  // Engine
  const engine = new RaceEngine(players, track);

  await engine.start();

  console.log("\n🎉 Corrida finalizada!");
}

main();
