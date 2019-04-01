const emojiStripper = require("../index")

test("Test Emoji's on String Provided", () => {
  
    let emojiArray = "Here is a 😤 🥘 🎊 🎈 list of emojis that 🎉  should be empty 🔥 😆😡 🌞"
    
    expect(emojiArray.emojiStripper()).toBe("Here is a list of emojis that should be empty")
})