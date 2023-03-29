const WordsManager = {}

function Emojify(Word, Input="") {
    Word = Word.toLowerCase()
    Input = Input.toLowerCase()

    var Output = ""
    const SplitWord = Word.split("")
    var CharacterIndex = 0
    for (const Character of SplitWord) {
        var OutputEmoji
        const InputCharacter = Input[CharacterIndex] || ""

        if (Character === InputCharacter) {
            OutputEmoji = LingBot.Emojis.Blocks.Green
        } else if (Input.includes(Character)) {
            OutputEmoji = LingBot.Emojis.Blocks.Yellow
        } else {
            OutputEmoji = LingBot.Emojis.Blocks.Red
        }

        Output += OutputEmoji
    }

    return Output
}

WordsManager.LoadHandles = async function() {
    const Self = this
    LingBot.Client.on(
        "messageCreate", 
        async function(Message) {
            if (Message.channelId != LingBot.Config.ChannelId) return
            if (Message.author.bot) return
            if (Message.content.includes(" ")) return
            if (Message.content.includes("\n")) return
            console.log(Message.content)
            await Self.HandleInput(Message)
        }
    )
}

WordsManager.HandleInput = async function(Message) {
    const Content = Message.content.toLowerCase()

    if (Content.length  > this.CurrentWord.length) {
        await Message.reply(":face_with_monocle: The word you provided is too long.")
        return
    } else if (Content.length < this.CurrentWord.length) {
        await Message.reply(":face_with_monocle: The word you provided is too short.")
        return
    }

    await Message.reply(Emojify(this.CurrentWord, Content))

    if (Content === this.CurrentWord) {
        await Message.reply(":sunglasses: You got it right!")
        await this.NewWord()
    }
}

WordsManager.NewWord = async function() {
    const WordsGroup = LingBot.Words[Math.floor(Math.random() * Object.keys(LingBot.Words).length) + 5]
    this.CurrentWord = WordsGroup[Math.floor(Math.random() * WordsGroup.length)]
    await LingBot.Channel.send(`New ${this.CurrentWord.length} letter word game is starting\n${Emojify(this.CurrentWord)}`)
    await LingBot.Client.user.setActivity(`${this.CurrentWord.length} letter word game`)
}

module.exports = WordsManager