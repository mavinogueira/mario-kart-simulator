class Track {
    constructor(length) {
        this.length = length;
    }

    hasFinished(player) {
    return player.position >= this.length;
  }

}

module.exports = Track;
