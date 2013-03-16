Crafty.c('Contact', {
	init:function() {
		this.requires('Box2D');
	},
	hasContact:function(objUserData) {
		var contactList=this.body.GetContactList();
		while(contactList != null) {
			var contact=contactList.contact;
			if( contact.IsTouching() )
			{
				var colUserData=contact.m_fixtureB.GetBody().GetUserData();
				if( colUserData != objUserData )
					return true;
			}
			contactList=contactList.next;
		}
		return false;
	}
});

Crafty.c('bControls', {
	init: function() {
		this.requires('Box2D');
		this.cVelocity=1.5;
		//Force
		this.bind('EnterFrame', function() {
			//Left
			if(Crafty.keydown[37] || Crafty.keydown[65])
			{
				var cur_v=this.body.GetLinearVelocity();
				this.body.SetAwake(true);
				this.body.SetLinearVelocity({x:-this.cVelocity,y:cur_v.y});
			}
			//Right
			if(Crafty.keydown[39] || Crafty.keydown[68])
			{
				var cur_v=this.body.GetLinearVelocity();
				this.body.SetAwake(true);
				this.body.SetLinearVelocity({x:this.cVelocity,y:cur_v.y});
			}
		});
		//Release
		this.bind('KeyUp', function(e) {
			var code=e.key;
			if(code==37 || code==65 || code==39 || code==68)
			{
				var cur_v=this.body.GetLinearVelocity();
				this.body.SetLinearVelocity({x:0,y:cur_v.y});
			}
		});
		this.bind('KeyDown', function(e) {
			var code=e.key;
			if(code==38 || code==87)
			{
				if(this.hasContact('Player Body'))
				{
					var fVec=new Box2D.Common.Math.b2Vec2(0,-50);
					this.body.ApplyForce(fVec, this.body.GetWorldCenter());
				}
			}
		});
	},
	setSpeed: function(speed) {
		this.cVelocity=speed;
		return this;
	},
});


function sign(val) {
	return val<0?-1:1;
};


Crafty.c('CenterView', {
	init:function() {
		this.vw=Crafty.viewport.width;
		this.vh=Crafty.viewport.height;
		this.dispX=10;
		this.dispY=10;
	},
	setDisplacement: function(_dx, _dy) {
		this.dispX=_dx;
		this.dispY=_dy;
		return this;
	},
	centerOn: function(minExtendX, maxExtendX, minExtendY, maxExtendY) {
		this.minX=-maxExtendX;
		this.maxX=-minExtendX;
		this.maxY=-minExtendY;
		this.minY=-maxExtendY;
		this.bind('EnterFrame', function() {
			var effX=Crafty.viewport.x+this.x;
			var xDisp=effX-this.vw/2;
			if(Math.abs(xDisp)>this.dispX)
			{
				var newX=Crafty.viewport.x-(xDisp-sign(xDisp)*this.dispX);
				if(newX > this.maxX)
					Crafty.viewport.x=this.maxX;
				else if(newX < this.minX)
					Crafty.viewport.x=this.minX;
				else
					Crafty.viewport.x=newX;
			}
			var effY=Crafty.viewport.y+this.y;
			var yDisp=effY-this.vh/2;
			if(Math.abs(yDisp)>this.dispY)
			{
				var newY=Crafty.viewport.y-(yDisp-sign(yDisp)*this.dispY);
				if(newY > this.maxY)
					Crafty.viewport.y=this.maxY;
				else if(newY < this.minY)
					Crafty.viewport.y=this.minY;
				else
					Crafty.viewport.y=newY;
			}			
		});
		return this;
	}
});

