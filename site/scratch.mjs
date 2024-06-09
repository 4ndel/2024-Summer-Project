const funca = (thing) => { console.log(`hello ${thing}`) }

function funcb(thing) {
    const something = this
    const args = arguments[1]
    console.log(`hello ${thing}`)
}


funca('A')
funcb('B')

const tacos = { are: 'great' }

const newfunc = funcb.bind(tacos)
const a = function(hi) {}

funcb('world', 'secret')

const add1 = a => a + 1