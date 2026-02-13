class Item {
    constructor(name) {
        this.name = name;
    }

    user(user, target, raceContext) {

        throw new Error("Método 'use' deve ser implementado pela classe filha.");
        

    }
}

module.exports = Item;