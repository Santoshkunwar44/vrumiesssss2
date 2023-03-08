const { createChatForFirstMessage } = require("../controllers/ChatController")
const { addMessage, getMessageOfAChat } = require("../controllers/MessageController")

const router = require("express").Router()

router.post('/create', addMessage)
router.post('/new_message', createChatForFirstMessage, addMessage)
router.get('/', getMessageOfAChat)

module.exports = router; 