var b2WeldJointDef=Box2D.Dynamics.Joints.b2WeldJointDef;
var b2Vec2=Box2D.Common.Math.b2Vec2;

var floor=null;
var items=[]
var map=null;
var player=null;
var mapData=null;
function getURL(URL, callback) {
	var xhr=new XMLHttpRequest();
	xhr.open('GET', URL, false);
	xhr.onload=callback;
	xhr.send();
}

//Load Character Sprites
(function() {
	var spriteList={};
	var imgList=[];
	for (spriteImg in spriteList) {
		imgList.push(spriteImg);
		Crafty.sprite(spriteImg, spriteList[spriteImg]);
	}
})();

window.onload=function() {
	Crafty.init(600,300,50);
	Crafty.canvas.init();
	Crafty.Box2D.init({gravityX:0, gravityY:10, scale:30, doSleep:true});
	// Crafty.Box2D.debug = true;
	getURL('base_level.json',function(req) {
		mapData=JSON.parse(this.responseText);
		map=Crafty.e('MapRender').fromSource(mapData);
		map.renderMap(function() {
			console.log('done');
		});
	});
	items.push(Crafty.e('Box2D, Canvas, tiletype3, Object').attr({
		x:60,
		y:40,
		// r:10,
		w:10,
		h:10,
		type:'dynamic',
		friction:0.7,
		// restitution: 0
	}));
	player=Crafty.e('Box2D, Canvas, Contact, bControls,tiletype1, Object, CenterView').attr({
		x:55,
		y:10,
		w:10,
		h:10,
		type:'dynamic',
		// restitution: 0,
		friction:0
	})
	// .circle(10)
	// .color('blue')
	.setDisplacement(20,50)
	.centerOn(0, 1000 , 0, 1300)
	.setSpeed(4);
	player.body.SetFixedRotation(true);
	// player.body.SetUserData('PlayerBody');
	// var hip=new b2WeldJointDef();
	// hip.Initialize(player.body, items[0].body, new b2Vec2(0,0), new b2Vec2(0,0))
	// Crafty.Box2D.world.CreateJoint(hip);
};