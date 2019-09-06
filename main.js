var Main={
    create : function(){
        game.scale.pageAlignHorizontally=true;
        game.scale.pageAlignVertically=true;
        game.stage.backgroundColor="#ffffff";
        let startButton = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );
        startButton.onDown.addOnce(this.start, this);

        let text = game.add.text(game.world.width/2,game.world.height/2,"...Press Spacebar...")
    },
    start : function(){
        game.state.start("Play")
    }
    
}
game.state.add("Main", Main);
game.state.start("Main")