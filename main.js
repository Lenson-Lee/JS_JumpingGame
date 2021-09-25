var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = 'green';
// ctx.fillRect(10,10, 100, 100); //10,10 좌표에 100x100 사이즈로

//미리 오브젝트로 설정해두면 나중에 수정이 용이하다.
var dino = {
    //좌표
    x: 10,
    y: 200,
    //사이즈
    width: 50,
    height: 50,
    //
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//장애물의 경우 크기가 다양해 생성자 사용.
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//게임 진행시간(시간의 흐름은 프레임으로 관리)
var timer = 0;

//장애물들 관리 배열
var cactusGroup = [];

//점프 타이머
var jumpTimer = 0;



//프레임마다 실행하도록 설정
function frameAnimation() {
    requestAnimationFrame(frameAnimation);
    timer++;

    //잔상 지우고 이동만 하도록.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //프레임단위로 1픽셀식 이동: timer가 1씩 올라가니 if로.
    if (timer % 120 === 0) {
        var cactus = new Cactus();
        cactusGroup.push(cactus);
    }

    //forEach함수는 파라미터가 2개 집어넣기 가능.
    cactusGroup.forEach((a, i, o) => {
        //x좌표가 0 미만이면 제거
        if (a.x < 0) {
            //?????
            o.splice(i, 1)
        }
        // a.x--;
        a.draw();
    })

    if (jumping == true) {
        dino.y--;
        jumpTimer++;
    }
    if (jumping == false) {
        if (dino.y < 200) {
            dino.y++;
        }
    }
    if (jumpTimer > 70) {
        jumping = false;
    }

    dino.draw();
}

frameAnimation();

//점프 기능
var jumping = false;
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jumping = true;
    }
})