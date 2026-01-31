$(() => {
    loadSmashControl();

    function loadSmashControl(){
        const bundle = 'nodecg-smashcontrol';

        // Variables for each of the jQuery classes that will be modified.
        var bracket = $('.bracket-location');
        var bestOf = $('.best-of-info');
        var player1tag = $('.player1-tag');
        var p1score = $('.player1-score');
        var player2tag = $('.player2-tag');
        var p2score = $('.player2-score');
        var p1ch = $('.player1-character');
        var p2ch = $('.player2-character');
        var player1team = $('.player1-team');
        var player2team = $('.player2-team');

        // This function now simply sets the text. The CSS handles hiding empty elements.
        function setText(element, value) {
            element.text(value || '');
        }

        // This function now simply sets the image source. The CSS handles hiding empty images.
        function setCharacter(element, character, game) {
            var image = element.find('img');
            if (character && game) {
                // Assuming a standard path structure for smashcontrol character images
                var imagePath = `../../nodecg-smashcontrol/dashboard/images/${game}/${character}.png`;
                image.attr('src', imagePath);
            } else {
                image.attr('src', ''); // Setting src to empty will be caught by the CSS to hide it
            }
        }
        
        // Replicant for player scores
        const player1score = nodecg.Replicant("player1Score", bundle);
        const player2score = nodecg.Replicant("player2Score", bundle);

        player1score.on('change', (newVal) => {
            p1score.text(newVal !== null ? newVal : '0');
        });

        player2score.on('change', (newVal) => {
            p2score.text(newVal !== null ? newVal : '0');
        });

        // The main Replicant, contains info for tags, characters, bracket location, and game.
        const setData = nodecg.Replicant("playerDataArray", bundle);
        setData.on('change', (newVal) => {
            console.log("playerDataArray changed:", JSON.stringify(newVal, null, 2));
            if (newVal) {
                updateAllFields(newVal);
            }
        });

        // Separate replicant for 'best of' info
        const bestOfReplicant = nodecg.Replicant("bestOf", bundle);
        bestOfReplicant.on('change', (newVal) => {
            if (newVal) {
                setText(bestOf, `Best of ${newVal}`);
            } else {
                setText(bestOf, '');
            }
        });

        function updateAllFields(data) {
            // Update all visual elements with the new data.
            setText(bracket, data.bracketlocation);
            setText(player1tag, data.player1tag);
            setText(player2tag, data.player2tag);
            setText(player1team, data.player1team);
            setText(player2team, data.player2team);
            
            // Character assets depend on the game being set
            if (data.game) {
                setCharacter(p1ch, data.player1character, data.game);
                setCharacter(p2ch, data.player2character, data.game);
            } else {
                setCharacter(p1ch, null);
                setCharacter(p2ch, null);
            }
        }
    }
});