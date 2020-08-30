5 primitive data types

//Numbers
4
9.3
-10

//Strings
"Hello World"
"43"

//Booleans
true
false

//null and undefined
null
undefined



String Properties

//Quotes
"double quotes are ok"
'single quotes are ok'
`This backtick is ok`
'I can\'t stop'
"I can't stop"

//Concatenation
"charlie" + "brown" //"charliebrown"

//Escape Characters start with "\"
"Hi there, I said \"no\""
"this is a backslash: \\"

//Length property
"hello world".Length

//Index property
"hello"[0] //"h"
"hello"[4] //"o"

Variables - //a container with a name that stores some kind of data. It's a jar.

var myVariableName = value;

//variables can hold numbers, strings, booleans

//JavaScript supports dynamic typing - You can change a var from a number to a string without a problem

//JS Variables should be "CamelCased" not "snake_cased" or "kebob-cased"

var vs const vs let

//let and const are "scoped variables" and don't exist outside of a block
//var creates a global variable
//const can be added to as an array, but you can't update the reference. 

//SO .... let is a local version of var.
//const is a local version of var that can't be reassigned
//const has to be assigned right away, unlike var and let which can be declared but not envoked
//let cannot be reassigned in the same scope

Basically, use in this order: const > let > var



Null and undefined

var age;
age = undefined

//Null means "explicitly nothing"
//Undefined means it doesn't have a value YET






Alert
Prompt
Console.log
clear() //clears the console. It is a METHOD

METHODS

alert() //pop up alert
console.log() //prints in the console
prompt() //asks for input
prompt("What is your name?")




