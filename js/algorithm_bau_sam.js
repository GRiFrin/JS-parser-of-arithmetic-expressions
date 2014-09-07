algorithmBauSam = function()
{
    var tranStack = [];
    var intStack = [];

    var calc = function()
    {
        if(!tranStack.length || !intStack.length){
            throw new Error('Wrong number of operands or values');
        }

        var operand = tranStack.shift();
        var varSecond = parseFloat(intStack.shift());
        var varFirst = parseFloat(intStack.shift());
        if(isNaN(varFirst) || isNaN(varSecond)){
            throw new Error('Invalid numeric');
        }

        switch(operand){
            case '+':
                return intStack.unshift(varFirst + varSecond);
            case '-':
                return intStack.unshift(varFirst - varSecond);
            case '*':
                return intStack.unshift(varFirst * varSecond);
            case '/':
                if(varSecond == 0){
                    throw new Error('Division by zero');
                }
                return intStack.unshift(varFirst / varSecond);
            default:
                throw new Error('Invalid character in the expression "' + operand + '"');
        }
    }

    var inStack = function(char)
    {
        return tranStack.unshift(char);
    }

    var outStack = function()
    {
        return tranStack.shift();
    }

    var calcStack = function(el)
    {
        calc();
        inStack(el);
    }

    var calcStackRecursive = function(el)
    {
        calc();
        var action = getOperation(el);
        if(action == 'finish'){
            return;
        }
        action.call(this, el);
    }

    var raiseError = function()
    {
        throw new Error('Wrong brackets');
    }

    var getOperation = function(key)
    {
        var operationTable = {
            'empty':    {
                'empty':    'finish',
                '(':        inStack,
                '+':        inStack,
                '-':        inStack,
                '*':        inStack,
                '/':        inStack,
                ')':        raiseError
            },
            '(':        {
                'empty':    raiseError,
                '(':        inStack,
                '+':        inStack,
                '-':        inStack,
                '*':        inStack,
                '/':        inStack,
                ')':        outStack
            },
            '+':        {
                'empty':    calcStackRecursive,
                '(':        inStack,
                '+':        calcStack,
                '-':        calcStack,
                '*':        inStack,
                '/':        inStack,
                ')':        calcStackRecursive
            },
            '-':        {
                'empty':    calcStackRecursive,
                '(':        inStack,
                '+':        calcStack,
                '-':        calcStack,
                '*':        inStack,
                '/':        inStack,
                ')':        calcStackRecursive
            },
            '*':        {
                'empty':    calcStackRecursive,
                '(':        inStack,
                '+':        calcStackRecursive,
                '-':        calcStackRecursive,
                '*':        calcStack,
                '/':        calcStack,
                ')':        calcStackRecursive
            },
            '/':        {
                'empty':    calcStackRecursive,
                '(':        inStack,
                '+':        calcStackRecursive,
                '-':        calcStackRecursive,
                '*':        calcStack,
                '/':        calcStack,
                ')':        calcStackRecursive
            }

        };
        var tKey = !tranStack.length ? 'empty' : tranStack[0];

        return operationTable[tKey][key];
    }

    this.calculate = function(expression)
    {
        var doneExpression = this.prepareExpression(expression);

        tranStack = [];
        intStack = [];
        var j = doneExpression.length;
        for(var i = 0; i < j; i++){
            var el = doneExpression[i];
            if(this.isOperator(el)){
                var action = getOperation(el);
                action.call(this, el);
            } else {
                intStack.unshift(el);
            }
        }

        while(tranStack.length){
            var action = getOperation('empty');
            action.call(this, 'empty');
        }

        return intStack.shift();
    }
}

algorithmBauSam.prototype = algorithmCore;