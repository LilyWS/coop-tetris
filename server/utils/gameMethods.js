const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
const pieceKeys = ["O", "T", "L", "J", "S", "I", "Z"];

pieceData = {
    "I": {
      0: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
      1: [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0],[0, 0, 1, 0]],
      2: [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
      3: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
    },
    "J": {
      0: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
      1: [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
      2: [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
      3: [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
    },
    "L": {
      0: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
      1: [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
      2: [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
      3: [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
    },
    "O": {
      0: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
      1: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
      2: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
      3: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]
    },
    "S": {
      0: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
      1: [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
      2: [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
      3: [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
    },
    "T": {
      0: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
      1: [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
      2: [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
      3: [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
    },
    "Z": {
      0: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
      1: [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
      2: [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
      3: [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
    }
  }

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  

module.exports = {
    pieceData,
    createQueryID: (len = 11) => {
        let result = '';
        for ( var i = 0; i < len; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    setPieceData: (piece) => {
        return {
            shapeName: piece,
            shape: pieceData[piece],
            rot: 0,
            grounded: false,
            groundCount: 0,
            groundMax: 3,
            done: false,
            x: 3,
            y: 0
        }
    },
    getPieceQueue: (first = false) => {
        let q = shuffleArray(pieceKeys);
        if (first) {
            while(q[0] == "Z" || q[0] == "S") {
                q = shuffleArray(pieceKeys);
            }
        }
        console.log("test", q);
        return q;
    }
}