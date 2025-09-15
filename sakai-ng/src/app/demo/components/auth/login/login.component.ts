import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services-api/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    userid: string = '';
    password: string = '';
    loading: boolean = false;

    checked: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService) { }

    login() {
        this.loading = true;
        this.authService.login({ userid: this.userid, password: this.password }).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: res.message });
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Gagal', detail: err.error?.message || 'Login gagal' });
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}
