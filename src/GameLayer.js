/*
 * Copyright © 2012 Paul Condran
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var GameLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    playerSprite:null,
    gameLayer:null,
    zombieCount:null,
    zombieMax:10,

    init:function () {

        this._super();

        var size = cc.Director.getInstance().getWinSize();

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Zombie Head!", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.p(size.width / 2, size.height - 40));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        this.gameLayer = new cc.LazyLayer();
        this.addChild(this.gameLayer);

        // Add Enemies
        this.zombieCount = 0;
        this.scheduleUpdate();

        return true;
    },

    addZombieToGameLayer:function() {

        var rotationAmount = 0;
        var posx = 0;
        var size = cc.Director.getInstance().getWinSize();
        var zombie = cc.Sprite.create('res/skull.png');

        zombie.setAnchorPoint(cc.p(0.5, 0.5));
        zombie.setPosition(cc.p(size.width/2, size.height/2));
        zombie.setScale(0.10);
        zombie.schedule(function()
        {
            this.setRotation(rotationAmount+=5);
            if(rotationAmount > 360)
                rotationAmount = 0;

            this.setPosition(cc.p(posx++, this.getPositionY()));
            if (posx > size.width) {
                this.removeFromParentAndCleanup();
            }
        });
        this.gameLayer.addChild(zombie, 0);
    },

    update:function(dt) {
        if (true) {
            if (this.zombieCount < this.zombieMax) {
                this.zombieCount++;
                this.addZombieToGameLayer();
            }
        }
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        layer.init();
    }
});
