/**
 * 舞台工具类
*/
var StageUtils = (function () {
    function StageUtils() {
    }
    var d = __define,c=StageUtils,p=c.prototype;
    d(StageUtils, "stage"
        /**获取舞台*/
        ,function () {
            return egret.MainContext.instance.stage;
        }
    );
    d(StageUtils, "stageW"
        /**获取舞台宽度*/
        ,function () {
            return egret.MainContext.instance.stage.stageWidth;
        }
    );
    d(StageUtils, "stageH"
        /**获取舞台宽度*/
        ,function () {
            return egret.MainContext.instance.stage.stageHeight;
        }
    );
    return StageUtils;
}());
egret.registerClass(StageUtils,'StageUtils');
//# sourceMappingURL=StageUtils.js.map