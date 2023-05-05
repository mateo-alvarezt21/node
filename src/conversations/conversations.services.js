const conversationControllers = require('./conversations.controllers')

const postNewConversation = (req, res) => {
    const conversationObj = req.body
    const ownerId = req.user.id
    conversationControllers.createConversation({...conversationObj, ownerId})
        .then(data => {
            if(!data) {
                return res.status(404).json({message: 'Guest ID not exists'})
            }
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({err: err.message})
        })
}

const getConversationByID = (req, res) => {
    const id = req.params.id
    conversationControllers.findConversationById(id)
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({err: err.message})
        })
}

const patchConversation = (req, res) => {
    const id = req.params.id
    const {name, profileImage} = req.body

    conversationControllers.updateConversation(id, {name, profileImage})
        .then(() => {
            res.status(200).json({message: 'Conversation was edited succesfully!'})
        })
        .catch(err => {
            res.status(400).json({err: err.message})
        })
}

const deleteConversation = (req, res) => {
    const id = req.params.id

    conversationControllers.deleteConversation(id)
        .then(() => {
            res.status(204).json()
        })
        .catch(err => {
            res.status(400).json({err: err.message})
        })
}

const getMessages = (req, res) => {
    const id = req.params.id
    conversationControllers.findAllMessagesByConversation(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Conversation with invalid ID'})
            }
        })
        .catch(err => {
            res.satus(400).json({err: err.message})
        })
}

const postNewMessage = (req, res) => {
    const messageObj = req.body
    const participantId = req.user.id

    conversationControllers.createMessage({...messageObj, participantId})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'Participant ID not exists'})
            }
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({err: err.message})
        })
}

module.exports = {
    postNewConversation,
    getConversationByID,
    patchConversation,
    deleteConversation,
    getMessages,
    postNewMessage
}