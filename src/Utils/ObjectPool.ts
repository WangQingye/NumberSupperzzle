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
        }else //如果列表里还没有对象，就新生成
        {
            let classZ:any = egret.getDefinitionByName(refKey);
            let argsLen:number = args.length;
            let obj:any;
            if(argsLen == 0)
            {
                obj = new classZ();
            }
            else if(argsLen == 1)
            {
                obj = new classZ(args[0]);
            }
            else if(argsLen == 2)
            {
                obj = new classZ(args[0],args[1]);
            }
            else if(argsLen == 3)
            {
                obj = new classZ(args[0],args[1],args[2]);
            }
            else if(argsLen == 4)
            {
                obj = new classZ(args[0],args[1],args[2],args[3]);
            }            
            else if(argsLen == 5)
            {
                obj = new classZ(args[0],args[1],args[2],args[3],args[4]);
            }
        }
    }

    /**取出一个带标识符的对象*/

    public static popExtraKey(refKey:string, extraKey:any):any
    {
        if(!ObjectPool._content[refKey])
        {
            ObjectPool._content[refKey] = [];
        }

        let obj:any
        let list:Array<any> = ObjectPool._content[refKey];

        if(list.length)
        {
            for(let i = 0; i < list.length ; i++)
            {
                if(list[i].extarKey == extraKey)
                {
                    obj = list[i];
                    list.splice(i,1);
                    break;
                }
            }
        }
        if(!obj)
        {
            let classZ:any = egret.getDefinitionByName(refKey);
            obj = new classZ(extraKey);
            obj.extraKey = extraKey;
            obj.ObjectPoolKey = refKey;
        }
        return obj;
    }

    /**存入对象*/
    public static push(obj:any):boolean
    {
        if(obj == null) return false;

        let refKey:any = obj.ObjectPoolKey;
        let arr:Array<any> = ObjectPool._content[refKey];
        
        //只有pop出来的对象可以放进来，或者已经存在的无法放入
        if(!arr || arr.indexOf(obj) >= 0)
        {
            return false;
        }

        ObjectPool._content[refKey].push(obj);
        return true;
    }

    /**清空对象池*/
    public static clear():void
    {
        ObjectPool._content = {};
    }

    /**清除某一个类组
     * @param refKey:对象类型
     * @param clearFuncName 对象本身的清除函数
    */
    public static clearClass(refKey:string, clearFuncName:string = null):void
    {
        let list: Array<any> = ObjectPool._content[refKey];
        while(list && list.length)
        {
            let obj:any = list.pop();
            if(clearFuncName)
            {
                obj[clearFuncName]();
            }
            obj = null;
        }
        ObjectPool._content[refKey] = null;
        delete ObjectPool._content[refKey];
    }

    /**某一类对象统一执行一个函数
     * @param refKey：对象类型
     * @param dealFuncName 要执行的函数名称
    */
    public static dealFunc(refKey:string, dealFunc:string): void
    {
        let list: Array<any> = ObjectPool._content[refKey];
        if(!list) return;
        let i:number = 0;
        let len:number = list.length;
        for(i; i<len; i++)
        {
            list[i][dealFunc]();
        }
    }
}