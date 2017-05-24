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

        this.addChild(this._label = new Label);
        this._label.width = 200;
        this._label.size = 40;
        this._label.textColor = 0x7f969d;

        this.onResize();
    }


    protected onResize()
    {
        super.onResize();

        let w = StageUtils.stageW;
        let h = StageUtils.stageH;
        this._bg.width = w;
        this._bg.height = h;

        this._loadingBg.x = w/2 - this._loadingBg.width/2;
        this._loadingBg.y = h/2 - this._loadingBg.height/2;
        this._loadingBar.x = this._loadingBg.x;
        this._loadingBar.y = this._loadingBg.y;
        this._loadingFrame.x = w/2 - this._loadingFrame.width/2;
        this._loadingFrame.y = h/2 - this._loadingFrame.height/2;
        this._label.x = w/2;
        this._label.y = h/2 + 50;
    }

    /**
     * 设置进度
    */
    public setProgress(value:number, total:number)
    {
        let per = value/total;
        this._loadingBar.width = this._loadingBg.width * per;
        this._label.text = Math.ceil(per * 100) + "%";
    }

}