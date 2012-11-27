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

var Fork = cc.Sprite.extend({
    _gameLayer:null,
    _winSize:null,


    ctor:function(gameLayer, startPos) {
        this._winSize = cc.Director.getInstance().getWinSize();
        this._gameLayer = gameLayer;

        this.initWithFile(s_Fork);
        this.setScale(0.3);

        var delay = 4 * Math.random();
        var curX = startPos.x;

        this.setPosition(startPos);

        var action = cc.MoveTo.create(delay, cc.p(curX, 500));
        this.runAction(action);

        this.scheduleUpdate();
    },

    collisionRect:function() {
        var p = this.getPosition();
        return cc.rect(p.x - 3, p.y - 3, 6, 6);
    }

});