/**
 * 按钮列表
*/

class BtnList extends egret.DisplayObjectContainer
{
    /**按钮背景*/
    private _btnBgList: Array<egret.Bitmap>;
    /**开始按钮*/
    private _startBtn: Button;
    /**声音按钮*/
    private _soundBtn: Button;
    /**更多游戏按钮*/
    private _moreBtn: Button;
    /**重试按钮*/
    private _retryBtn: Button;
    /**返回按钮*/
    private _homeBtn: Button;

    public constructor()
    {
        super();
        this._btnBgList = [];
    }
}