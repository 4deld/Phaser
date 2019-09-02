

/*
auto move
,
update : function() {
    player.x += 1;
    player.y +=1;
///////////////////////////////////////////////////
//move player
    let input = game.input.keyboard.addKey(
            Phaser.Keyboard.RIGHT
        );
        let input1 = game.input.keyboard.addKey(
            Phaser.Keyboard.LEFT
        );
        let input2 = game.input.keyboard.addKey(
            Phaser.Keyboard.UP
        );
        let input3 = game.input.keyboard.addKey(
            Phaser.Keyboard.DOWN
        );
        input.onDown.add(this.right, this);
        input1.onDown.add(this.left, this);
        input2.onDown.add(this.up, this);
        input3.onDown.add(this.down, this);

    },
    right : function(){
        player.x += 100;
    },
    left : function(){
        player.x -= 100;
    },
    up : function(){
        player.y -= 100;
    },
    down : function(){
        player.y += 100;
    }
}
//move player smooth

this.key = game.input.keyboard.createCursorKeys();
update(){
        if(this.key.up.isDown){
            this.sprite.y-=5;
        }
        else if(this.key.down.isDown){
            this.sprite.y +=5;
        }
        else if(this.key.right.isDown){
            this.sprite.x +=5;
        }
        else if(this.key.left.isDown){
            this.sprite.x -=5;
        }
        
        */

var game = new Phaser.Game(700, 700, Phaser.CANVAS, "GameDiv")

class Player{
    constructor(){
        this.sprite = game.add.sprite(400,800,"player");
        this.sprite.anchor.setTo(0.5,0.5)
        game.physics.arcade.enable(this.sprite)
        this.moveSpeed = 1000;
        
    }
    update(){
        game.physics.arcade.moveToPointer(this.sprite,this.moveSpeed);
        if(Phaser.Rectangle.contains(this.sprite.body,game.input.mousePointer.x,game.input.mousePointer.y)){
            this.sprite.body.velocity.setTo(0,0);
        }
    }
    
}

class Bullet{
    constructor(x,y,type,target){
        this.sprite = game.add.sprite(x,y,type)
        game.physics.arcade.enable(this.sprite)
        this.target = target
    }
    setAngle(){
        this.sprite.rotation = game.physics.arcade.angleBetween(this.sprite,this.target)
    }
    move(){
        
    }
    update(){
        this.move();
    }
}
class NormalBullet extends Bullet{
    constructor(x,y,target){
        super(x,y,"NormalBullet",target)
        this.setAngle();
    }
    move(){
        this.setAngle();

        game.physics.arcade.velocityFromAngle(this.sprite.angle,300,this.sprite.body.velocity);
    }
}

class TrackingBullet extends Bullet{
    constructor(x,y,target){
        super(x,y,"TrackingBullet",target)
        this.setAngle();
    }
    move(){
        this.setAngle();
        game.physics.arcade.velocityFromAngle(this.sprite.angle,100,this.sprite.body.velocity);
    }
}

var player;
var bullet;


var play = {
    preload: function () {
        game.load.image("player", "image.png");
        game.load.image("NormalBullet","bullet.png");
        game.load.image("TrackingBullet","trackingbullet.png");

    },
    create: function () {
        game.scale.pageAlignHorizontally=true;
        game.scale.pageAlignVertically=true;
        game.stage.backgroundColor="#66bbaa"

        player = new Player();
        bullet = new NormalBullet(300,300,player.sprite)
        



    },
    update : function() {
        player.update();
        bullet.update();
        collider();
    }
}

function collision(player,bullet){
    bullet.destory();
}

function collider(){
    game.physics.arcade.overlap(player.sprite, bullet.sprite,null,this)
}

game.state.add("Play", play)
game.state.start("Play")