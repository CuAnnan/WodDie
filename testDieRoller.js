const   Action  = require('./DiceRoller').Action;
        Distribution = require('./Distribution');
const   NUMBER_OF_ROLLS = 1000000;


let tests = [{poolSize: 8, difficulty: 7, specialty:true}, {poolSize:6, difficulty: 6, specialty:true}],
    testNumber = 0;
for(let test of tests)
{
    let tally = 0,
        distribution = new Distribution(),
        botches = 0;
    for(let i = 0; i < NUMBER_OF_ROLLS; i++)
    {
        let result = new Action(test.poolSize, test.difficulty, test.specialty).getResults();
        distribution.addResult(result.successes);
        tally += result.successes;
        botches += result.botch?1:0;
    }
    let average = tally/NUMBER_OF_ROLLS;
    console.log(
        `Results for test ${++testNumber}:
    Pool size: ${test.poolSize}, difficulty: ${test.difficulty}, specialty: ${test.specialty?'Yes':'No'}
    Over the course of ${NUMBER_OF_ROLLS} rolls, the test with a poolsize of ${test.poolSize} scored:
         a total of ${tally} successes
         an averate of ${average} successes
         and ${botches} botches`
    );
}