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
    _winSize:null,
    helloImg:null,
    helloLabel:null,
    circle:null,
    playerSprite:null,
    gameLayer:null,
    zombies:null,
    zombieCount:null,
    zombieMax:10,
    canSpawnZombie:true,
    _time:null,
    _curTime:null,

    init:function () {

        this._super();

        this._winSize = cc.Director.getInstance().getWinSize();

//        // Score Label
//        this.helloLabel = cc.LabelTTF.create("Zombie Head!", "Acme", 38);
//        this.helloLabel.setPosition(cc.p(this._winSize.width / 2, this._winSize.height - 40));
//        this.addChild(this.helloLabel, 5);

        this.gameLayer = new cc.LazyLayer();
        this.addChild(this.gameLayer);

        this.playerSprite = new Forkinator(this);
        this.gameLayer.addChild(this.playerSprite, 10);

        // Create background
        this.createBackground();

        // Add Enemies
        this.zombieCount = 0;
        this.zombies = [];
        for (var i=0; i < this.zombieMax; i++) {
            this.zombies[i] = new Zombie(this);
        }

        // Enable input
        var t = cc.config.deviceType;
        if( t == 'browser' )  {
            this.setTouchEnabled(true);
            this.setKeyboardEnabled(true);
        }
//        else if( t == 'desktop' ) {
//            this.setMouseEnabled(true);
//        } else if( t == 'mobile' ) {
//            this.setTouchEnabled(true);
//        }

        this.scheduleUpdate();

        return true;
    },

    createBackground:function() {
        this._backSky = cc.Sprite.create(s_NightBackground);
        this._backSky.setAnchorPoint(cc.p(0, 0));
        //this._backSky.setPosition(cc.p(this._winSize.width / 2, this._winSize.height /2))
        this._backSkyHeight = this._backSky.getContentSize().height;
        this.gameLayer.addChild(this._backSky, -10);

    },

    setCanSpawn:function(canSpawn) {
        this.canSpawnZombie = canSpawn;
    },

    addZombieToGameLayer:function() {

        this.gameLayer.addChild(this.zombies[this.zombieCount], 10);
        this.zombieCount++;

    },

    update:function(dt) {

        this._time++;

        var minute = 0 | (this._time / 60);
        var second = this._time % 60;
        minute = minute > 9 ? minute : "0" + minute;
        second = second > 9 ? second : "0" + second;
        this._curTime = minute + ":" + second;


        if (second == '10' && this.zombieCount < this.zombieMax) {
            this.addZombieToGameLayer();
        }
    },

    onKeyDown:function (e) {
        ZH.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        ZH.KEYS[e] = false;
    },
    onTouchesBegan:function(touches, event){
        this._isTouch = true;
    },
    onTouchesMoved:function (touches, event) {
        if(this._isTouch){
            this.processEvent(touches[0]);
        }
    },
    onTouchesEnded:function(touches, event){
        this._isTouch = false;
    },
    onMouseDragged:function( event ) {
        if(this._isTouch){
            this.processEvent( event );
        }
    },
    processEvent:function( event ) {

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
