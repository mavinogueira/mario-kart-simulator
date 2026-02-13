class Player {
  constructor(name, isHuman = false) {
    this.name = name;
    this.isHuman = isHuman;
    this.position = 0;
    this.speed = 0;
    this.items = [];
    this.status = "normal"; 
  }

  addItem(item) {
    this.items.push(item);
  }

  move(distance) {
    this.position += distance;
  }

  setStatus(status) {
    this.status = status;
  }
}

module.exports = Player;
