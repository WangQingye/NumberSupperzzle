/**
 * 定时器管理类，需要初始化
*/

class TimerManager
{
    private static _handlers: Array<TimerHandler>;
    private static _delHandlers: Array<TimerHandler>;
    private static _currTime: number;
    private static _currFrame: number;
    private static _count: number;
    private static _timeScale: number;

    /**初始化*/
    public static init()
    {
        this._handlers = new Array<TimerHandler>();
        this._delHandlers = new Array<TimerHandler>();
        this._currTime = egret.getTimer();
        this._currFrame = 0;
        this._count = 0;
        this._timeScale = 1;

        egret.Ticker.getInstance().register(this.onEnterFrame,this);
    }

    /**设置时间参数*/
    public static setTimerScale(timeScale: number):void
    {
        this._timeScale = timeScale;
    }


    /**每一帧执行函数*/
    private static onEnterFrame():void
    {
        this._currFrame++;
        this._currTime = egret.getTimer();
        DebugUtils.start('TimerManager:');

        for(let i = 0; i < this._count; i++)
        {
            let handler:TimerHandler = this._handlers[i];
            let t:number = handler.userFrame ? this._currFrame : this._currTime;
            
            if( t >= handler.exeTime)
            {
                DebugUtils.start(handler.method.toString());
                handler.method.call(handler.methodObj,(this._currTime - handler.lastTime) * this._timeScale);
                DebugUtils.stop(handler.method.toString());
                handler.lastTime = this._currTime;
                handler.exeTime += handler.delay;
                if(!handler.repeat)
                {
                    if(handler.repeatCount > 1)
                    {
                        handler.repeatCount--;
                    }else
                    {
                        if(handler.completeMethod)
                        {
                            handler.completeMethod.apply(handler.completeMethodObj);
                        }
                        this._delHandlers.push(handler);
                    }
                }
            }
        }
        while(this._delHandlers.length)
        {
            var handler:TimerHandler = this._delHandlers.pop();
            this.remove(handler.method, handler.methodObj);
        }
        DebugUtils.stop("TimerManager:");
    }

    private static create(userFrame:boolean, delay:number, repeatCount:number, method:Function, methodObj:any, completeMethod:Function, completeMethodObj:any):void
    {
        //参数监测
        if(delay < 0 || repeatCount < 0 || method == null)
        {
            console.log('test1');
            return;
        }

        //先删除相同的函数的计时
        this.remove(method,methodObj);

        //创建
        let handler: TimerHandler = ObjectPool.pop("TimerHandler");
        handler.userFrame = userFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.completeMethod = completeMethod;
        handler.completeMethodObj = completeMethodObj;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
        handler.lastTime = this._currTime;
        this._handlers.push(handler);
        this._count++;
    }

    /**时间定时执行
     * @param delay 执行间隔：毫秒
     * @param repeatCount 执行次数，0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数对象
     * @param completeMethod 完成时的回调函数
     * @param completeMethodObj 回调函数所属对象
     * 
    */

    public static doTimer(delay:number, repeatCount:number, method:Function, methodObj:any, completeMethod:Function, completeMethodObj:any):void
    {
        this.create(false, delay, repeatCount, method, methodObj, completeMethod, completeMethodObj);
    }

    /**帧数定时执行
     * @param delay 执行间隔：毫秒
    */

    public static doFrame(delay:number, repeatCount:number, method:Function, methodObj:any, completeMethod:Function, completeMethodObj:any):void
    {
        this.create(true, delay, repeatCount, method, methodObj, completeMethod, completeMethodObj);
    }

    /**定时器数量*/
    public static get count():number
    {
        return this._count;
    }

    /**清理某个方法的定时器*/
    public static remove(method:Function, methodObj:any):void
    {
        for (let i = 0; i < this.count; i++) 
        {
            let handler: TimerHandler = this._handlers[i];
            if(handler.methodObj == methodObj && handler.method == method)
            {
                this._handlers.splice(i,1);
                ObjectPool.push(handler);
                this._count--;
                i--;
            }
        }
    }

    /**清理某个对象的定时器*/
    public static removeAll(methodObj:any):void
    {
        for (let i = 0; i < this.count; i++) 
        {
            let handler: TimerHandler = this._handlers[i];
            if(handler.methodObj == methodObj)
            {
                this._handlers.splice(i,1);
                ObjectPool.push(handler);
                this._count--;
                i--;
            }
        }
    }

    /**检测是否已经存在*/
    public static isExists(method:Function, methodObj:any):boolean
    {
        for( let i = 0; i < this._count; i++)
        {
            let handler:TimerHandler = this._handlers[i];
            if(handler.method == method && handler.methodObj == methodObj)
            {
                return true;
            }
        }
        return false;
    }

}

class TimerHandler
{
    /**执行间隔*/
    public delay: number = 0;
    /**是否重复执行*/
    public repeat: boolean;
    /**重复执行的次数*/
    public repeatCount: number = 0;
    /**是否使用帧率*/
    public userFrame: boolean;
    /**执行时间*/
    public exeTime: number = 0;
    /**处理函数*/
    public method: Function;
    /**处理函数所属对象*/
    public methodObj: any;
    /**处理函数的回调*/
    public completeMethod: Function;
    /**回调函数的所属对象*/
    public completeMethodObj: any;
    /**上次的执行时间*/ 
    public lastTime: number = 0;


    /**清理*/
    public clear():void
    {
        this.method = null;
        this.methodObj = null;
        this.completeMethod = null;
        this.completeMethodObj = null;
        console.log('清理时间管理');
    }
}