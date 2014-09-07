reversePolishNotation = function()
{

    var priority = function(el, seEl)
    {
        return ((el == '*' || el == '/') && (seEl == '+' || seEl == '-'));
    }

    var shuntingYardAlgorithm = function(expression)
    {
        var output = [];
        var stack = [];

        var j = expression.length;
        for(var i = 0; i < j; i++){
            var el = expression[i];
            if(this.isOperator(el)){
                switch(el){
                    case '(':
                        stack.unshift(el);
                        break;
                    case ')':
                        do{
                            if(!stack.length){
                                throw new Error('Wrong brackets');
                            }
                            if(stack[0] == '('){
                                break;
                            }
                            output.push(stack.shift());
                            if(!stack.length){
                                throw new Error('Wrong brackets');
                            }
                        } while(stack[0] != '(');
                        stack.shift();
                        break;
                    default:
                        while(stack.length){
                            if(stack[0] == '(' || stack[0] == ')'){
                                break;
                            }
                            if(priority(el, stack[0])){
                                break;
                            }
                            output.push(stack.shift());
                        }
                        stack.unshift(el);
                }
            } else {
                output.push(el);
            }
        }

        var j = stack.length;
        for(var i = 0; i < j; i++){
            var el = stack[i];
            if(el =='(' || el == ')'){
                throw new Error('Wrong brackets');
            }
            output.push(el);
        }
        return output;
    }


    this.calculate = function(expression)
    {
        var doneExpression = this.prepareExpression(expression);
        var rpnStack = shuntingYardAlgorithm.call(this, doneExpression);

        do {
            var resultStack = [];
            var j = rpnStack.length;
            for(var i = 0; i < j; i++){
                var el = rpnStack[i];
                if(this.isOperator(el)){
                    var sEl = parseFloat(resultStack.pop());
                    var fEl = parseFloat(resultStack.pop());
                    if(isNaN(fEl) || isNaN(sEl)){
                        throw new Error('Invalid numeric');
                    }
                    switch(el){
                        case '+':
                            resultStack.push(fEl + sEl);
                            break;
                        case '-':
                            resultStack.push(fEl - sEl);
                            break;
                        case '*':
                            resultStack.push(fEl * sEl);
                            break;
                        case '/':
                            if(sEl == 0){
                                throw new Error('Division by zero');
                            }
                            resultStack.push(fEl / sEl);
                            break;
                    }
                } else {
                    resultStack.push(el);
                }
            }
            rpnStack = resultStack;
        } while(resultStack.length > 1);

        return resultStack.shift();
    }

}

reversePolishNotation.prototype = algorithmCore;