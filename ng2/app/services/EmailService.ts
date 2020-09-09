/*!
 * Created by Sergey Borisov on 30.08.2016.
 */

import {Injectable} from "@angular/core";

@Injectable()
export class EmailService
{
    private _re: RegExp;
    private _chars: string;
    private _delimeters: string[];
    
    constructor()
    {
        this._chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this._delimeters = [",", ";", " "];
        this._re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    }
    
    public validate(text: string): boolean
    {
        return this._re.test(text);
    }
    
    public parse(text: string): string[]
    {
        if (!text)
            return [];
        
        let result = [],
            term = "";
        
        for (let i = 0, l = text.length; i < l; i++)
        {
            let char = text[i];
            if (this._delimeters.indexOf(char) > -1)
            {
                result.push(term);
                term = "";
            }
            else
            {
                term += char;
            }
        }
        if (term)
            result.push(term);
        
        return result;
    }
    
    public generateRandomEmail(): string
    {
        let hosts: string[] = ["gmail.com", "mail.ru", "yandex.ru", "outlook.com", "test.org"],
            username: string = this.randomString(Math.floor(Math.random() * 15) || 7),
            host: string = hosts[Math.floor(Math.random() * 5)];
        
        return `${username}@${host}`;
    }
    
    private randomString(len: number): string
    {
        let chars: string = this._chars,
            result: string = "";
        
        for (let i = 0; i < len; i++)
        {
            let index = Math.floor(Math.random() * chars.length);
            result += chars.substring(index, index + 1);
        }
        return result;
    }
}
