const router = require('express').Router()
const conversationServices = require('./conversations.services')

const passportJwt = require("../middlewares/auth.middleware")

router.route("/")
    .post(
        passportJwt.authenticate("jwt", {session: false}),
        conversationServices.postNewConversation
    )

router.route("/:conversation_id")
    .get(conversationServices.getConversationByID)
    .patch(passportJwt.authenticate('jwt', {session: false}), conversationServices.patchConversation)
    .delete(passportJwt.authenticate('jwt', {session: false}), conversationServices.deleteConversation)

router.route("/:conversation_id/messages")
    .get(passportJwt.authenticate("jwt", {session: false}), conversationServices.getMessages)
    .post(passportJwt.authenticate("jwt", {session: false}), conversationServices.postNewMessage)

module.exports = router