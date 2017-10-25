var Snake = {
    // 游戏静态量
    gameStatic: {
        gamePattern: 0,
        gameScore: 0,
        gameMiddleScore: {},
        hadGamePatter: false,
        gameMapWidth: window.innerWidth - 350,
        gameMapHeight: window.innerHeight,
        gameRestTimer: null
    }
};
(function() {
    var snake = {
        snakeStatic: {
            cxt: document.getElementsByClassName('content')[0].getContext('2d'),
            snakeBody: [], //存储蛇身
            snakeW: 6, // 蛇宽度
            snakeL: 5, // 初始化蛇长度
            snakeV: 2, // 蛇的速度
            snakeT: 1000 / 100, // 蛇的运动时间间隔
            pointStatus: [],
            foodX: 0,
            foodY: 0,
            foodW: 6,
            bigFoodX: 0,
            bigFoodY: 0,
            bigFoodW: 20,
            bigFoodDisappearTime: 5000,
            index: 0,
            lineSpace: 150,
            mapr: 50,
            bigFoodDisTm: null,
            bigFoodIntervalTime: 5,
            canMove: true,
            canDrawFood: true,
            canHandAction: true,
            canDrawBigFood: true,
            bigFoodTimer: true,
            randomColor: true
        },
        resetData: function() {
            St.snakeBody = [];
            St.snakeW = 6;
            St.snakeL = 5;
            St.snakeV = 2;
            snakeT = 1000 / 100;
            St.pointStatus = [];
            St.foodX = 0;
            St.foodY = 0;
            St.foodW = 6;
            St.bigFoodX = 0;
            St.bigFoodY = 0;
            St.bigFoodW = 20;
            St.bigFoodDisappearTime = 5000;
            St.index = 0;
            St.bigFoodDisTm = null;
            St.canDrawBigFood = true;
            St.bigFoodTimer = true;
            St.randomColor = true;
            St.canMove = true;
            St.canDrawFood = true;
            St.canHandAction = true;
            Snake.gameStatic.gameMiddleScore = {};
        },
        // 初始化蛇身
        initFirstSnake: function() {
            var obj = null;
            for (var i = 0; i < St.snakeL; i++) {
                obj = {
                    nowx: Snake.gameStatic.gameMapWidth / 2,
                    nowy: Snake.gameStatic.gameMapHeight / 2 + i * 2 * St.snakeW,
                    stateIndex: 0,
                    speedx: 0,
                    speedy: -St.snakeV
                }
                St.snakeBody.push(obj);
            }
        },
        // 花蛇
        drawSnake: function() {
            var length = St.snakeBody.length;
            for (var i = 0; i < length; i++) {
                St.cxt.beginPath();
                St.cxt.arc(St.snakeBody[i].nowx, St.snakeBody[i].nowy, St.snakeW, 0, 2 * Math.PI);
                St.cxt.fillStyle = "#EFD52C";
                St.cxt.fill();
                St.cxt.closePath();
            }
        },
        // 画食物
        drawFood: function() {
            if (St.canDrawFood) {
                St.foodX = Math.ceil((Snake.gameStatic.gameMapWidth - St.foodW) * Math.random()) + St.foodW;
                St.foodY = Math.ceil((Snake.gameStatic.gameMapHeight - St.foodW) * Math.random()) + St.foodW;
                St.foodC = "rgba(" + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + ",0.9" + ")";
            }
            S.judgFoodsOverlap(St.foodX, St.foodY);
            if (Snake.gameStatic.gamePattern == 2) {
                var data;
                data = St.cxt.getImageData(St.foodX, St.foodY, 1, 1);
                if (data.data[0] == 5 && data.data[1] == 5 && data.data[2] == 5 && data.data[3] == 255) {
                    S.drawFood();
                    return;
                }
            }
            St.cxt.beginPath();
            St.cxt.arc(St.foodX, St.foodY, St.foodW, 2 * Math.PI, false);
            St.cxt.fillStyle = St.foodC;
            St.cxt.fill();
            St.cxt.closePath();
            St.canDrawFood = false;
        },
        // 判断食物重叠
        judgFoodsOverlap: function(x, y) {
            var length = St.snakeBody.length;
            var fx, fy;
            for (var i = 0; i < length; i++) {
                if (Snake.snakeTools.judgeDis(x, y, St.snakeBody[i].nowx, St.snakeBody[i].nowy, St.snakeW + St.foodW)) {
                    fx = Math.ceil((Snake.gameStatic.gameMapWidth - St.foodW) * Math.random()) + St.foodW;
                    fy = Math.ceil((Snake.gameStatic.gameMapHeight - St.foodW) * Math.random()) + St.foodW;
                    Snake.snake.judgFoodsOverlap(fx, fy);
                }
            }
        },
        // 画地图
        drawLine: function() {
            St.cxt.lineWidth = 5;
            St.cxt.strokeStyle = "rgba(5,5,5,1)";
            St.cxt.beginPath();
            // 1
            St.cxt.moveTo(St.lineSpace, 0);
            St.cxt.lineTo(St.lineSpace, Snake.gameStatic.gameMapHeight / 2 - St.snakeW - 10);
            St.cxt.moveTo(0, St.lineSpace);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth / 2 - St.snakeW - 5, St.lineSpace);
            // 2
            St.cxt.moveTo(St.lineSpace, Snake.gameStatic.gameMapHeight / 2 + St.snakeW + 10);
            St.cxt.lineTo(St.lineSpace, Snake.gameStatic.gameMapHeight);
            St.cxt.moveTo(0, Snake.gameStatic.gameMapHeight - St.lineSpace);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth / 2 - St.snakeW - 10, Snake.gameStatic.gameMapHeight - St.lineSpace);
            // 3 
            St.cxt.moveTo(Snake.gameStatic.gameMapWidth / 2 + St.snakeW + 5, St.lineSpace);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth, St.lineSpace);
            St.cxt.moveTo(Snake.gameStatic.gameMapWidth - St.lineSpace, 0);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth - St.lineSpace, Snake.gameStatic.gameMapHeight / 2 - St.snakeW - 5);
            // 4
            St.cxt.moveTo(Snake.gameStatic.gameMapWidth - St.lineSpace, Snake.gameStatic.gameMapHeight / 2 + St.snakeW + 5);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth - St.lineSpace, Snake.gameStatic.gameMapHeight);
            St.cxt.moveTo(Snake.gameStatic.gameMapWidth / 2 + St.snakeW + 10, Snake.gameStatic.gameMapHeight - St.lineSpace);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth ,Snake.gameStatic.gameMapHeight - St.lineSpace);
            // 三角形
            St.cxt.moveTo(Snake.gameStatic.gameMapWidth / 2 - 50, Snake.gameStatic.gameMapHeight - St.lineSpace);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth / 2 - 50, Snake.gameStatic.gameMapHeight - St.lineSpace - 250);
            St.cxt.moveTo(Snake.gameStatic.gameMapWidth / 2 + 50, Snake.gameStatic.gameMapHeight - St.lineSpace - 250);
            St.cxt.lineTo(Snake.gameStatic.gameMapWidth / 2 + 50, Snake.gameStatic.gameMapHeight - St.lineSpace);
            St.cxt.stroke();
            St.cxt.closePath();
            // y1
            St.cxt.beginPath();
            St.cxt.arc((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace, St.lineSpace + 50 + 3 * St.mapr, St.mapr, 0, Math.PI, true);
            St.cxt.stroke();
            St.cxt.closePath();
            St.cxt.beginPath();
            St.cxt.arc((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace, St.lineSpace + 50 + 3 * St.mapr, St.mapr * 3, 0, Math.PI, true);
            St.cxt.stroke();
            St.cxt.closePath();
            // y2
            St.cxt.beginPath();
            St.cxt.arc((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace, Snake.gameStatic.gameMapHeight - St.lineSpace - 50 - 3 * St.mapr, St.mapr, 0, Math.PI, false);
            St.cxt.stroke();
            St.cxt.closePath();
            St.cxt.beginPath();
            St.cxt.arc((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace, Snake.gameStatic.gameMapHeight - St.lineSpace - 50 - 3 * St.mapr, St.mapr * 3, 0, Math.PI, false);
            St.cxt.stroke();
            St.cxt.closePath();
            // l1
            St.cxt.beginPath();
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace - 3 * St.mapr, St.lineSpace + 50 + 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace - 3 * St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50);
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace - St.mapr, St.lineSpace + 50 + 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace - St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50);
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace + St.mapr, St.lineSpace + 50 + 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace + St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50);
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace + 3 * St.mapr, St.lineSpace + 50 + 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 + St.lineSpace + 3 * St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50);
            // l2
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace - 3 * St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50 - 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace - 3 * St.mapr, St.lineSpace + 50);
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace - St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50 - 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace - St.mapr, St.lineSpace + 50);
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace + 3 * St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50 - 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace + 3 * St.mapr, St.lineSpace + 50);
            St.cxt.moveTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace + St.mapr, Snake.gameStatic.gameMapHeight - St.lineSpace - 50 - 3 * St.mapr);
            St.cxt.lineTo((Snake.gameStatic.gameMapWidth - St.lineSpace * 2) / 4 * 3 + St.lineSpace + St.mapr, St.lineSpace + 50);
            St.cxt.stroke();
            St.cxt.closePath();
        },
        // 判断撞线
        judgeLine: function() {
            var data;
            data = St.cxt.getImageData(St.snakeBody[0].nowx + St.snakeW + 1, St.snakeBody[0].nowy + St.snakeW + 1, 1, 1);
            if (data.data[0] == 5 && data.data[1] == 5 && data.data[2] == 5 && data.data[3] == 255) {
                St.canMove = false;
                Snake.snakeUI.gameOver();
            }
        },
        // 定时器的封装
        _setInterval: function(fn, t) {
            var handle = null;
            var step = function() {
                if (St.canMove == false) {
                    return false;
                }
                fn();
                clearInterval(handle);
                handle = setTimeout(step, t());
            };
            handle = setTimeout(step, t());
            return handle;
        },
        // 蛇运动
        snakeMove: function() {
            S._setInterval(function() {
                var length = St.snakeBody.length;
                // 判断方向键盘
                S.judgeState();
                // 蛇身运动
                for (var i = 0; i < length; i++) {
                    St.snakeBody[i].nowy = St.snakeBody[i].nowy + St.snakeBody[i].speedy;
                    St.snakeBody[i].nowx = St.snakeBody[i].nowx + St.snakeBody[i].speedx;
                    // 检测碰撞墙壁
                    if (Snake.gameStatic.gamePattern == 0 || Snake.gameStatic.gamePattern == 2) {
                        S.checkWall(i);
                    } else if (Snake.gameStatic.gamePattern == 1) {
                        S.collisionWall();
                    }
                    
                }
                S.changeSpeed();
                S.checkSlef();
                S.eatFood();
                St.cxt.clearRect(0, 0, Snake.gameStatic.gameMapWidth, Snake.gameStatic.gameMapHeight);
                if (Snake.gameStatic.gamePattern == 0 || Snake.gameStatic.gamePattern == 1) {
                    if (Snake.gameStatic.gameScore == St.index) {
                        if (St.bigFoodTimer == true) {
                            S.closeBigFood();
                        }
                        S.drawBigFood();
                        S.eatBigFood();
                    }
                }
                if (Snake.gameStatic.gamePattern == 2) {
                    S.drawLine();
                    S.judgeLine();
                    
                }
                S.drawFood();
                S.drawSnake();
            }, function() {
                return St.snakeT;
            });
        },
        // 蛇身判断状态点
        judgeState: function() {
            var snakeBodylength = St.snakeBody.length;
            var stateLength = St.pointStatus.length;
            for (var i = 0; i < snakeBodylength; i++) {
                if (stateLength == 0) {
                    return;
                }
                if (!St.pointStatus[St.snakeBody[i].stateIndex]) {
                    continue;
                }
                if (St.snakeBody[snakeBodylength - 1].nowx == St.pointStatus[St.snakeBody[snakeBodylength - 1].stateIndex].x && St.snakeBody[snakeBodylength - 1].nowy == St.pointStatus[St.snakeBody[snakeBodylength - 1].stateIndex].y) {
                    St.snakeBody[snakeBodylength - 1].speedx = St.pointStatus[St.snakeBody[snakeBodylength - 1].stateIndex].vx;
                    St.snakeBody[snakeBodylength - 1].speedy = St.pointStatus[St.snakeBody[snakeBodylength - 1].stateIndex].vy;
                    St.pointStatus.shift(St.pointStatus[St.snakeBody[snakeBodylength - 1].stateIndex]);
                    for (var j = 0; j < snakeBodylength; j++) {
                        if (St.snakeBody[j].stateIndex == 0) {
                            St.snakeBody[j].stateIndex = 0;
                        } else {
                            St.snakeBody[j].stateIndex--;
                        }
                    }
                }
                if (St.pointStatus[St.snakeBody[i].stateIndex]) {
                    if (St.snakeBody[i].nowx == St.pointStatus[St.snakeBody[i].stateIndex].x && St.snakeBody[i].nowy == St.pointStatus[St.snakeBody[i].stateIndex].y) {
                        St.snakeBody[i].speedx = St.pointStatus[St.snakeBody[i].stateIndex].vx;
                        St.snakeBody[i].speedy = St.pointStatus[St.snakeBody[i].stateIndex].vy;
                        St.snakeBody[i].stateIndex++;
                    }
                }
            }
        },
        // 判断吃食物 
        eatFood: function() {
            var length = St.snakeBody.length;
            var tx, ty;
            if (Snake.snakeTools.judgeDis(St.foodX, St.foodY, St.snakeBody[0].nowx, St.snakeBody[0].nowy, St.snakeW + St.foodW)) {
                St.canDrawFood = true;
                Snake.gameStatic.gameMiddleScore.score = ++Snake.gameStatic.gameScore;
                if (St.snakeBody[length - 1].speedx == 0 && St.snakeBody[length - 1].speedy < 0) {
                    tx = St.snakeBody[length - 1].nowx;
                    ty = St.snakeBody[length - 1].nowy + St.snakeW * 2;
                } else if (St.snakeBody[length - 1].speedx == 0 && St.snakeBody[length - 1].speedy > 0) {
                    tx = St.snakeBody[length - 1].nowx;
                    ty = St.snakeBody[length - 1].nowy - St.snakeW * 2;
                } else if (St.snakeBody[length - 1].speedx < 0 && St.snakeBody[length - 1].speedy == 0) {
                    tx = St.snakeBody[length - 1].nowx + St.snakeW * 2;
                    ty = St.snakeBody[length - 1].nowy;
                } else if (St.snakeBody[length - 1].speedx > 0 && St.snakeBody[length - 1].speedy == 0) {
                    tx = St.snakeBody[length - 1].nowx - St.snakeW * 2;
                    ty = St.snakeBody[length - 1].nowy;
                }
                St.snakeBody.push({
                    nowx: tx,
                    nowy: ty,
                    stateIndex: St.snakeBody[length - 1].stateIndex,
                    speedx: St.snakeBody[length - 1].speedx,
                    speedy: St.snakeBody[length - 1].speedy
                });
                S.drawFood();
                St.canDrawFood = false;
            }
        },
        drawBigFood: function() {
            if (St.canDrawBigFood == true) {
                if (St.randomColor == true) {
                    St.randomColor = false;
                    St.bigFoodTimer = false;
                    St.bigFoodX = Math.ceil((Snake.gameStatic.gameMapWidth - St.bigFoodW) * Math.random()) + St.bigFoodW;
                    St.bigFoodY = Math.ceil((Snake.gameStatic.gameMapHeight - St.bigFoodW) * Math.random()) + St.bigFoodW;
                    St.bigFoodC = "rgba(" + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + "," + Math.ceil(255 * Math.random()) + ",0.9" + ")";

                }
                St.cxt.beginPath();
                St.cxt.arc(St.bigFoodX, St.bigFoodY, St.bigFoodW, 2 * Math.PI, false);
                St.cxt.fillStyle = St.bigFoodC;
                St.cxt.fill();
                St.cxt.closePath();
            }
        },
        eatBigFood: function() {
            if (Snake.snakeTools.judgeDis(St.bigFoodX, St.bigFoodY, St.snakeBody[0].nowx, St.snakeBody[0].nowy, St.snakeW + St.bigFoodW)) {
                clearInterval(St.bigFoodDisTm);
                St.canDrawBigFood = true;
                St.randomColor = true;
                St.bigFoodTimer = true;
                Snake.gameStatic.gameScore = St.index + St.bigFoodIntervalTime * 2 + 1;
                Snake.gameStatic.gameMiddleScore.score = Snake.gameStatic.gameScore;
                St.index = Snake.gameStatic.gameScore + St.bigFoodIntervalTime - 1;
            }
        },
        closeBigFood: function() {
            St.bigFoodDisTm = setTimeout(function() {
                St.canDrawBigFood = true;
                St.randomColor = true;
                St.bigFoodTimer = true;
                St.index = St.index + St.bigFoodIntervalTime;
            }, St.bigFoodDisappearTime)
        },
        // 判断穿越墙壁
        checkWall: function(i) {
            if (St.snakeBody[i].nowy < 0) {
                St.snakeBody[i].nowy = Snake.gameStatic.gameMapHeight - St.snakeW;
            } else if (St.snakeBody[i].nowy > Snake.gameStatic.gameMapHeight) {
                St.snakeBody[i].nowy = 0;
            } else if (St.snakeBody[i].nowx < 0) {
                St.snakeBody[i].nowx = Snake.gameStatic.gameMapWidth - St.snakeW;
            } else if (St.snakeBody[i].nowx > Snake.gameStatic.gameMapWidth) {
                St.snakeBody[i].nowx = St.snakeW;
            }
        },
        // 判断碰撞墙壁
        collisionWall: function() {
            if (St.snakeBody[0].nowy < 0) {
                Snake.snakeUI.gameOver();
                St.canMove = false;
            } else if (St.snakeBody[0].nowy > Snake.gameStatic.gameMapHeight) {
                Snake.snakeUI.gameOver();
                St.canMove = false;
            } else if (St.snakeBody[0].nowx < 0) {
                Snake.snakeUI.gameOver();
                St.canMove = false;
            } else if (St.snakeBody[0].nowx > Snake.gameStatic.gameMapWidth) {
                Snake.snakeUI.gameOver();
                St.canMove = false;
            }
        },
        // 判断碰撞自己
        checkSlef: function() {
            var length = St.snakeBody.length;
            for (var i = 2; i < length; i++) {
                if (Snake.snakeTools.judgeDis(St.snakeBody[0].nowx, St.snakeBody[0].nowy, St.snakeBody[i].nowx, St.snakeBody[i].nowy, 2 * St.snakeW)) {
                    Snake.snakeUI.gameOver();
                    St.canMove = false;
                }
            }
        },
        // 添加状态
        addDir: function(x, y, x1, x2) {
            var pos = {
                x: x1,
                y: x2,
                vx: x,
                vy: y
            };
            St.pointStatus.push(pos);
        },
        // 方向键操作 
        handAction: function() {
            window.addEventListener('keydown', function(ev) {
                if (!St.canHandAction) {
                    return;
                }
                St.canHandAction = false;
                var ev = ev || window.event;
                var x = St.snakeBody[0].nowx;
                var y = St.snakeBody[0].nowy;
                //  根据按键添加状态
                if (ev.keyCode == 37) {
                    if (St.snakeBody[0].speedx == St.snakeV && St.snakeBody[0].speedy == 0) {
                        St.canHandAction = true;
                        return false;
                    }
                    if (St.snakeBody[0].speedx == -St.snakeV && St.snakeBody[0].speedy == 0) {
                        St.canHandAction = true;
                        return false;
                    }
                    S.addDir(-St.snakeV, 0, x, y);
                } else if (ev.keyCode == 38) {
                    if (St.snakeBody[0].speedx == 0 && St.snakeBody[0].speedy == St.snakeV) {
                        St.canHandAction = true;
                        return false;
                    }
                    if (St.snakeBody[0].speedx == 0 && St.snakeBody[0].speedy == -St.snakeV) {
                        St.canHandAction = true;
                        return false;
                    }
                    S.addDir(0, -St.snakeV, x, y);
                } else if (ev.keyCode == 39) {
                    if (St.snakeBody[0].speedx == -St.snakeV && St.snakeBody[0].speedy == 0) {
                        St.canHandAction = true;
                        return false;
                    }
                    if (St.snakeBody[0].speedx == St.snakeV && St.snakeBody[0].speedy == 0) {
                        St.canHandAction = true;
                        return false;
                    }
                    S.addDir(St.snakeV, 0, x, y);
                } else if (ev.keyCode == 40) {
                    if (St.snakeBody[0].speedx == 0 && St.snakeBody[0].speedy == -St.snakeV) {
                        St.canHandAction = true;
                        return false;
                    }
                    if (St.snakeBody[0].speedx == 0 && St.snakeBody[0].speedy == St.snakeV) {
                        St.canHandAction = true;
                        return false;
                    }
                    S.addDir(0, St.snakeV, x, y);
                }
                // 解决同时按下bug
                window.addEventListener('keyup', function() {
                    St.canHandAction = true;
                }, false)
            }, false)
        },
        // 同步分数 
        syncScore: function() {
            Object.defineProperty(Snake.gameStatic.gameMiddleScore, 'score', {
                get: function() {
                    return Snake.gameStatic.gameScore;
                },
                set: function(value) {
                    var el = document.getElementsByClassName('score')[0];
                    el.innerHTML = value;
                    return value;
                }
            });
        },
        // 重新开始游戏
        resetGame: function() {
            var resetGame = document.getElementsByClassName("reset-game")[0];
            var timeNum = document.getElementsByClassName('timenum')[0];
            resetGame.addEventListener('click', function(ev) {
                var ev = ev || window.event;
                // 清空画布
                St.cxt.clearRect(0, 0, Snake.gameStatic.gameMapWidth, Snake.gameStatic.gameMapHeight);
                // 清空得分
                Snake.gameStatic.gameScore = 0;
                Snake.gameStatic.gameMiddleScore = {};
                S.syncScore();
                Snake.gameStatic.gameMiddleScore.score = Snake.gameStatic.gameScore;
                // 停止游戏
                S.resetData();
                St.canMove = false;
                // 读秒显示
                Snake.snakeUI.readTime();
            }, false);
        },
        // 变速
        changeSpeed: function() {
            if (Snake.gameStatic.gameScore > 100) {
                Snake.snake.snakeStatic.snakeT = 5;
            } else if (Snake.gameStatic.gameScore > 200) {
                Snake.snake.snakeStatic.snakeT = 2;
            } else if (Snake.gameStatic.gamePattern == 2) {
                Snake.snake.snakeStatic.snakeT = 5;
            }
        },
        // 暂停游戏
        stopGame: function() {
            var stopGame = document.getElementsByClassName('stop-game')[0];
            stopGame.addEventListener('click', function() {
                if (St.canMove == true) {
                    St.canMove = false;
                    stopGame.innerHTML = "继续游戏";
                } else {
                    St.canMove = true;
                    stopGame.innerHTML = "停止游戏";
                    S.snakeMove();
                }
            }, false);
        },
        // 退出游戏
        outGame: function() {
            var outGame = document.getElementsByClassName('out-game')[0];
            var conductor = document.getElementsByClassName('conductor')[0];
            outGame.addEventListener('click', function() {
                // 暂停运动
                clearInterval(Snake.gameStatic.gameRestTimer);
                // 清空得分
                St.cxt.clearRect(0, 0, Snake.gameStatic.gameMapWidth, Snake.gameStatic.gameMapHeight);
                Snake.gameStatic.gameScore = 0;
                Snake.gameStatic.gameMiddleScore = {};
                S.syncScore();
                Snake.gameStatic.gameMiddleScore.score = Snake.gameStatic.gameScore;
                // 停止游戏
                S.resetData();
                var readTime = document.getElementsByClassName('readtime')[0];
                readTime.style.display = "none";
                conductor.className = "conductor conductor-out conductor-in";
                St.canMove = false;
                // 首页出现
            }, false);
        },
        // 蛇开始
        snakeBegin: function() {
            S.initFirstSnake();
            S.snakeMove();
            S.handAction();
            S.syncScore();
            S.resetGame();
        }
    }
    Snake.snake = snake;
    var S = Snake.snake;
    var St = S.snakeStatic;
})();
/**
 *  snakeUI
 */
