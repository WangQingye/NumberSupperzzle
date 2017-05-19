/**
 * 基础界面，继承使用
*/
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        StageUtils.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    }
    var d = __define,c=BaseScene,p=c.prototype;
    p.onAddToStage = function (event) {
        this.init();
    };
    /**初始化*/
    p.init = function () {
        TimerManager.doFrame(1, 0, this.update, this);
    };
    /**帧更新*/
    p.update = function (time) {
    };
    p.onResize = function () {
    };
    /**退出释放*/
    p.dispos = function () {
        TimerManeger.remove(this.update, this);
        DisplayUitls.removeFromParent(this);
    };
    return BaseScene;
}(egret.DisplayObjectContainer));
egret.registerClass(BaseScene,'BaseScene');
//# sourceMappingURL=BaseSence.js.map