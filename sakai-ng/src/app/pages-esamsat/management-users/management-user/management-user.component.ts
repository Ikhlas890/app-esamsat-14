import { Component, OnInit } from '@angular/core';
import { AuthService, UserResponse } from 'src/app/services-api/auth.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ManagementuserComponent implements OnInit {
  users: UserResponse[] = [];
  loading = false;
  editDialogVisible = false;
  selectedUser: UserResponse = {} as UserResponse;

  dropdownItems = [
    { label: 'Admin', value: 'admin' },
    { label: 'Operator', value: 'operator' }
  ];

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Tidak dapat memuat data user' });
      }
    });
  }

  confirmDelete(user: UserResponse) {
    this.confirmationService.confirm({
      message: `Yakin ingin menghapus user <b>${user.userid}</b>?`,
      header: 'Konfirmasi Hapus',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteUser(user.userid)
    });
  }

  deleteUser(userid: string) {
    this.authService.deleteUser(userid).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'User telah dihapus' });
        this.loadUsers();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus user' });
      }
    });
  }

  openEditDialog(user: UserResponse) {
    this.selectedUser = { ...user }; // clone agar tidak langsung mengubah data tabel
    this.editDialogVisible = true;
  }

  saveUser() {
    if (this.selectedUser) {
      const payload: any = {
        nama: this.selectedUser.nama,
        email: this.selectedUser.email,
        kdgroup: this.selectedUser.kdgroup
      };

      if (this.selectedUser.password?.trim()) {
        payload.password = this.selectedUser.password;
      }

      this.authService.updateUser(this.selectedUser.userid, payload).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'User berhasil diperbarui' });
          this.loadUsers();
          this.editDialogVisible = false;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal memperbarui user' });
        }
      });
    }
  }
}
