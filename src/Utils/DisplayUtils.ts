/**
 * 显示工具类 
*/

class DisplayuUtils
{
    /**创建一个Bitmap
     * @param resName 配置文件中的name
    */

    public static createBitmap(resName:string):egret.Bitmap
    {
        let img:egret.Bitmap = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(resName);
        img.texture = texture;
        return img;
    }

    /**
     * 将一个对象从父级移除
     * @param child 具体的对象
    */

    public static removeFromParent(child: egret.DisplayObject)
    {
        if(child.parent)
        {
            child.parent.removeChild(child);
        } 
    }
}