algorithmCore = new function()
{

    this.operations = ['(','+','-','*','/',')'];

    this.isOperator = function(char)
    {
        return (this.operations.join(',').indexOf(char) >= 0);
    }

    this.prepareExpression = function(expression)
    {
        var regExp = /\s/g;
        expression = expression.replace(regExp, '');
        var doneExpression = [];
        var numeric = '';
        var numericCount = 0;
        var j = expression.length;
        for(var i = 0; i < j; i++){
            var char = expression.charAt(i);
            if(this.isOperator(char)){
                if(numeric > ''){
                    if(isNaN(numeric)){
                        throw new Error('Invalid numeric in the expression "' + numeric + '"');
                    }
                    doneExpression.push(numeric);
                    numericCount++;
                }
                doneExpression.push(char);
                numeric = '';
            } else {
                numeric += char;
            }
        }
        if(numeric > ''){
            doneExpression.push(numeric);
            numericCount++;
        }
        if(numericCount < 2){
            throw new Error('Invalid expression');
        }
        return doneExpression;
    }
}