FilterBy
  = _ field:Field _ { return field; }

// These are the fields that are allowed to be queried
// Can be automatically generated from the schema by 
// replacing them with [schema] (must be uppercase) and running "npm run peg"

StringFields = "foo" / "bar" / "baz"
ArrayFields = "arr_foo" / "arr_bar" / "arr_baz"
NumberFields = "num_foo" / "num_bar" / "num_baz"



// Bits
Field
  = NumberField / ArrayField / StringField

StringField
  = fieldName:(ArrayFields / StringFields) _ ":" _ value:(List / Identifier) 
  { return { field: fieldName, value }; }

ArrayField
  = fieldName:ArrayFields _ ":" _ value:(List / Identifier) 
  { return { field: fieldName, value }; }

NumberField
  = fieldName:(ArrayFields / StringFields) _ ":" _ value:(List / Identifier) 
  { return { field: fieldName, value }; }

Numeric
  = NumericOperator / Range / Number

NumericOperator
  = operator:("=" / "<" / ">" / "<=" / ">=") _ number:Number 
  {    return { type: 'number', operator, value: Number(number.join('')) }; }

Range
  = "[" _ min:Number _ ".." _ max:Number _ "]" {
  return { type: 'number', range: { min: Number(min.join('')), max: Number(max.join(''))}}}

List
  = "[" _ head:Identifier tail:(_ "," _ Identifier)* _ "]" 
  
  { 
    const tails = tail.map(x => x[3])
    const values = [head].concat(tails).map(x => x.join(''))
    return values
  }

// Primitives
Number
  = [0-9]+

Identifier
  = chars:[a-zA-Z]+ { return chars }

_ "whitespace"
  = [ \t\n\r]*
