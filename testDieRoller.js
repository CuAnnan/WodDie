const Action  = require('./DiceRoller').Action;

for(let i = 0; i < 100; i++)
{
    let action = new Action(5),
        roll = action.getResults();
    console.log(roll.successes);
}