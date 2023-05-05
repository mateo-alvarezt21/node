const Users = require('./users.models')
const Conversations = require("./conversations.models")
const Messages = require("./messages.models")
const Participants = require("./participants.models")

const initModels = () => {

   //? Users -> Participants
   Users.hasMany(Participants)
   Participants.belongsTo(Users)

   //? Conversations -> Participants
   Conversations.hasMany(Participants)
   Participants.belongsTo(Conversations)

   //? Participants -> Messages
   Participants.hasMany(Messages)
   Messages.belongsTo(Participants)
}

module.exports = initModels