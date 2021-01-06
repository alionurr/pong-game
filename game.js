(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2: {
            right: 0,
            top: 150
        },

        player1score: {
            top: 0,
            left: 100,
            color: '#000',
            position: 'absolute',
            fontSize: 100
        },

        player2score: { 
            top: 0,
            right: 100,
            position: 'absolute',
            color: '#000',
            fontSize: 100
        }
    };

    var CONSTS = {
    	gameSpeed: 12,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0,
        game: 1
    };

    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
        .appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
        .appendTo('#pong-game');
        $('<div/>', {id: 'pong-score-1' , text: CONSTS.score1}).css(CSS.player1score).appendTo('#pong-game');
        $('<div/>', {id: 'pong-score-2' , text: CONSTS.score2}).css(CSS.player2score).appendTo('#pong-game');

    }

    function setEvents() {
        $(document).on('keydown', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -15;
            }
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 15;
            }
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = -15;
            }
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 15;
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            }
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 0;
            }
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = 0;
            }
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 0;
            }
        });
    }

    function loop() {
        window.pongLoop = setInterval(function () {
            CSS.stick1.top += CONSTS.stick1Speed;
            $('#stick-1').css('top', CSS.stick1.top);
            CSS.stick2.top += CONSTS.stick2Speed;
            $('#stick-2').css('top', CSS.stick2.top);

            // the stick is prevented from sliding out of the board
            if(CSS.stick1.top <= 0) {
                CSS.stick1.top = 0;
            }
            if(CSS.stick1.top >= CSS.arena.height - CSS.stick.height){
                CSS.stick1.top = CSS.arena.height - CSS.stick.height
            }
            
            if(CSS.stick2.top <= 0) {
                CSS.stick2.top = 0;
            }
            if(CSS.stick2.top >= CSS.arena.height - CSS.stick.height){
                CSS.stick2.top = CSS.arena.height - CSS.stick.height
            }
            

            //  Allows it to move in the x-y coordinate
            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;
            //CSS.ball.left = 110;


            // keep ball in the game
            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
            }

            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            


            if (CSS.ball.left <= CSS.stick.width) {
            	CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1);
            }



            // if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
            //     roll();
            // }
            

            // this if-else block controls to score 
            if (CSS.ball.left + CSS.ball.width > CSS.arena.width){
                CONSTS.score1++;
                roll();

            } else if (CSS.ball.left + CSS.ball.width < 0) {

                CONSTS.score2++;
                roll();
            }

            // when one of them reach 5 , game is going to end
            if (CONSTS.score1 === 5 || CONSTS.score2 === 5) {
                CONSTS.game = 0;
            }
            $('#pong-score-1').text(CONSTS.score1);
            $('#pong-score-2').text(CONSTS.score2);
        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = (CSS.arena.height/2) + (CSS.ball.height/2);
        CSS.ball.left = (CSS.arena.width/2) + (CSS.ball.width/2);

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }

    start();
})();