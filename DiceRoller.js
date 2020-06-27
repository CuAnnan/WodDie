class Die
{
    constructor(difficulty, specialty)
    {
        this.difficulty = difficulty?difficulty:6;
        this.specialty = specialty?specialty:false;
        this.rolled = false;
        this.successes = 0;
        this.result = 0;
    }

    roll()
    {
        if(this.rolled)
        {
            return this;
        }

        this.successes = 0;
        this.result = Math.floor(Math.random() * 10) + 1;

        if(this.result === 1)
        {
            this.successes = -1;
        }
        else if(this.result >= this.difficulty)
        {
            this.successes = 1;
        }
        this.rolled = true;
        return this;
    }

    toJSON()
    {
        return {
            difficulty:this.difficulty,
            successes:this.successes,
            specialty:this.specialty,
            result:this.result,
            rolled:this.rolled
        };
    }
}

class Action
{
    constructor(pool, difficulty, specialty, willpower)
    {
        this.pool = pool?pool:1;
        this.difficulty = difficulty?difficulty:6;
        this.specialty = specialty?specialty:false;
        this.willpower = willpower?willpower:false;
        this.botch = false;
        this.performed = false;
        this.dice = [];
        this.successes = 0;
        this.diceValues = [];
    }

    static fromJSON(json)
    {
        return new Action(json.pool, json.difficulty, json.specialty, json.willpower);
    }

    perform()
    {
        if(this.performed)
        {
            return this;
        }
        this.rollDice();
        this.performed = true;
        return this;
    }


    rollDice()
    {
        if (this.performed)
        {
            return this;
        }

        let hasOnes = false;

        let diceRolled = 0;
        while(diceRolled < this.pool)
        {
            let die = new Die(this.difficulty, this.specialty).roll();
            if (die.result === 1)
            {
                hasOnes = true;
            }
            this.diceValues.push(die.result);
            this.successes += die.successes;
            this.dice.push(die);
            if(die.result < 10)
            {
                diceRolled++;
            }
        }

        if (this.willpower)
        {
            if (this.successes < 0)
            {
                this.successes = 0;
            }
            this.successes++;
        }

        this.successes = Math.max(this.successes, 0);

        if(this.successes === 0 && hasOnes)
        {
            this.botch = true;
        }

        return this;
    }

    getResults()
    {
        this.perform();
        return {
            successes:this.successes,
            botch:this.botch,
            dice:this.dice,
            difficulty:this.difficulty,
            speciality:this.specialty,
            willpower:this.willpower,
            pool:this.pool,
            diceValues:this.diceValues
        };
    }
}

module.exports = {Action:Action};