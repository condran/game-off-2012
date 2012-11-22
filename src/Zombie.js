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

var Zombie = cc.Sprite.extend({
    _gameLayer:null,
    _posX:0,
    _rotationAmount:0,

    ctor:function(gameLayer) {

        var size = cc.Director.getInstance().getWinSize();
        this._gameLayer = gameLayer;

        this.initWithFile('res/skull.png');
        this.setScale(0.10);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.setPosition(cc.p(this._posX, size.height/3));

        this.schedule(function()
        {
            this.setRotation(this._rotationAmount+=5);
            if(this._rotationAmount > 360)
                this._rotationAmount = 0;

            if (this._posX > 60) {
                this._gameLayer.setCanSpawn(true);
            }

            this.setPosition(cc.p(this._posX++, this.getPositionY()));
            if (this._posX > size.width) {
                this.removeFromParentAndCleanup();
            }
        }, 0.01, cc.REPEAT_FOREVER);
    }
});
