const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
}); // this is the connection

class GameSession extends Model{}
GameSession.init({
    roomName: DataTypes.STRING,
    playersList: DataTypes.ARRAY(DataTypes.STRING),
    leaderBoard: DataTypes.ARRAY(DataTypes.STRING),

}, {sequelize, modelName: 'game_sessions'});

class Canvas extends Model{}
Canvas.init({
    stream: DataTypes.STRING,
    title: DataTypes.STRING,

}, {sequelize, modelName: 'canvas'});

GameSession.Canvas = GameSession.belongsTo(Canvas);

module.exports={
    sequelize,
    GameSession,
    Canvas
}