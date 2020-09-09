/*!
 * Created by Sergey Borisov on 30.08.2016.
 */

import {Directive, ElementRef, Renderer, HostListener} from "@angular/core";

@Directive({selector: "[auto-focus]"})
export class AutoFocusDirective
{
    private _input: HTMLTextAreaElement;
    
    constructor(private el: ElementRef, private renderer: Renderer) { }
    
    public get input(): HTMLTextAreaElement
    {
        if (!this._input)
            this._input = this.el.nativeElement.querySelector("textarea");
        return this._input;
    }
    
    @HostListener("click")
    protected onClick()
    {
        let input: HTMLTextAreaElement = this.input;
        
        if (!input) return;
        
        if (input.scrollIntoView)
            input.scrollIntoView(false);
        
        if (input && input.focus)
            input.focus();
    }
}
