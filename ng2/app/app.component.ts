import {Component} from "@angular/core";
import {EmailService} from "./services/EmailService";

@Component({
    selector: "my-app",
    styleUrls: ["app/app.component.css"],
    templateUrl: "app/app.component.html"
})
export class AppComponent
{
    public emails: string[] = ["sidorov@mail.ru"];
    
    constructor(private emailService: EmailService) {}
    
    public addEmails()
    {
        let randomEmail: string = this.emailService.generateRandomEmail();
        this.emails.push(randomEmail);
    };
    
    public getEmailsCount()
    {
        window.alert(this.emails.length);
    }
    
    public handleEmailsUpdate()
    {
        console.log(this.emails);
    }
}
