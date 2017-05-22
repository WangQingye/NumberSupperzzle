/**
 * 可以存放多种对象的对象池
*/

class ObjectPool
{
    private static _content: any = {};

    /**取出对象*/
    public static pop(refKey:string, ...args:any[]): any
    {
        //是否已经有这一种对象的集合，没有则新建
        if(!ObjectPool._content[refKey])
        {
            ObjectPool._content[refKey] = [];
        }
        let list:Array<any> = ObjectPool._content[refKey];

        if(list.length)
        {
            return list.pop();
        }else
        {
            let classZ:any = egret.getDefinitionByName(refKey);
        }  
    }
}