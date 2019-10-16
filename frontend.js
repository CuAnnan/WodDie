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