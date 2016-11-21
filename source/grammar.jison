    
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
";"                   return ';'
[a-z]                  return 'VAR'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */
%{
    var path = require('path');
    var Tree = require(path.resolve('./source/tree.js'));  
    var vars = {};
%}


%left '+' '-'
%left '*' '/'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */
assignment
    : VAR '=' e ';'
        {vars[$1] = $3;}
    ;

// variable
//     : VAR 
//         {$$ = yytext}        
//     ;

expressions
    : e EOF
        { $1['vars'] = vars; return $1 }
    | assignment EOF
        {return $1}
    | assignment expressions 
        {
            $2['vars'] = vars
            return $2;
        }            
    ;

e
    : e '+' e
        {$$ = new Tree($1, $2, $3) ;}
    | e '-' e
        {$$ = new Tree($1, $2, $3) ;}
    | e '*' e
        {$$ = new Tree($1, $2, $3) ;}
    | e '/' e
        {$$ = $1/$3;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | VAR 
    ;

