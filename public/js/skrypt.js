jQuery.extend({
    getValues: function (url) {
        var result = null;
        $.ajax({
            url: url
            , type: 'get'
            , dataType: 'json'
            , async: false
            , success: function (data) {
                result = data;
            }
        });
        return result;
    }
});

var zmienna = $.getValues("/play/size/5/dim/5/max/20/");
var results = zmienna.data;

jQuery(document).ready(function () {
    $("#btn2").click(function () {
        var size = $('#size').val();
        var dim = $('#dim').val();
        var moves = $('#moves').val();



        $.ajax({
            url: "/play/size/" + size + "/dim/" + dim + "/max/" + moves + "/"
            , type: 'get'
            , dataType: 'json'
            , async: false
            , success: function (res) {
                result = res.data;
                var wartosc = dim - 1;
                $('#form').html("Ilosc liczb " + size + " od 0 do " + wartosc + ".Maksymalna ilosc ruchów: " + moves);
            }
        });


    });


});

jQuery(document).ready(function () {
    var counting = 1;
    $("#btn1").click(function () {


        var size = $('#form').children('#size').val();
        var liczby = $('#liczby').val();



        var random = [];
        var zgadles = [];
        for (var i = 0; i < liczby.length; i++) {
            zgadles.push(parseInt(liczby[i], 10));
        }
        var size1 = parseInt(size, 10);
        var biggest = 0;
        for (var i = 0; i < zgadles.length; i++) {
            if (zgadles[i] > biggest) {

                biggest = zgadles[i];
            }



        }

        $.ajax({
            url: "/mark/" + zgadles.join("/") + "/"
            , type: 'get'
            , dataType: 'json'
            , async: false
            , success: function (data) {








                $('#liczbydiv').append("<p>" + liczby);
                if (zgadles.length === data.retVal.puzzlesize) {
                    if ((biggest) < data.retVal.puzzledim) {


                        console.log(data);
                        var blackdots = data.retVal.blackdots;
                        var whitedots = data.retVal.whitedots;
                        var bluedots = data.retVal.puzzledim;
                        var bluedotsminus;
                        var iloscczarnych = "";
                        var iloscbialych = "";
                        var iloscpustych = "";

                        if (blackdots !== data.retVal.length) {
                            for (var i = 0; i < blackdots; i++) {
                                iloscczarnych += '<div id="czarne"> </div>  ';
                            }

                            for (var i = 0; i < whitedots; i++) {
                                iloscbialych += '<div id="biale"> </div>  ';
                            }
                            bluedotsminus = bluedots - blackdots - whitedots;
                            for (var i = 0; i < bluedotsminus; i++) {
                                iloscpustych += '<div id="puste"></div>  ';
                            }

                            $('#liczbydiv').append(iloscczarnych);
                            $('#liczbydiv').append(iloscbialych);
                            $('#liczbydiv').append(iloscpustych + '<br>');
                        } else {
                            $('#liczbydiv').append("<h1>ZGADLES</h1>");
                            $('#liczby').prop('disabled', true);
                            $('#btn1').prop('disabled', true);


                        }
                    } else {


                        $('#liczbydiv').append("Zbyt duza liczba, liczby maja byc mniejsze od " + data.retVal.puzzledim);

                    }




                } else {
                    $('#liczbydiv').append("Liczba ma miec dlugosc " + data.retVal.puzzlesize);

                }




                if (counting <= data.retVal.puzzlemax - 1) {




                } else {
                    $('#liczbydiv').append("<h1>Nie udalo Ci sie!</h1>");
                    $('#liczbydiv').append('<button id="btn3">Nowa gra</button>');
                    $('#liczby').prop('disabled', true);
                    $('#btn1').prop('disabled', true);
                    $('#btn3').click(function () {
                        console.log("Dziala");

                        $.ajax({
                            url: "/play/size/" + data.retVal.puzzlesize + "/dim/" + data.retVal.puzzledim + "/max/" + data.retVal.puzzlemax + "/"
                            , type: 'get'
                            , dataType: 'json'
                            , async: false
                            , success: function (res) {
                                result = res.data;
                                $('#liczby').prop('disabled', false);
                                $('#btn1').prop('disabled', false);
                                $('#liczbydiv').html('');

                            }

                        });




                    })
                    counting = 0;
                }


            }

        });




        for (var i = 0; i < results.length; i++) {
            random[i] = results[i];
        }


        counting = counting + 1;
        $('#liczby').val('');
    });
});