Expression
  = OrExpression _

OrExpression
  = head:AndExpression tail:(_ "|" _ AndExpression)* {
    return tail.reduce(function(result, element) {
      return { type: "or", left: result, right: element[3] };
    }, head);
  }

AndExpression
  = head:Atom tail:(_ "&" _ Atom)* {
    return tail.reduce(function(result, element) {
      return { type: "and", left: result, right: element[3] };
    }, head);
  }

Atom
  = "(" _ expr:OrExpression _ ")" { return expr; }
  / field:(NumberField / ArrayField / StringField)

StringFields = "url" / "title" / "text" / "platform" / "type"
ArrayFields = "tags"
NumberFields = "rank" / "measure_text_length"

StringField
  = name:StringFields _ ColonSeparator _ value:(EqualityOperator / Term / List) 
  { return { type: 'string', field: name, value }; }

ArrayField
  = name:ArrayFields _ ColonSeparator _ value:(EqualityOperator / Term / List) 
  { return { type: 'array', field: name, value: Array.isArray(value) ? value : [value] }; }

NumberField
  = name:NumberFields _ ColonSeparator _ value:(EqualityOperator / ComparisonOperator / Range) 
  { return { type: 'number', field: name, value }; }

ComparisonOperator
  = operator: ("<=" / ">=" / "<" / ">") _ number:Number 
  { return { type: 'comparison', operator, value: number }; }

EqualityOperator
  = type: "=" _ value:(Term / Number / List)
  { return { type: 'comparison', operator: type, value }; }

Range "[min..max]"
  = "[" _ min:Number _ ".." _ max:Number _ "]" {
  return { type: 'range', min: Number(min.join('')), max: Number(max.join('')) }; }

List
  = "[" _ head:Term tail:(_ "," _ Term)* _ "]" 
  { 
    const tails = tail.map(x => x[3])
    const values = [head].concat(tails)
    return { type: 'list', values };
  }

Number
  = digits:[0-9]+ { return Number(digits.join('')); }

Term
  = chars:[a-zA-Z_-]+ { return { type: 'term', value: chars.join('') }; }

_ "whitespace"
  = [ \t\n\r]*
  
ColonSeparator = ":"
