Expression
  = AndExpression

OrExpression
  = head:AndExpression tail:(_ "|" _ AndExpression)* _ {
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
  / field:(NumberField / ListField / StringField)

StringFields = "url" / "title" / "text" / "platform" / "type"
ArrayFields = "tags"
NumberFields = "rank" / "measure_text_length"

StringField
  = name:StringFields sep ColonSeparator _ value:(EqualityOperator / Term / List) 
  { return { type: 'string_field', field: name, value }; }

ListField
  = name:ArrayFields sep value:(EqualityOperator / Term / List) 
  { return { type: 'list_field', field: name, value: value }; }

NumberField
  = name:NumberFields _ value:(EqualityOperator / ComparisonOperator / Range) 
  { return { type: 'number_field', field: name, value }; }
  
sep = wsep / EqualityOperator / List

ComparisonOperator
  = op: ("<=" / ">=" / "<" / ">") _ number:Number 
  { return { type: 'compare', op, value: number }; }

EqualityOperator
  = type: "=" _ value:(Term / Number / List)
  { return { type: 'compare', op: type, value }; }

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
  = chars:[0-9a-zA-Z_-]+ { return { type: 'term', value: chars.join('') }; }

_ "whitespace"
  = [ \t\n\r]*
  
wsep "whitespace"
  = [ \t\n\r]
  
ColonSeparator = ":"
