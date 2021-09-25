var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = 'green';
// ctx.fillRect(10,10, 100, 100); //10,10 좌표에 100x100 사이즈로


//이미지 세팅
var img1 = new Image();
img1.srs = 'cactus.png';

var img2 = new Image();
img2.src = 'dino.png';


//미리 오브젝트로 설정해두면 나중에 수정이 용이하다.
var dino = {
    //좌표
    x: 10,
    y: 300,
    //사이즈
    width: 100,
    height: 100,
    //
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y)


        /*
            이미지 소스로 넣는 법

            var img1 = new Image();
            img1.srs = 'cactus.png(이런식으로 파일명 짓고)';

            fillRect 대신
            ctx.drawImage(img1, this.x, this.y)

            달리는 모션 : 스프라이트 이미지를 준비해서 프레임마다 이미지를 달리 준다..
            장애물 속도 조정, 점프 중복 제한, 스코어 등 추가해보기
        */
    }
}


//장애물의 경우 크기가 다양해 생성자 사용.
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 300;
        this.width = 100;
        this.height = 100;
    }
    
    draw() {
        ctx.fillStyle = 'red'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y)
    }
}

//게임 진행시간(시간의 흐름은 프레임으로 관리)
var timer = 0;

//장애물들 관리 배열
var cactusGroup = [];

//점프 타이머
var jumpTimer = 0;

var animation;

//프레임마다 실행하도록 설정
function frameAnimation() {

    //원래 변수에 담아서 사용한다.
    animation = requestAnimationFrame(frameAnimation);
    timer++;

    //잔상 지우고 이동만 하도록.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //프레임단위로 1픽셀식 이동: timer가 1씩 올라가니 if로.
    if (timer % 400 === 0) {
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
        a.x--;

        check(dino, a);

        a.draw();
    })

    if (jumping == true) {
        dino.y -= 2;
        jumpTimer++;
    }
    if (jumping == false) {
        if (dino.y < 300) {
            dino.y += 2;;
        }
    }
    if (jumpTimer > 120) {
        jumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}

/*
    충돌 체크
    x축 : cactus의 왼쪽 좌표 - dino의 오른쪽 좌표   < 0 인 경우 부딪힘.
    y축 : cactus의 위쪽 좌표 - dino의 아랫쪽 좌표   < 0 인 경우 부딪힘.
 */
function check(dino, cactus) {
    var ho = cactus.x - (dino.x + dino.width);
    var ver = cactus.y - (dino.y + dino.height);
    if (ho < 0 && ver < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //게임중단
        cancelAnimationFrame(animation);
    }
}


frameAnimation();

//점프 기능
var jumping = false;

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jumping = true;
    }
})