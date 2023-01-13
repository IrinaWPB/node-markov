const MarkovMachine = require('./markov');

describe('test markovmachine class', function() {
    let newMM;
    beforeEach(function() {
        newMM = new MarkovMachine('the cat in the hat is in the hat');
    });
    test('test newMM instance', function() {
        expect(newMM).toEqual(expect.any(Object));
        expect(newMM.words).toEqual(expect.any(Array));
        expect(newMM.words).toContain('hat');
        expect(newMM.words).toContain('cat');
    });

    test('test makeChains method', function() {
        let chain = newMM.makeChains();
        expect(chain).toEqual(expect.any(Object));
        expect(Object.keys(chain).length).toEqual(5);
        expect(chain.the).toEqual(['cat', 'hat', 'hat']);
        expect(chain.cat).toEqual(['in', undefined]);
    });

    describe('test makeText method', function() {
        let newText;
        let allWords;

        beforeAll(function() {
           newText = newMM.makeText(); 
        });
        test('length of text is always minimum 1 word', function() {
            expect(newText).toEqual(expect.any(String));
            expect(newText.length).toBeGreaterThan(0);
        });
        test('number of words is less than provided argument (or100))', function() {
            allWords = newText.split(' ');
            expect(allWords.length).toBeLessThan(100);
        });
        test('the last word is always the last word of original text ("hat")', function() {
            expect(allWords[allWords.length-1]).toEqual('hat');
        });
        test('the last word is always a part of created text', function() {
            expect(newText).toContain('hat');
        });
    });
});