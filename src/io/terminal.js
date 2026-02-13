const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function askUseItem(player) {
  if (player.items.length === 0) {
    return false;
  }

  const answer = await ask(
    `🎒 ${player.name}, você tem ${player.items.length} item(ns). Deseja usar um item? (s/n): `
  );

  return answer.toLowerCase() === "s";
}

async function chooseItem(player) {
  console.log("\n🧰 Seus itens:");
  player.items.forEach((item, index) => {
    console.log(`${index + 1} - ${item.name}`);
  });

  const answer = await ask("Escolha o número do item: ");
  const index = parseInt(answer, 10) - 1;

  if (index < 0 || index >= player.items.length) {
    console.log("Escolha inválida. Nenhum item será usado.");
    return null;
  }

  return player.items.splice(index, 1)[0];
}

function closeTerminal() {
  rl.close();
}

module.exports = {
  askUseItem,
  chooseItem,
  closeTerminal
};
