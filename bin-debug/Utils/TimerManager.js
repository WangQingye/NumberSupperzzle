/**
 * 定时器管理类，需要初始化
*/
var TimerManager = (function () {
    function TimerManager() {
    }
    var d = __define,c=TimerManager,p=c.prototype;
    /**初始化*/
    TimerManager.init = function () {
        this._handlers = new Array();
        this._delHandlers = new Array();
        this._currTime = egret.getTimer();
        this._currFrame = 0;
        this._count = 0;
        this._timeScale = 1;
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    };
    /**设置时间参数*/
    TimerManager.setTimerScale = function (timeScale) {
        this._timeScale = timeScale;
    };
    /**每一帧执行函数*/
    TimerManager.onEnterFrame = function () {
        this._currFrame++;
        this._currTime = egret.getTimer();
        DebugUtils.start('TimerManager:');
        for (var i = 0; i < this._count; i++) {
            var handler_1 = this._handlers[i];
            var t = handler_1.userFrame ? this._currFrame : this._currTime;
            if (t >= handler_1.exeTime) {
                DebugUtils.start(handler_1.method.toString());
                handler_1.method.call(handler_1.methodObj, (this._currTime - handler_1.lastTime) * this._timeScale);
                DebugUtils.stop(handler_1.method.toString());
                handler_1.lastTime = this._currTime;
                handler_1.exeTime += handler_1.delay;
                if (!handler_1.repeat) {
                    if (handler_1.repeatCount > 1) {
                        handler_1.repeatCount--;
                    }
                    else {
                        if (handler_1.completeMethod) {
                            handler_1.completeMethod.apply(handler_1.completeMethodObj);
                        }
                        this._delHandlers.push(handler_1);
                    }
                }
            }
        }
        while (this._delHandlers.length) {
            var handler = this._delHandlers.pop();
            this.remove(handler.method, handler.methodObj);
        }
        DebugUtils.stop("TimerManager:");
    };
    TimerManager.create = function (userFrame, delay, repeatCount, method, methodObj, completeMethod, completeMethodObj) {
        //参数监测
        if (delay < 0 || repeatCount < 0 || method == null) {
            return;
        }
    };
    return TimerManager;
}());
egret.registerClass(TimerManager,'TimerManager');
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔*/
        this.delay = 0;
        /**重复执行的次数*/
        this.repeatCount = 0;
        /**执行时间*/
        this.exeTime = 0;
        /**上次的执行时间*/
        this.lastTime = 0;
    }
    var d = __define,c=TimerHandler,p=c.prototype;
    /**清理*/
    p.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.completeMethod = null;
        this.completeMethodObj = null;
        console.log('清理时间管理');
    };
    return TimerHandler;
}());
egret.registerClass(TimerHandler,'TimerHandler');
//# sourceMappingURL=TimerManager.js.map