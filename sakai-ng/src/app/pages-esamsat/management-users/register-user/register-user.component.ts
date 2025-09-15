import { Component } from '@angular/core';
import { AuthService } from 'src/app/services-api/auth.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html',
    styleUrls: ['./register-user.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class RegisteruserComponent {
    userid: string = '';
    nama: string = '';
    email: string = '';
    password: string = '';
    loading: boolean = false;

    dropdownItems = [
        { label: 'Admin', value: 'admin' },
        { label: 'Operator', value: 'operator' }
    ];

    kdgroup: string = '';

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

    register() {
        this.loading = true;
        this.authService.register({ userid: this.userid, nama: this.nama, email: this.email, password: this.password, kdgroup: this.kdgroup }).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: res.message });
                this.router.navigate(['/management-users/management-pengguna']);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Gagal', detail: err.error?.message || 'Registrasi gagal' });
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}