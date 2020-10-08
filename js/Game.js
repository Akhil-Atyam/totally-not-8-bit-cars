class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(350,200);
    car1.addImage(car1img);
    car2 = createSprite(550,200);
    car2.addImage(car2img);
    car3 = createSprite(750,200);
    car3.addImage(car3img);
    car4 = createSprite(950,200);
    car4.addImage(car4img);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getRank();
    if(allPlayers !== undefined){
    
      imageMode(CENTER);
      image(trackimg,displayWidth/2,-displayHeight-150,displayWidth,displayHeight*5)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 175;
        //use data form the database to display the cars in y direction
        y = displayHeight+100 - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          rectMode(CENTER);
          noFill();
          stroke("red");
          strokeWeight(5)
          rect(cars[index-1].x,cars[index-1].y,60,110)
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3400){
      gameState = 2;
      player.rank++
      Player.updateRank(player.rank);
      alert('You are in '+player.rank+" place");
    }
    drawSprites();
  }

  end(){
  }

}
