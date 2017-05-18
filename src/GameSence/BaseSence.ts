/**
 * 基础界面，继承使用
*/

class BaseScene extends egret.DisplayObjectContainer 
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }
}


