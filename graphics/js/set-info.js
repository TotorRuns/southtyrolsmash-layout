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
        
        let currentGame = ''; // Variable to store the currently selected game

        // This function now simply sets the text. The CSS handles hiding empty elements.
        function setText(element, value) {
            element.text(value || '');
        }

        // This function now simply sets the image source. The CSS handles hiding empty images.
        function setCharacter(element, character, game) {
            var image = element.find('img');
            if (character && game) {
                var imagePath = `../../nodecg-smashcontrol/dashboard/images/${game}/${character}.png`;
                image.attr('src', imagePath);
            } else {
                image.attr('src', ''); // Setting src to empty will be caught by the CSS to hide it
            }
        }
        
        // Replicant for the currently selected game
        const gameSelection = nodecg.Replicant('gameSelection', bundle);
        gameSelection.on('change', (newVal) => {
            currentGame = newVal;
        });

        // Replicants for player scores
        const player1score = nodecg.Replicant("player1Score", bundle);
        const player2score = nodecg.Replicant("player2Score", bundle);

        player1score.on('change', (newVal) => {
            p1score.text(newVal !== null ? newVal : '0');
        });

        player2score.on('change', (newVal) => {
            p2score.text(newVal !== null ? newVal : '0');
        });

        // The main Replicant for player data
        const setData = nodecg.Replicant("playerDataArray", bundle);
        setData.on('change', (newVal) => {
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
            
            // Use the 'currentGame' variable from the 'gameSelection' replicant
            // to load character assets.
            if (currentGame) {
                setCharacter(p1ch, data.player1character, currentGame);
                setCharacter(p2ch, data.player2character, currentGame);
            } else {
                setCharacter(p1ch, null);
                setCharacter(p2ch, null);
            }
        }
    }
});
