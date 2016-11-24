    
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return '('
")"                   return ')'
"="                   return '='
"^"                   return '^'
"!"                   return '!'
";"                   return ';'
[a-z]                  return 'VAR'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */
%{
    var path = require('path');
    var Tree = require(path.resolve('./source/tree.js'));  
    var Trees = require(path.resolve('./source/trees.js')); 
    var nodes =  require(path.resolve('./source/node.js')); 
    var maths =  require(path.resolve('./source/mathFunctions.js')); 
%}


%left '+' '-'
%left '*' '/'
%right '%'
%left '^'
%right '!'
%left UMINUS

%start program

%% /* language grammar */
assignment
    : identifier '=' e ';'
        {$$ = $1.addValue($3);}
    | identifier '=' assignment
        { 
            $$ = $1.addValue($3);
        }
    ;

identifier
    : VAR 
        {$$ = nodes.createAssign(yytext);}
    ;    

program
    : expressions EOF {return $1}
    ;
expressions
    : e ';'
    | assignment
    | assignment expressions 
        {
           $$  = new Trees($1, $2);
        }            
    ;

e
    : e '+' e
        {$$ = new Tree($1, maths.add, $3) ;}
    | e '-' e
        {$$ = new Tree($1, maths.sub, $3) ;}
    | e '*' e
        {$$ = new Tree($1, maths.mul, $3) ;}
    | e '/' e
        {$$ = $1/$3;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | e '^' e 
        {$$ = new Tree($1, maths.pow, $3);}   
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = nodes.createNumber(Number(yytext));}
    |identifier 
    | e '!'
        {$$ = new Tree($1, maths.fact, undefined);}           
    ;

