emoji-stripper 👯
===========

Strip annoying emoji from your text inputs on the fly with Prototype.String function 🖖👕🔥💃.

Reason
-------
I created this prototype function as I have bumpt into situation where users should not be allowed to add emojis to our inputs. Adding this string prototype function is much cleaner than passing data as a parameter in my opinion. 

I hope it helps 😄


API
---

### String.emojiStripper() ###

Returns a filtered of `string` with any emoji characters removed.


Supported emoji
---------------

Currently, it supports all emoji up to
[Unicode Version 10](http://emojipedia.org/unicode-10.0/)
except for emoji sequences.


Install
-------

### For Node.js ###

Install with [npm](https://www.npmjs.org/):
```bash
npm install --save emoji-stripper
```

Require it in your program:
```js
const emojiStripper = require("emoji-stripper")
```



Examples
--------

```js
    const emojiStripper = require("emoji-stripper")

    emoji = 'Here is a 😤 🥘 🎊 🎈 list of emojis that 🎉  should be empty 🔥 😆😡 🌞'
    console.log(emoji.emojiStripper())

// => "thumbs-up for staying strong without emoji please"

    emoji = 'dealing with emoji😡 makes me feel like poop💩'
    console.log(emoji.emojiStripper())
// => "dealing with emoji makes me feel like poop"


// reactjs in setState examples


    handleChange(event) {
      
      const {value, name} = event.target
       
       if(typeof(value) == "string"){
           // will prevent the user and will strip emojis
            value = value.emojiStripper()
        }

        this.setState({
             [name]: value
        });
  }



```



License
-------

ISC
