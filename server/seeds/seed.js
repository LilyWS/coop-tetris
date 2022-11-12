const db = require('../config/connection');
const { Game } = require('../models');

const gameData = require('./gameData.json');

db.once('open', async () => {
    // clean database
    await Game.deleteMany({});
  
    // bulk create each model
    const games = await Game.insertMany(gameData);
  
    console.log('all done!');
    process.exit(0);
  });