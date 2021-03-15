var ball;
//declare varibles = step 1
var database;
var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database(); //namespacing - step 2

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //reference the database //step 3
    var ballPositionRef = database.ref("ball/position");
    
    //read data from database - step 4. on() function to read or listen to data
    //.on("value",function if there is data,function if there is no data)
    ballPositionRef.on("value",readPosition,showError)

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function readPosition(data){
    position = data.val(); //data stores the data from the database, .val() is the JSON
    console.log(position.x);
    ball.x = position.x
    ball.y = position.y
}

function showError() {
    console.log("data not found")
}
function changePosition(x,y){
   /* var ballPositionRef = database.ref("ball/position");
    ballPositionRef.set({
        x:position.x+x,
        y:position.y+y
    })*/

    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    })
   
}
