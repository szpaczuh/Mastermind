/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy
// module.exports ==> exports
exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
        , opis: 'Mastermind jest jedną z popularnych niegdyś gier. Gra polega na odgadnięciu n ukrytych kul. Gra zostanie rozwiązana, jeśli w ciągu k tur a     gracz odgadnie te kule. W każdej turze gracz wybiera n kul, po czym sprawdza czy trafił. Każda prawidłowo odgadnięta kula (kula o właściwym kolorze na właściwym miejscu) sygnalizowana jest czarną kropką. Jeśli gracz odgadł kolor kuli, nie odgadł zaś jej lokalizacji, jest to sygnalizowane białą kropką,a jeżeli nie ma takiej liczby w całym ciągu jest oznaczany kolorem niebieskim. Gracz nie wie, które kule są właściwe, które zaś nie. Gra dostępna jest w 2 wariantach bez podania wartości wtedy ilość kul to 5 wielkość liczb od 0 do 4 i maksymalna ilosc ruchów to 20 lub można sprecyzować a następnie wcisnąć Zatwierdz.'

    });
};




exports.play = function (req, res) {
    var newGame = function () {
        var i, data = []
            , puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * req.params[4]));
        }
        req.session.puzzle.max = parseInt(req.params[6], 10);
        req.session.puzzle.size = parseInt(req.params[2], 10);
        req.session.puzzle.dim = parseInt(req.params[4], 10);
        console.log(req.params[4]);
        req.session.puzzle.data = data;
        var wartosc = parseInt(req.params[6], 10);
        return {
            data: req.session.puzzle.data
            , max: wartosc
        };


    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    /*
     * req.params[2] === wartość size
     * req.params[4] === wartość dim
     * req.params[6] === wartość max
     */
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }



    res.json(newGame());
};

exports.mark = function (req, res) {
    var markAnswer = function () {

        var move = req.params[0].split('/');
        move = move.slice(0, move.length - 1).map(function (m) {
            return parseInt(m, 10);
        });
        var puzzledata = req.session.puzzle.data
        var puzzlemax = req.session.puzzle.max;
        var puzzlesize = req.session.puzzle.size;
        var puzzledim = req.session.puzzle.dim;
        var dane = [];
        for (var i = 0; i < puzzledata.length; i++) {
            dane.push(parseInt(puzzledata[i], 10));
        }
        console.log("Moje: " + move);
        console.log("Random: " + dane);


        var blackdots = 0;
        var whitedots = 0;

        for (var i = move.length - 1; i >= 0; i--) {
            if (move[i] === dane[i]) {
                move.splice(i, 1);
                dane.splice(i, 1);
                blackdots++;
            }
        }



        for (var i = move.length - 1; i >= 0; i--) {
            for (var j = dane.length - 1; j >= 0; j--) {
                if (move[i] === dane[j]) {

                    move.splice(i, 1);
                    dane.splice(j, 1);
                    whitedots++;
                }



            }


        }



        return {
            "retVal": {
                whitedots: whitedots
                , blackdots: blackdots
                , length: puzzledata.length
                , danelen: dane.length
                , puzzlemax: puzzlemax
                , puzzlesize: puzzlesize
                , puzzledim: puzzledim
            }
        };
    };



    res.json(markAnswer());
};