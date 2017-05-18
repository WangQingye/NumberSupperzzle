/**
 * 基础界面，继承使用
*/

class BaseScene extends egret.DisplayObjectContainer 
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        StageUtils.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.init();
    }

    /**初始化*/
    protected init()
    {
        TimerManager.doFrame(1, 0, this.update, this);
    }

    /**帧更新*/
    protected update(time:number)
    {

    }

    protected onResize()
    {

    }

    /**退出释放*/
    public dispos()
    {
        TimerManeger.remove(this.update, this);
        DisplayUitls.removeFromParent(this);
    }
}


