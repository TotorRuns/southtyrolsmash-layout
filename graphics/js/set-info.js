$(() => {
    loadSmashControl();

    function loadSmashControl(){
        const bundle = 'nodecg-smashcontrol';

        //Variables for each of the jQuery classes that will be modified.
        var bracket = $('.bracket-location');
        var player1tag = $('.player1-tag');
        var p1score = $('.player1-score');
        var player2tag = $('.player2-tag');
        var p2score = $('.player2-score');
        var p1ch = $('.player1-character');
        var p2ch = $('.player2-character');
        var player1team = $('.player1-team');
        var player2team = $('.player2-team');

        function setTextOrHide($el, value){
            if (value !== undefined && value !== null && value !== ''){
                $el.text(value);
                $el.removeClass('is-hidden');
            } else {
                $el.text('');
                $el.addClass('is-hidden');
            }
        }

        function setCharacter($el, character, game){
            var image = $el.children('img');
            if (character){
                var linkToImage = "../../nodecg-smashcontrol/dashboard/images/" + game + "/";
                image.attr("src", linkToImage + character + ".png");
                $el.removeClass('is-hidden');
            } else {
                image.attr("src", "");
                $el.addClass('is-hidden');
            }
        }

        //Because scores are in separate replicants, we'll need to wait for any updates, then update.
        var player1score = nodecg.Replicant("player1Score", bundle);
        var player2score = nodecg.Replicant("player2Score", bundle);
        NodeCG.waitForReplicants(player1score, player2score).then(() => {
            player1score.on('change', (newVal) => {
                if (newVal !== undefined && newVal !== null){
                    p1score.html(newVal);
                }
            });
            player2score.on('change', (newVal) => {
                if (newVal !== undefined && newVal !== null){
                    p2score.html(newVal);
                }
            });
        });

        //the main Replicant, contains info for tag, character, bracket position and game. If there's a change, update everything.
        var setInfo = nodecg.Replicant("playerDataArray", bundle);
        setInfo.on('change', (newVal, oldVal) => {
            if (newVal){
                updateFields(newVal);
            }
        });

        function updateFields(setData){
            //Updates everything (except score), directly modifies the HTML.
            setTextOrHide(bracket, setData.bracketlocation);
            setTextOrHide(player1tag, setData.player1tag);
            setTextOrHide(player2tag, setData.player2tag);
            setTextOrHide(player1team, setData.player1team);
            setTextOrHide(player2team, setData.player2team);
            setCharacter(p1ch, setData.player1character, setData.game);
            setCharacter(p2ch, setData.player2character, setData.game);
        }
    }
});
