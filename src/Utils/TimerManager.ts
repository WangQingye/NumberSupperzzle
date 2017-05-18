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
    }
}