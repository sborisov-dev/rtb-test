/*!
 * Created by Sergey Borisov on 30.08.2016.
 */

import {Component, Input, EventEmitter, Output} from "@angular/core";
import {EmailService} from "../services/EmailService";
import {AutoFocusDirective} from "../autofocus.directive";

export enum KeyCodes
{
    Backspace = 8,
    Enter = 13,
    Comma = 188
}

@Component({
    selector: "email-editor",
    styleUrls: ["app/email-editor/email-editor.component.css"],
    templateUrl: "app/email-editor/email-editor.component.html",
    directives: [AutoFocusDirective]
})
export class EmailEditorComponent
{
    @Input()
    public emails: string[] = [];
    @Input()
    public watermark: string;
    public rawText: string;
    @Output()
    public onEmailsUpdated = new EventEmitter();
    
    constructor(private emailService: EmailService)
    {
    }
    
    protected isValidEmail(email: string): boolean
    {
        return this.emailService.validate(email);
    }
    
    protected addEmail(email: string): number
    {
        if (!this.hasEmail(email))
        {
            let idx = this.emails.push(email);
            this.onEmailsUpdated.emit();
            return idx;
        }
        
        return -1;
    }
    
    protected removeEmail(email: string): boolean
    {
        let index = this.emails.indexOf(email);
        if (index > -1)
        {
            this.emails.splice(index, 1);
            this.onEmailsUpdated.emit();
        }
        
        return index > -1;
    }
    
    protected hasEmail(email: string): boolean
    {
        return this.emails.indexOf(email) > -1;
    }
    
    protected processRawText()
    {
        let its: string[] = this.emailService.parse(this.rawText);
        its.forEach(x => this.addEmail(x));
        this.rawText = "";
    }
    
    protected onKeyUp(event: KeyboardEvent)
    {
        let keyCode: number = event.keyCode;
        
        if (keyCode === KeyCodes.Comma || keyCode === KeyCodes.Enter)
            return this.stopEvent(event);
    }
    
    protected onKeyDown(event: KeyboardEvent)
    {
        let keyCode: number = event.keyCode;
        
        if (keyCode === KeyCodes.Comma || keyCode === KeyCodes.Enter)
        {
            this.processRawText();
            return this.stopEvent(event);
        }
    }
    
    protected onBackspace()
    {
        if (!this.rawText && this.emails.length > 0)
        {
            let lastEmail: string = this.emails[this.emails.length - 1];
            this.removeEmail(lastEmail);
        }
    }
    
    protected onPaste()
    {
        setTimeout(() => this.processRawText(), 50);
    }
    
    protected stopEvent(event: Event)
    {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
}
