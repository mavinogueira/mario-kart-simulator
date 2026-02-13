class Dice {
    static roll(min = 1, max = 6) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static chance(percent) {
    return Math.random() * 100 < percent;
  }

}

module.exports = Dice;