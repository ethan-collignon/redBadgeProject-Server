// const db = require('../db'); This was in the db

const UserModel = require('./user');
const CampsiteModel = require('./campsite');
const EateryModel = require('./eatery');

UserModel.hasMany(CampsiteModel);
UserModel.hasMany(EateryModel);

CampsiteModel.belongsTo(UserModel);
EateryModel.belongsTo(UserModel);


module.exports = {
    dbConnection: this.dbConnection,
    
    UserModel,
    CampsiteModel,
    EateryModel
    
};