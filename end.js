var End = {
    create : function(){
        let mainButton = game.add.button(game.world.width/2-25,game.world.height/2-25,"button", this.goMain);
        let Finalscore = game.add.text(game.world.width/2-65,game.world.height/2-175, "score : "+score);
    },
    goMain : function(){
        game.state.start("Main");
    }
}
game.state.add("End",End);