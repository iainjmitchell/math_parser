/* global test */
var MathParser = require('./MathParser.js');
require('chai').should();

test('String contains 10, Then parser returns 10', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(10);
                done();
            }
        });
    mathParser.parse('10');
});

test('String contains 10a10, Then parser returns 20 > 10+10', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(20);
                done();
            }
        });
    mathParser.parse('10a10');
});

test('String contains 10b5, Then parser returns 5 > 10-5', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(5);
                done();
            }
        });
    mathParser.parse('10b5');
});

test('String contains 10c10, Then parser returns 100 > 10*10', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(100);
                done();
            }
        });
    mathParser.parse('10c10');
});

test('String contains 10d5, Then parser returns 2 > 10/5', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(2);
                done();
            }
        });
    mathParser.parse('10d5');
});

test('String contains 3a2c4, Then parser displays 20 > 3+2*4', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(20);
                done();
            }
        });
    mathParser.parse('3a2c4');
});

test('String contains e10a5f, Then parser returns 15 > (10+5)', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(15);
                done();
            }
        });
    mathParser.parse('e10a5f');
});

test('String contains e5a2fc4, Then parser returns 28 > (5+2)*4', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(28);
                done();
            }
        });
    mathParser.parse('e5a2fc4');
});

test('String contains 5ae2c4f, Then parser returns 13 > 5+(2*4)', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(13);
                done();
            }
        });
    mathParser.parse('5ae2c4f');
});

test('String contains e5a2fae2c4f, Then parser returns 13 > (5+2)+(2*4)', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(15);
                done();
            }
        });
    mathParser.parse('e5a2fae2c4f');
});

test('String contains ee5c2fd10fa3, Then parser returns 13 > ((5*2)/10)+3', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(4);
                done();
            }
        });
    mathParser.parse('ee5c2fd10fa3');
});
