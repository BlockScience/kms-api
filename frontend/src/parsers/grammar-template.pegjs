FilterBy
  = _ head:Condition tail:(_ "||" _ Condition)* _ {
    return tail.reduce(function(result, element) {
      return { operator: "||", operands: [result, element[3]] };
    }, head);
  }

Condition
  = head:SubCondition tail:(_ "&&" _ SubCondition)* {
    return tail.reduce(function(result, element) {
      return { operator: "&&", operands: [result, element[3]] };
    }, head);
  }

SubCondition
  = "(" _ condition:FilterBy _ ")" { return condition; }
  / field:(NumberField / ArrayField / StringField)

StringFields = "url" / "title" / "text" / "platform" / "type"
ArrayFields = "tags"
NumberFields = "rank" / "measure_text_length"

StringField
  = name:StringFields _ ":" _ value:(EqualityOperator / Identifier / List) 
  { return { field: name, value }; }

ArrayField
  = name:ArrayFields _ ":" _ value:(EqualityOperator / Identifier / List) 
  { return { field: name, value }; }

NumberField
  = name:NumberFields _ ":" _ value:(EqualityOperator / ComparisonOperator / Range) 
  { return { field: name, value }; }

ComparisonOperator
  = operator: ("<" / ">" / "<=" / ">=") _ number:Number 
  { return { type: 'number', operator, value: Number(number.join('')) }; }

EqualityOperator
  = operator: "=" _ value:(Identifier / Number / List)
  { return { type: 'equality', operator, value: Array.isArray(value) ? value : value.join('') }; }

Range "[min..max]"
  = "[" _ min:Number _ ".." _ max:Number _ "]" {
  return { type: 'number', range: { min: Number(min.join('')), max: Number(max.join('')) } }; }

List
  = "[" _ head:Identifier tail:(_ "," _ Identifier)* _ "]" 
  { 
    const tails = tail.map(x => x[3])
    const values = [head].concat(tails).map(x => x.join(''))
    return values;
  }

Number
  = [0-9]+

Identifier
  = chars:[a-zA-Z_-]+ { return chars; }

_ "whitespace"
  = [ \t\n\r]*
