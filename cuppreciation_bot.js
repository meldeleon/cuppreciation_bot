const tmi = require("tmi.js")

// configs
const opts = {
  identity: {
    username: "cuppreciation",
    password: process.env.OAUTH,
  },
  channels: ["juiceboxhero"],
}
const client = new tmi.client(opts)

//create a state for how many times an emote has been used
var emoteState = new Object()

// event handlers for message/connection
client.on("message", onMessageHandler)
client.on("connected", onConnectedHandler)

// connect to Twitch:
client.connect()

// chat
function onMessageHandler(channel, userstate, msg, self) {
  //ignore messages from bot
  if (self) {
    return
  }
  //chatppreciation mode [emote] [emote]
  else if (msg.match(/^!chatppreciation/)) {
    let mode = msg
      .match(/^!chatppreciation ([^ ]+)/g)[0]
      .replace("!chatppreciation ", "")
    let emotes = msg.match(/cupp(.+?)(?= |$)/g)
    console.log(mode)
    console.log(emotes)
    chatppreciation(mode, emotes, channel)
  } else if (msg.match(/^!cuppreciation/)) {
    client.say(
      channel,
      "Cuppreciation Day is the day we celebrate Cuppcaake and the amazing, positive impact she has on her community!"
    )
    console.log(msg)
  }
}

// called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

// function to call on chat for help!
function chatppreciation(mode, emotes, channel) {
  let emoteProperty = emotes[0]
  if (mode === "spam") {
    client.say(
      channel,
      `Chat! Cupp needs YOU to beat the game. To help her spam ${emotes[0]} for the next 2 minutes!`
    )
    emotes.forEach((emote) => {
      emoteState.emoteProperty = 0
    })
  } else {
  }

  setTimeout(() => {
    if (mode === "spam") {
      client.say(
        channel,
        `You did good chat! You spammed ${emotes[0]} ${emoteState.emoteProperty} times!`
      )
    }
  }, 5000)
}

//clear global emoteState
function endCount() {}