(function() {
    var snakeUI = {
        // UI 里的静态变量
        snakeStaticValue: {
            // 标题自动滑出
            snakeIndicate: [{
                text: "欢迎您来挑战贪吃蛇大作战，本款贪吃蛇大作战属于私人订制版，爆炸款贪吃蛇大作战正在开发中，敬请期待。点击下一步查看游戏操作,点击回车跳过所有提示。"
            }, {
                text: "游戏操作键有：方向键'↑' 向上,方向键'↓' 向下,方向键'←' 向左,方向键'→' 向右,进入游戏界面按空格键游戏开始。 点击下一步查看游戏模式，点击回车跳过所有提示。"
            }, {
                text: "该游戏共有五种模式，从易到难有返越境模式，太平洋模式，砖头块模式，碎迷宫模式，进出洞模式。每种模式下分数达到一定值，速度会更快。了解了这些后，点击选择模式赶快去选择模式吧。"
            }],
            // 文字打印的索引值
            index: 0,
            // 文字打印定时器
            textConsoleTimer: null,
            canClickBtnRight: false
        },
        autoShowText: function() {
            var titleText = document.getElementsByClassName('title-text')[0];
            var door = true;
            var timer = setInterval(function() {
                if (door == true) {
                    titleText.className = "title-text title-move";
                }
                door = false;
                Snake.snakeUI.autoAnimateText(timer);
            }, 20);
        },
        // 动画自动加载
        autoAnimateText: function(timer) {
            var titleText = document.getElementsByClassName('title-text')[0];
            if (titleText.offsetLeft >= (Snake.gameStatic.gameMapWidth - 520) / 2) { // window.innerHTML改成了Snake.gameStatic.gameMapWidth
                clearInterval(timer);
                var t = setTimeout(function() {
                    titleText.className = "title-text title-move title-animate";
                }, 20);
            }
        },
        // 小蛇自动出现
        autoShowSnake: function() {
            var titleText = document.getElementsByClassName('title-text')[0];
            var snakeWrapper = document.getElementsByClassName('snake-wrapper')[0];
            Snake.snakeTools.css3AnimationEnd(titleText, function() {
                var timer = setTimeout(function() {
                    snakeWrapper.className = "snake-wrapper show";
                }, 10)
                Snake.snakeUI.autoShowIndicate();
            });
        },
        // 文字说明自动出现
        autoShowIndicate: function() {
            var snakeWrapper = document.getElementsByClassName('snake-wrapper')[0];
            var methods = document.getElementsByClassName('methods')[0];
            Snake.snakeTools.css3TransitionEnd(snakeWrapper, function() {
                var timer = setTimeout(function() {
                    methods.className = "methods m-show";
                    Snake.snakeUI.canClickBtnRight = true;
                }, 10);
                Snake.snakeUI.consoleTextBegin();
                Snake.snakeUI.enterKeyJumpIndicate();
            });
        },
        // 文字开始打印
        consoleTextBegin: function() {
            var methods = document.getElementsByClassName('methods')[0];
            var contentText = document.getElementsByClassName('content-text')[0];
            Snake.snakeTools.css3TransitionEnd(methods, function() {
                Snake.snakeTools.consoleText(Snake.snakeUI.snakeStaticValue.snakeIndicate[Snake.snakeUI.snakeStaticValue.index].text, contentText);
            });
        },
        // 文字的下一步操作 
        nextProcess: function() {
            var next = document.getElementsByClassName('next')[0];
            var selectPattern = document.getElementsByClassName('select-pattern')[0];
            var contentText = document.getElementsByClassName('content-text')[0];
            var length = Snake.snakeUI.snakeStaticValue.snakeIndicate.length;
            next.addEventListener('click', function() {
                Snake.snakeUI.snakeStaticValue.index++;
                if (Snake.snakeUI.snakeStaticValue.index == 2) {
                    next.style.display = 'none';
                    selectPattern.style.display = 'block';
                }
                if (Snake.snakeUI.snakeStaticValue.index >= length) {
                    Snake.snakeUI.snakeStaticValue.index = length - 1;
                    return false;
                }
                Snake.snakeTools.consoleText(Snake.snakeUI.snakeStaticValue.snakeIndicate[Snake.snakeUI.snakeStaticValue.index].text, contentText);
            }, false)
        },
        // 回车跳过提醒操作 
        enterKeyJumpIndicate: function() {
            var next = document.getElementsByClassName('next')[0];
            var selectPattern = document.getElementsByClassName('select-pattern')[0];
            var contentText = document.getElementsByClassName('content-text')[0];
            window.addEventListener('keyup', function(ev) {
                var ev = ev || window.event;
                if (ev.keyCode == 13) {
                    if (Snake.snakeUI.snakeStaticValue.index == Snake.snakeUI.snakeStaticValue.snakeIndicate.length - 1) {
                        return false;
                    }
                    Snake.snakeTools.consoleText(Snake.snakeUI.snakeStaticValue.snakeIndicate[Snake.snakeUI.snakeStaticValue.snakeIndicate.length - 1].text, contentText);
                    Snake.snakeUI.snakeStaticValue.index = Snake.snakeUI.snakeStaticValue.snakeIndicate.length - 1;
                    next.style.display = 'none';
                    selectPattern.style.display = 'block';
                }
            }, false);
        },
        // 选择模式显示
        selectPatternShow: function() {
            var index = 0;
            var icons;
            var length;
            var selPat = document.getElementsByClassName('select-pattern')[0];
            var mark = document.getElementsByClassName('mark')[0];
            var patWra = document.getElementsByClassName('pattern-wrapper')[0];
            selPat.addEventListener('click', function() {
                mark.style.display = 'block';
                patWra.style.display = 'block';
                icons = document.getElementsByClassName('icon');
                length = icons.length;
                for (var i = 0; i < length; i++) {
                    icons[i].className = "icon";
                }
                if (Snake.gameStatic.hadGamePatter) {
                    icons[Snake.gameStatic.gamePattern].className = "icon icon-sec";
                }
                // 显示了之后 选择模式执行
                Snake.snakeUI.patternSelect();
                Snake.snakeUI.crashButton();
                Snake.snakeUI.sureButton();
            }, false)
        },
        // 选择模式
        patternSelect: function() {
            var icons = document.getElementsByClassName('icon');
            var length = icons.length;
            for (var i = 0; i < length; i++) {
                icons[i].index = i;
                icons[i].addEventListener('click', function() {
                    for (var i = 0; i < length; i++) {
                        icons[i].className = "icon";
                    }
                    icons[this.index].className = "icon icon-sec";
                }, false);
            }
        },
        // 取消按钮
        crashButton: function() {
            var crash = document.getElementsByClassName('crash')[0];
            var mark = document.getElementsByClassName('mark')[0];
            var patWra = document.getElementsByClassName('pattern-wrapper')[0];
            crash.addEventListener('click', function() {
                mark.style.display = 'none';
                patWra.style.display = 'none';
            }, false);
        },
        // 确定按钮
        sureButton: function() {
            var sure = document.getElementsByClassName('sure')[0];
            var mark = document.getElementsByClassName('mark')[0];
            var patWra = document.getElementsByClassName('pattern-wrapper')[0];
            var icons = document.getElementsByClassName('icon');
            var methods = document.getElementsByClassName('methods')[0];
            var snakeWrapper = document.getElementsByClassName('snake-wrapper')[0];
            var length = icons.length;
            sure.addEventListener('click', function() {
                for (var i = 0; i < length; i++) {
                    if (icons[i].className.indexOf('icon-sec') != -1) {
                        // 确认蛇的模式 0 1 2 3 4
                        Snake.gameStatic.gamePattern = i;
                        Snake.gameStatic.hadGamePatter = true;
                    }
                }
                if (snakeWrapper.offsetLeft < window.innerWidth) {
                    clearInterval(Snake.snakeUI.textConsoleTimer);
                    methods.className = "methods"
                    var timer = setTimeout(function() {
                        snakeWrapper.className = "snake-wrapper show out";
                        methods.style.display = 'none';
                    }, 10);
                }
                mark.style.display = 'none';
                patWra.style.display = 'none';
            }, false);
        },
        // reselect pattern
        reselectPattern: function() {
            var left = document.getElementsByClassName('left')[0];
            var mark = document.getElementsByClassName('mark')[0];
            var patWra = document.getElementsByClassName('pattern-wrapper')[0];
            var icons = document.getElementsByClassName('icon');
            left.addEventListener('click', function() {
                mark.style.display = 'block';
                patWra.style.display = 'block';
                for (var i = 0; i < icons.length; i++) {
                    icons[i].className = "icon";
                }
                if (Snake.gameStatic.hadGamePatter) {
                    icons[Snake.gameStatic.gamePattern].className = "icon icon-sec";
                }
                Snake.snakeUI.patternSelect();
                Snake.snakeUI.crashButton();
                Snake.snakeUI.sureButton();
            }, false);
        },
        enterGame: function() {
            var right = document.getElementsByClassName('right')[0];
            var conductor = document.getElementsByClassName('conductor')[0];
            var methods = document.getElementsByClassName('methods')[0];
            var snakeWrapper = document.getElementsByClassName('snake-wrapper')[0];
            right.addEventListener('click', function() {
                if (!Snake.snakeUI.canClickBtnRight) {
                    return false;
                }
                if (snakeWrapper.offsetLeft > window.innerWidth) {
                    conductor.className = "conductor conductor-out";
                } else {
                    clearInterval(Snake.snakeUI.textConsoleTimer);
                    methods.className = "methods"
                    var timer = setTimeout(function() {
                        snakeWrapper.className = "snake-wrapper show out";
                        methods.style.display = 'none';
                    }, 10);
                    Snake.snakeTools.css3TransitionEnd(snakeWrapper, function() {
                        var timer = setTimeout(function() {
                            conductor.className = "conductor conductor-out";
                        }, 10);
                    });
                }
                Snake.snakeUI.syncPattern();
            }, false);
        },
        // 初始化画布
        initGameMap: function() {
            var canvas = document.getElementsByClassName("content")[0];
            canvas.width = Snake.gameStatic.gameMapWidth;
            canvas.height = Snake.gameStatic.gameMapHeight;
        },
        readTime: function() {
            var timeNum = document.getElementsByClassName('timenum')[0];
            var readTime = document.getElementsByClassName('readtime')[0];
            clearInterval(Snake.gameStatic.gameRestTimer);
            timeNum.innerHTML = 5;
            setTimeout(function() {
                readTime.style.display = "block";
                readTime.className = "readtime readtime-in";
            }, 10);
            Snake.gameStatic.gameRestTimer = setInterval(function() {
                timeNum.innerHTML = timeNum.innerHTML - 1;
                if (timeNum.innerHTML == -1) {
                    clearInterval(Snake.gameStatic.gameRestTimer);
                    readTime.style.display = "block";
                    readTime.className = "readtime";
                    Snake.snake.snakeStatic.canMove = true;
                    Snake.snake.snakeBegin();
                }
            }, 1000);
        },
        // 游戏读秒开始
        readTimeGameBegin: function() {
            var screen = document.getElementsByClassName('conductor')[0];
            screen.addEventListener('webkitTransitionEnd', function(ev) {
                var ev = ev || window.event;
                ev.stopPropagation();
                if (ev.srcElement.className == "conductor conductor-out") {
                    Snake.snakeUI.readTime();
                }
            }, false);
        },
        // 同步模式
        syncPattern: function() {
            var nowPattern = document.getElementsByClassName('now-pattern')[0];
            var str;
            if (Snake.gameStatic.gamePattern == 0) {
                str = "越境贪吃模式";
            } else if (Snake.gameStatic.gamePattern == 1) {
                str = "碰撞贪吃模式";
            } else if (Snake.gameStatic.gamePattern == 2) {
                str = "限区模式";
            }
            nowPattern.innerHTML = str;
        },
        // gameover
        gameOver: function() {
            var gameOver = document.getElementsByClassName('gameover')[0];
            gameOver.style.display = "block";
        },
        // 再来一局
        replay: function() {
            var gameOver = document.getElementsByClassName('gameover')[0];
            var replay = document.getElementsByClassName('go-replay')[0];
            var timeNum = document.getElementsByClassName('timenum')[0];
            replay.addEventListener('click', function() {
                // 清空画布
                Snake.snake.snakeStatic.cxt.clearRect(0, 0, Snake.gameStatic.gameMapWidth, Snake.gameStatic.gameMapHeight);
                // 清空得分
                Snake.gameStatic.gameScore = 0;
                Snake.gameStatic.gameMiddleScore = {};
                Snake.snake.syncScore();
                Snake.gameStatic.gameMiddleScore.score = Snake.gameStatic.gameScore;
                // 停止游戏
                Snake.snake.resetData();
                gameOver.style.display = "none";
                // 读秒显示
                Snake.snakeUI.readTime();
            }, false);
        },
        returnHome: function() {
            var gameOver = document.getElementsByClassName('gameover')[0];
            var returnHome = document.getElementsByClassName('go-returnhome')[0];
            var conductor = document.getElementsByClassName('conductor')[0];
            returnHome.addEventListener('click', function() {
                gameOver.style.display = "none";
                // 暂停运动
                clearInterval(Snake.gameStatic.gameRestTimer);
                // 清空得分
                Snake.snake.snakeStatic.cxt.clearRect(0, 0, Snake.gameStatic.gameMapWidth, Snake.gameStatic.gameMapHeight);
                Snake.gameStatic.gameScore = 0;
                Snake.gameStatic.gameMiddleScore = {};
                Snake.snake.syncScore();
                Snake.gameStatic.gameMiddleScore.score = Snake.gameStatic.gameScore;
                // 停止游戏
                Snake.snake.resetData();
                var readTime = document.getElementsByClassName('readtime')[0];
                readTime.style.display = "none";
                conductor.className = "conductor conductor-out conductor-in";
            }, false);
        },
        // UI 所有程序执行
        inintSnakeUI: function() {
            Snake.snakeUI.autoShowText();
            Snake.snakeUI.autoShowSnake();
            Snake.snakeUI.nextProcess();
            Snake.snakeUI.selectPatternShow();
            Snake.snakeUI.reselectPattern();
            Snake.snakeUI.enterGame();
            Snake.snakeUI.initGameMap();
            Snake.snakeUI.readTimeGameBegin();
            Snake.snake.stopGame();
            Snake.snake.outGame();
            Snake.snakeUI.replay();
            Snake.snakeUI.returnHome();
        }
    }
    window.Snake.snakeUI = snakeUI;
})();
/**
 * tools
 */
