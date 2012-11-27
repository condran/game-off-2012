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

var Forkinator = cc.Sprite.extend({
    _gameLayer:null,
    _pos_x:null,
    _winSize:null,
    forkFired:false,
    speed:100,

    ctor:function(gameLayer) {
        this._winSize = cc.Director.getInstance().getWinSize();
        this._gameLayer = gameLayer;

        this.initWithFile(s_Forkinator);
        this.setScale(0.32);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.pos_x = this._winSize.width/2;
        this.setPosition(cc.p(this.pos_x, this._winSize.height/10));

        this.scheduleUpdate();
    },

    update:function(dt) {
        if( cc.config.deviceType == 'browser' ) {
            var pos = this.getPosition();
//            if ((ZH.KEYS[cc.KEY.w] || ZH.KEYS[cc.KEY.up]) && pos.y <= this._winSize.height) {
//                pos.y += dt * this.speed;
//            }
//            if ((ZH.KEYS[cc.KEY.s] || ZH.KEYS[cc.KEY.down]) && pos.y >= 0) {
//                pos.y -= dt * this.speed;
//            }
            if ((ZH.KEYS[cc.KEY.a] || ZH.KEYS[cc.KEY.left]) && pos.x >= 0) {
                pos.x -= dt * this.speed;
            }
            if ((ZH.KEYS[cc.KEY.d] || ZH.KEYS[cc.KEY.right]) && pos.x <= this._winSize.width) {
                pos.x += dt * this.speed;
            }
            if (ZH.KEYS[cc.KEY.space] && !ZH.forkFired) {
                this.fireFork();
            }
            this.setPosition( pos );
        }

    },

    setDefaultPosition:function() {
        this.pos_x = this._winSize.width/2;
        this.setPosition(cc.p(this.pos_x, this._winSize.height/10));
    },

    fireFork:function() {
        var pos = this.getPosition();
        var fork = new Fork(this._gameLayer, pos);
        ZH.FORKS.push(fork);
        ZH.forkFired = true;
        this._gameLayer.addChild(fork);
    }
});
