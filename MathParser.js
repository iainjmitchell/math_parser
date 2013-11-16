var MathParser = function(display){
    var operatorFactory = new OperatorFactory(),
        expressionCalculatorFactory = new ExpressionCalculatorFactory(operatorFactory);
    
    this.parse = function(expressionString){
        var expressionCalculator = expressionCalculatorFactory.create(expressionString);
        display.show(expressionCalculator.calculate());
    };
};

var Expression = function(expressionCalculatorFactory, expressionString){
    var SEPARATE_NUMBERS_AND_CHARACTERS = /[a-z]|[0-9]+/g,
        splitExpression = expressionString.match(SEPARATE_NUMBERS_AND_CHARACTERS),
        SUBEXPRESSION_CODES = {
            START : 'e',
            END : 'f'
        },
        isSubexpressionNextSpecification = new IsSubexpressionNextSpecification(SUBEXPRESSION_CODES),
        subexpressionEndStrategy = new SubexpressionEndStrategy(SUBEXPRESSION_CODES);
    
    this.next = function(){
        if (isSubexpressionNextSpecification.isSatisifiedBy(splitExpression[0])){
            var subexpression = getSubexpression();
            return expressionCalculatorFactory.create(subexpression).calculate();
        }
        return splitExpression.shift();
    };
    
    this.completed = function(){
        return (splitExpression.length === 0);
    };
    
    function getSubexpression(){
        var subexpressionEnd = subexpressionEndStrategy.execute(splitExpression),
            subexpression = splitExpression.slice(1, subexpressionEnd).join("");
        removeSubexpression(subexpressionEnd);
        return subexpression;
    }
    
    function removeSubexpression(subexpressionEnd){
        splitExpression = splitExpression.slice(subexpressionEnd+1, splitExpression.length);
    }
};

var SubexpressionEndStrategy = function(SUBEXPRESSION_CODES){
    this.execute = function(splitExpression){
        var position = 1,
            nextInExpression,
            subexpressionCount = 0;
        
        for (position; position < splitExpression.length; position++){
            nextInExpression = splitExpression[position];
            if (nextInExpression === SUBEXPRESSION_CODES.START){
               subexpressionCount++;
            }
            if (nextInExpression === SUBEXPRESSION_CODES.END){
                if ((subexpressionCount === 0)){
                    return position;
                }
                subexpressionCount--;
            }
        }
    }  
};

var IsSubexpressionNextSpecification = function(SUBEXPRESSION_CODES){
    this.isSatisifiedBy = function(nextInExpression){
        return nextInExpression === SUBEXPRESSION_CODES.START; 
    };
};

var ExpressionCalculator = function(operatorFactory, expression){
    this.calculate = function(){
        var runningSum = expression.next();
        return calculateNextExpression({
            runningSum: runningSum,
            remainingExpression: expression
        });
    };
    
    function calculateNextExpression(expressionCalculation){
        var operator = operatorFactory.create(expressionCalculation.remainingExpression.next()),
            rightValue = expressionCalculation.remainingExpression.next(),
            runningSum = operator.execute({
                leftValue: expressionCalculation.runningSum,
                rightValue: rightValue
            });
        
        if (expressionCalculation.remainingExpression.completed()){
            return runningSum;
        }
        return calculateNextExpression({
            runningSum: runningSum,
            remainingExpression: expressionCalculation.remainingExpression
        });
    }
};

var ExpressionCalculatorFactory = function(operatorFactory){
    var self = this;
    this.create = function(expressionString){
        var expression = new Expression(self, expressionString),
            expressionCalculator = new ExpressionCalculator(operatorFactory, expression);
        return expressionCalculator;
    }; 
};

var OperatorFactory = function(){
    var operatorByCode = {
            undefined : new NoOperation(),
            'a' : new Add(),
            'b' : new Subtract(),
            'c' : new Multiply(),
            'd' : new Divide()
        };
    
    this.create = function(operatorCode){
        return operatorByCode[operatorCode];
    };  
};

var NoOperation = function(){
    this.execute = function(sum){
        return +sum.leftValue;
    }; 
};

var Add = function(){
    this.execute = function(sum){
        return +sum.leftValue + +sum.rightValue;
    };  
};

var Subtract = function(){
    this.execute = function(sum){
        return +sum.leftValue - +sum.rightValue;
    };
};

var Divide = function(){
    this.execute = function(sum){
        return +sum.leftValue / +sum.rightValue;
    };
};

var Multiply = function(){
    this.execute = function(sum){
        return +sum.leftValue * +sum.rightValue;
    };
};

module.exports = MathParser;
