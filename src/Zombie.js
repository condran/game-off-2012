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

        this.initWithFile(s_ZombieHead);
        this.setScale(0.10);
        this.setAnchorPoint(cc.p(0.5, 0.5));


        var yfactor = size.height / 2;
        var xfactor = size.width / 2;

        var verts = [];
        verts[0] = {x:-500.4, y:500.9 ,delay: 0.1 };
        verts[1] = {x:-500,   y:21.9 ,delay: 0.5 };
        verts[2] = {x:-395.4, y:21.9 ,delay: 0.5 };
        verts[3] = {x:-253.3, y:78.1 ,delay: 1 };
        verts[4] = {x:43.6,   y:-48.6,delay: 1 };
        verts[5] = {x:284.0,  y:41.1 ,delay: 1 };
        verts[6] = {x:393.4,  y:38.2 ,delay: 1 };
        verts[7] = {x:410.4,  y:38.2 ,delay: 0.2 };
        verts[8] = {x:500.4,  y:500.9 ,delay: 0 };

        var actions= [];
        var actIdx = 0;
        for (var i=0; i < verts.length; i++) {
            actions[actIdx++] = cc.MoveTo.create(verts[i].delay, cc.p(xfactor + verts[i].x, yfactor + verts[i].y));
        }

        // initial position
        this.setPosition(cc.p(xfactor + verts[0].x - 20, yfactor + verts[0].y - 10));

        var sequence = cc.Sequence.create(actions);
        this.runAction(cc.RepeatForever.create(sequence));

        this.schedule(function()
        {
            this.setRotation(this._rotationAmount+=5);
            if(this._rotationAmount > 360)
                this._rotationAmount = 0;
        }, 0.01, cc.REPEAT_FOREVER);
        this.scheduleUpdate();
    }

});
