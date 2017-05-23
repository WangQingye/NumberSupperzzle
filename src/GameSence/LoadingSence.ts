/**
 * 加载界面
*/

class LoadingSence extends BaseScene
{
    private _bg: egret.Bitmap;
    private _loadingFrame: egret.Bitmap;
    private _loadingBg: egret.Bitmap;
    private _loadingBar: egret.Bitmap;
    private _label:egret.TextField;

    protected init()
    {
        super.init();

        this.addChild(this._bg = DisplayuUtils.createBitmap("bg_png"));
        this.addChild(this._loadingBg = DisplayuUtils.createBitmap("loading3_png"));
        this.addChild(this._loadingBar = DisplayuUtils.createBitmap("loading2_png"));
        this._loadingBar.width = 0;
        this.addChild(this._loadingFrame = DisplayuUtils.createBitmap("loading1_png"));

        this.addChild(this._label = new Label)
    }

}