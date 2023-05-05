const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Users = require('../models/users.models')
const Participants = require('../models/participants.models')
const Messages = require('../models/messages.models')

const createConversation = async (conversationObj) => {
    const userGuest = await Users.findOne({
        where: {
            id: conversationObj.guestId
        }
    })

    if(!userGuest) return false

    const newConversations = await Conversations.create({
        id: uuid.v4(),
        name: conversationObj.name,
        profileImage: conversationObj.profileImage,
        isGroup: conversationObj.isGroup
    })

    await Participants.create({
        id: uuid.v4(),
        userId: conversationObj.ownerId,
        conversationId: newConversations.id,
        isAdmin: true
    })

    await Participants.create({
        id: uuid.v4(),
        userId: conversationObj.guestId,
        conversationId: newConversations.id,
        isAdmin: false
    })
    return newConversations
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id,
        }
    })
    return data
  }

const updateConversation = async (id, conversationObj) => {
    const selectedConversation = await Conversations.findOne({
        where: {
            id: id
        }
    })

    if(!selectedConversation) return false

    const modifiedConversation = await selectedConversation.update(conversationObj)

    return modifiedConversation
}

const deleteConversation = async (id) => {
    const conversation = await Conversations.destroy({
        where: {
            id: id
        }
    })

    return conversation
}

const findAllMessagesByConversation = async (conversationId) => {
    const conversation = await Conversations.findAll({
        where: {
            id: conversationId
        },
        include: [{
            model: Participants,
            include: [{
                model: Messages
            }]
        }]
    })

    return conversation
}

const createMessage = async (messageObj) => {

    const newMessage = {
        id: uuid.v4(),
        content: messageObj.content,
        participantId: messageObj.participantId,
        status: messageObj.status
    }
    
    const data = await Messages.create(newMessage)
    return data
}

module.exports = {
    createConversation,
    findConversationById,
    updateConversation,
    deleteConversation,
    findAllMessagesByConversation,
    createMessage
}