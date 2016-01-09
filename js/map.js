"use strict";

var mapCanvas = new fabric.Canvas('mapCanvas');
var gridsize = 30;


var init = function() {
    
    var mapWidth  = window.innerWidth *0.8;
    var mapHeight = window.innerHeight*0.9;

    mapCanvas.setHeight(mapHeight);
    mapCanvas.setWidth(mapWidth);
        
    drawGrid(gridsize,mapCanvas)

    return mapCanvas
};

var drawGrid = function(gridSize,map) {
    
    var mapWidth  = map.getWidth();
    var mapHeight = map.getHeight();

    var cellsize = mapWidth/gridSize;
    for(var x=0;x<mapWidth ;x += cellsize){
        map.add(new fabric.Line([x, 0, x, mapHeight],{ stroke: "#000000", strokeWidth: 1, selectable:false }));
    };
    for(var y=0;y<mapHeight;y += cellsize){
        map.add(new fabric.Line([0, y, mapWidth, y],{ stroke: "#000000", strokeWidth: 1, selectable:false }));
        };
};

function ObjectAdditions() {
    
    this.map = mapCanvas; 
    var mapWidth = this.map.getWidth();
    var cellsize = mapWidth/gridsize;

    this.addMonster = function() {
       var monster = new fabric.Circle({
           radius: cellsize/2, fill: 'red', left: 100, top: 100, hasControls: false
       });
       this.map.add(monster)
    }
    
    this.addPlayer = function() {
       var monster = new fabric.Triangle({
           width:cellsize, height:cellsize, fill: 'green', left: 100, top: 100, hasControls: false
       });
       this.map.add(monster)
    }

    this.addImage = function(img) {
        var imgElement = document.getElementById(img);
        //console.log(imgElement.width/mapWidth)
        var dispImg = new fabric.Image(imgElement , {
                left:100, top:100,
                scaleX: 2*cellsize/imgElement.width, 
                scaleY: cellsize/imgElement.height, 

        })
        this.map.add(dispImg)
    }
    
    this.deleteObject = function() {
        mapCanvas.getActiveObject().remove();
    }


};

document.addEventListener('DOMContentLoaded', init, false);

// Avtivate knockout.js

ko.applyBindings(new ObjectAdditions());