(function() {
    var snakeTools = {
        css3AnimationEnd: function(obj, fn) {
            obj.addEventListener('webkitAnimationEnd', function(ev) {
                var ev = ev || window.envent;
                ev.stopPropagation();
                ev.cancelBubble = true;
                fn.call(obj);
            }, false);
        },
        css3TransitionEnd: function(obj, fn) {
            obj.addEventListener('webkitTransitionEnd', function(ev) {
                var ev = ev || window.event;
                ev.stopPropagation();
                ev.cancelBubble = true;
                fn.call(obj);
            }, false);
        },
        consoleText: function(str, obj) {
            var str = str;
            var result;
            var index = 0;
            if (str.length == 0) {
                return false;
            }
            var length = str.length;
            clearInterval(Snake.snakeUI.snakeStaticValue.textConsoleTimer);
            Snake.snakeUI.snakeStaticValue.textConsoleTimer = setInterval(function() {
                index++;
                if (index >= length) {
                    clearInterval(Snake.snakeUI.snakeStaticValue.textConsoleTimer);
                    return false;
                }
                result = str.substr(0, index + 1);
                obj.innerHTML = result;
            }, 50);
        },
        judgeDis: function(x1, y1, x2, y2, d) {
            var a = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
            var dis = Math.sqrt(a);
            if (dis < d) {
                return true;
            } else {
                return false;
            }
        }
    }
    window.Snake.snakeTools = snakeTools;
})();
Snake.snakeUI.inintSnakeUI();