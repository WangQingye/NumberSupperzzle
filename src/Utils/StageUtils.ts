/**
 * 舞台工具类
*/

class StageUtils
{
    /**获取舞台*/
    public static get stage()
    {
        return egret.MainContext.instance.stage;
    }

    /**获取舞台宽度*/
    public static get stageW()
    {
        return egret.MainContext.instance.stage.stageWidth;
    }

    /**获取舞台宽度*/
    public static get stageH()
    {
        return egret.MainContext.instance.stage.stageHeight;
    }
}