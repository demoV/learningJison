    
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
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */
%{
    var path = require('path');
    var Tree = require(path.resolve('./source/parseTree.js'));  


    var tree = function(left, root, right) {
        var rootTree = new Tree(root);
        rootTree.addToLeft(left);
        rootTree.addToRight(right);
        return rootTree; 
    }
%}


%left '+' '-'
%left '*' '/'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {
          return $1; }
    ;

e
    : e '+' e
        {$$ = tree($1, $2, $3);}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    ;

