Crafty.c('MapRender', {
	_physicsEngine:'Box2D',
	_renderMethod:'Canvas',
	_layerComponents:{},
	init: function() {
		this.spritesLoaded=false;
		this.mapRendered=false;
	},
	fromSource: function(mapData) {
		this._source=mapData;
		return this;
	},
	renderMap: function(callback) {
		this.loadSprites();
		if(!this._source) return;
		// if (!this.spritesLoaded)return;
		if(this.mapRendered) return;
		this._layers={}
		this.tileW=this._source.tilewidth;
		this.tileH=this._source.tileheight;
		for (var i = 0; i < this._source.layers.length; i++) {
			var layer=this._source.layers[i]
			var lWidth=layer.width;
			var tiles=[];
			var comp=this._physicsEngine+', '+this._renderMethod+' ';
			comp+=(layer.name in this._layerComponents)? this._layerComponents[layer.name]:'';
			console.log(comp);
			for(var k=0; k<layer.data.length; k++){
				if(layer.data[k])
				{
					var xPos=(k%lWidth)*this.tileW;
					var yPos=(Math.floor(k/lWidth))*this.tileH;
					tiles.push(Crafty.e(comp+', TileMap, tiletype'+layer.data[k])
					.attr({
						x:xPos,
						y:yPos,
						w:this.tileW,
						h:this.tileH,
					}));
				}
			}
			this._layers[layer.name]=tiles;
		};
		this.mapRendered=true;
		callback();
	},
	loadSprites: function() {
		var imgList=[];
		var sMaps={};
		for (var i = 0; i < this._source.tilesets.length; i++) {
			var tSet=this._source.tilesets[i];
			imgList.push(tSet.image);
			var numX=tSet.imagewidth/tSet.tilewidth;
			var numY=tSet.imageheight/tSet.tileheight;
			var mapSprite={};
			for(var i=0; i<(numX*numY); i++)
			{
				var xC=i%numX;
				var yC=Math.floor(i/numY);
				mapSprite['tiletype'+(tSet.firstgid+i)]=[xC*tSet.tilewidth, yC*tSet.tileheight, tSet.tilewidth, tSet.tileheight];
			}
			Crafty.sprite(tSet.image, mapSprite);
			sMaps[tSet.image]=mapSprite;
		}
		Crafty.load(imgList, function() {
			this.spritesLoaded=true;
			console.log('images loaded');
		});
		this.spriteMaps=sMaps;
	},
});