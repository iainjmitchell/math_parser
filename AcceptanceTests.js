/* global test */
var MathParser = require('./MathParser.js');
require('chai').should();

test('Input: 3a2c4 Result: 20', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(20);
                done();
            }
        });
    mathParser.parse('3a2c4');
});

test('Input: 32a2d2 Result: 17', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(17);
                done();
            }
        });
    mathParser.parse('32a2d2');
});

test('Input: 500a10b66c32 Result: 14208', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(14208);
                done();
            }
        });
    mathParser.parse('500a10b66c32');
});

test('Input: 3ae4c66fb32 Result: 235', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(235);
                done();
            }
        });
    mathParser.parse('3ae4c66fb32');
});

test('Input: 3c4d2aee2a4c41fc4f Result: 990', function(done){
    var mathParser = new MathParser({
            show : function(output){
                output.should.equal(990);
                done();
            }
        });
    mathParser.parse('3c4d2aee2a4c41fc4f');
});
