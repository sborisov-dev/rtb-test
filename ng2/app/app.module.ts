import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {EmailEditorComponent} from "./email-editor/email-editor.component";
import {EmailService} from "./services/EmailService";
import {FormsModule} from "@angular/forms";
import {AutoFocusDirective} from "./autofocus.directive";

@NgModule({
    providers: [EmailService],
    bootstrap: [AppComponent],
    declarations: [AppComponent, EmailEditorComponent, AutoFocusDirective],
    imports: [BrowserModule, FormsModule]
})
export class AppModule
{
}
