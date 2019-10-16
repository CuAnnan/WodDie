(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

        if(this.result == 1)
        {
            this.successes = -1;
        }
        else if(this.result >= this.difficulty)
        {
            this.successes = (this.result == 10 && this.specialty)?2:1;
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
        if(this.performed)
        {
            return this;
        }

        let hasOnes = false;

        for(let i = 0; i < this.pool; i++)
        {
            let die = new Die(this.difficulty, this.specialty).roll();
            if(die.result == -1)
            {
                hasOnes = true;
            }
            this.diceValues.push(die.result);
            this.successes += die.successes;
            this.dice.push(die);
        }

        if(this.willpower)
        {
            if(this.successes < 0)
            {
                this.successes = 0;
            }
            this.successes ++;
        }

        if(this.successes == 0 && hasOnes)
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
},{}],2:[function(require,module,exports){
const {Action} = require('./DiceRoller');

(
    ($)=>{
        $(
            ()=>{
                $('#roll-button').click(()=>{
                    let action = new Action(
                            parseInt($('#dice-pool').val()),
                            parseInt($('#difficulty').val()),
                            $('input[name="specialty"]:checked').val() === 'yes',
                            $('input[name="willpower"]:checked').val() === 'yes'
                        ),
                        result = action.getResults();
                    $('#result-successes').text(result.successes);
                    $('#result-willpower').text(result.willpower?'Yes':'No');
                    $('#result-specialty').text(result.speciality?'Yes':'No');
                    let html = [];
                    for(let roll of result.diceValues)
                    {
                        if(roll === 1)
                        {
                            html.push(`<i>${roll}</i>`);
                        }
                        else if(roll == 10 && result.specialty)
                        {
                            html.push(`<b><u>${roll}</u></b>`);
                        }
                        else if(roll >= result.difficulty)
                        {
                            html.push(`<u>${roll}</u>`);
                        }
                        else
                        {
                            html.push(`<span>${roll}</span>`);
                        }
                    }
                    $('#result-rolls').html(html.join(', '));
                });
            }
        );
    }
)(window.jQuery);
},{"./DiceRoller":1}]},{},[2]);
