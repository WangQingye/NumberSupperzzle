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
        let posArr = [[0,0],[0,-173],[149, -83],[149,83],[0,173],[-149,83],[-149,-83]];

        for(let i = 0; i < 7 ; i++)
        {
            let btnBg = DisplayuUtils.createBitmap("hexabg_png");
            AnchorUtils.setAnchor(btnBg, 0.5);
            btnBg.x = posArr[i][0];
            btnBg.y = posArr[i][1];
            this.addChild(btnBg);
            this._btnBgList.push(btnBg);
        }

        this.addChild(this._startBtn = ObjectPool.pop("Button"));
        this.addChild(this._soundBtn = ObjectPool.pop("Button"));
        this.addChild(this._moreBtn = ObjectPool.pop("Button"));
        this.addChild(this._retryBtn = ObjectPool.pop("Button"));
        this.addChild(this._homeBtn = ObjectPool.pop("Button"));

        this._startBtn.init("red_png", "btn_play_png");
        this._startBtn.setSpriteOffset(7,0);
        this._startBtn.x = posArr[0][0];
        this._startBtn.y = posArr[0][1];
        this._soundBtn.init("yellow_png", "");
        this._soundBtn.x = posArr[5][0];
        this._soundBtn.y = posArr[5][1];
        PlayerDataManager.registerSoundBtn(this._soundBtn);
        this._soundBtn.setOnTap(()=>{
            if(PlayerDataManager.isMute)
            {
                MISO.trigger("soundOn", null);
            }else
            {
                MISO.trigger("soundOff", null);
            }
            PlayDataManager.setMute(!PlayerDataManager.isMute);
        });

        this._moreBtn.init("yellow_png", "retry_png");
        this._moreBtn.setSpriteOffset(3,0);
        this._moreBtn.x = posArr[3][0];
        this._moreBtn.y = posArr[3][1];
        this._moreBtn.setOnTap(()=>{
            MISO.trigger("moreGames", null);
        });
        this._retryBtn.init("yellow_png", "retry_png");
        this._retryBtn.x = posArr[4][0];
        this._retryBtn.y = posArr[4][1];
        this._homeBtn.init("yellow_png", "home_png");
        this._homeBtn.x = posArr[3][0];
        this._homeBtn.y = posArr[3][1];
    }

    public hide()
    {
        this._btnBgList.forEach(bg => {
            bg.visible = false;
        })
        this._startBtn.visible = false;
        this._soundBtn.visible = false;
        this._moreBtn.visible = false;
        this._retryBtn.visible = false;
        this._homeBtn.visible = false;
        console.log('');
    }
}