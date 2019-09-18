const {Action} = require('./DiceRoller');

(
    ($)=>{
        $(
            ()=>{
                $('#roll-button').click(()=>{
                    let action = new Action(
                            parseInt($('#dice-pool').val()),
                            parseInt($('#difficulty').val()),
                            $('input[name="specialty"]:checked').val() === 'yes'
                        ),
                        result = action.getResults();
                    $('#result-successes').text(result.successes);
                    $('#result-rolls').text(result.diceValues.join(', '));
                });
            }
        );
    }
)(window.jQuery);