/**
 * 锚点类工具(方便用百分比的方式设置锚点位置)
*/

class AnchorUtils
{
    private static _propertyChange:any;
    private static _anchorChange:any;

    public static init():void
    {
        this._propertyChange = Object.create(null);
        this._anchorChange = Object.create(null);
    }
    
    public static setAnchorX(target: egret.DisplayObject, value:number): void
    {
        target["anchorX"] = value;
    }

    public static setAnchorY(target: egret.DisplayObject, value:number): void
    {
        target["anchorY"] = value;
    }

    public static setAnchor(target: egret.DisplayObject, value:number):void
    {
        target["anchorX"] = target["anchorY"] = value;
    }

    public static getAnchor(target: egret.DisplayObject):number
    {
        if(target["anchorX"] != target["anchorY"])
        {
            console.log("target's anchorX != anchorY");
        }
        return target["anchorX"] || 0;
    }

    public static getAnchorX(target: egret.DisplayObject):number
    {
        return target["anchorX"] || 0;
    }

    public static getAnchorY(target: egret.DisplayObject):number
    {
        return target["anchorY"] || 0;
    }

    /**
     * 将anchorx和anchorY属性写入egret.DisplayObject中
    */

    private static injectAnchor():void
    {
        //改写width和height,每次修改了width后自动修改anchor
        Object.defineProperty(egret.DisplayObject.prototype, "width",
        {
            get: function()
            {
                return this.$getWidth();
            },
            set: function(value)
            {
                this.$setWidth(value);
                AnchorUtils._propertyChange[this.hashCode] = true;
                egret.callLater(()=>
                {
                    AnchorUtils.changeAnchor(this);
                },this);
            },
            enumerable : true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "height",
        {
            get: function()
            {
                return this.$getHeight();
            },
            set: function(value)
            {
                this.$setHeight(value);
                AnchorUtils._propertyChange[this.hashCode] = true;
                egret.callLater(()=>
                {
                    AnchorUtils.changeAnchor(this);
                },this);
            },
            enumerable : true,
            configurable: true
        });

        //编写anchorX和anchorY
        Object.defineProperty(egret.DisplayObject.prototype, "anchorX",
        {
            get: function()
            {
                return this._anchorX;
            },
            set: function(value)
            {
                this._anchorX = value;
                AnchorUtils._propertyChange[this.hashCode] = true;
                AnchorUtils._anchorChange[this.hashCode] = true;
                egret.callLater(()=>
                {
                    AnchorUtils.changeAnchor(this);
                },this);
            },
            enumerable : true,
            configurable: true
        });

        Object.defineProperty(egret.DisplayObject.prototype, "anchorY",
        {
            get: function()
            {
                return this._anchorY;
            },
            set: function(value)
            {
                this._anchorY = value;
                AnchorUtils._propertyChange[this.hashCode] = true;
                AnchorUtils._anchorChange[this.hashCode] = true;
                egret.callLater(()=>
                {
                    AnchorUtils.changeAnchor(this);
                },this);
            },
            enumerable : true,
            configurable: true
        });
    }

    //按百分比设置锚点
    private static changeAnchor(target:any):void
    {
        if(this._propertyChange[target.hashCode] && this._anchorChange[target.hashCode])
        {
            target.anchorOffsetX = target._anchorX * target.width;
            target.anchorOffsetY = target._anchorY * target.height;
            delete this._propertyChange[target.hashCode];
        }
    }

}