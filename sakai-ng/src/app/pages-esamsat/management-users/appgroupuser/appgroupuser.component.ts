import { Component, OnInit } from '@angular/core';
import { AppGroupUser, AppgroupuserService } from 'src/app/services-api/appgroupuser.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-appgroupuser',
  templateUrl: './appgroupuser.component.html',
  styleUrls: ['./appgroupuser.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AppgroupuserComponent implements OnInit {
  groupList: AppGroupUser[] = [];
  selectedGroup: AppGroupUser = this.createEmptyGroup();

  dropdownItems = [
    { label: 'Admin', value: 'admin' },
    { label: 'Operator', value: 'operator' }
  ];

  loading = false;
  groupDialog = false;
  isEdit = false;

  constructor(
    private groupService: AppgroupuserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadGroups();
  }

  private createEmptyGroup(): AppGroupUser {
    return { kdgroup: '', nmgroup: '', ket: '' };
  }

  loadGroups(): void {
    this.loading = true;
    this.groupService.getAll().subscribe({
      next: (data) => {
        this.groupList = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Gagal',
          detail: 'Tidak dapat memuat data kelompok user'
        });
      }
    });
  }

  openNew(): void {
    this.selectedGroup = this.createEmptyGroup();
    this.isEdit = false;
    this.groupDialog = true;
  }

  editGroup(group: AppGroupUser): void {
    this.selectedGroup = { ...group };
    this.isEdit = true;
    this.groupDialog = true;
  }

  deleteGroup(group: AppGroupUser): void {
    this.confirmationService.confirm({
      message: `Yakin ingin menghapus kelompok <b>${group.nmgroup}</b>?`,
      header: 'Konfirmasi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupService.delete(group.kdgroup).subscribe({
          next: () => {
            this.groupList = this.groupList.filter(g => g.kdgroup !== group.kdgroup);
            this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Kelompok dihapus' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus kelompok' });
          }
        });
      }
    });
  }

  isFormValid(): boolean {
    return Boolean(this.selectedGroup.nmgroup?.trim()) &&
      (this.isEdit || Boolean(this.selectedGroup.kdgroup?.trim()));
  }

  saveGroup(): void {
    if (!this.isFormValid()) return;

    const sanitize = (text: string) =>
      text
        ?.replace(/\u00A0/g, ' ')  // ubah non-breaking space jadi spasi biasa
        .replace(/[\u200B-\u200D\uFEFF]/g, '') // hapus zero-width chars
        .trim();

    const payload: AppGroupUser = {
      kdgroup: this.selectedGroup.kdgroup ?? '',
      nmgroup: this.selectedGroup.nmgroup ?? '',
      ket: sanitize(this.selectedGroup.ket ?? '')
    };

    const request$ = this.isEdit
      ? this.groupService.update(payload.kdgroup!, payload)
      : this.groupService.create(payload);

    request$.subscribe({
      next: () => {
        this.loadGroups();
        this.messageService.add({
          severity: 'success',
          summary: 'Berhasil',
          detail: this.isEdit ? 'Kelompok diperbarui' : 'Kelompok ditambahkan'
        });
        this.groupDialog = false;
      },
      error: (err) => {
        console.error('API Error:', err); // Untuk debug detail error dari backend
        this.messageService.add({
          severity: 'error',
          summary: 'Gagal',
          detail: this.isEdit ? 'Gagal memperbarui kelompok' : 'Gagal menambahkan kelompok'
        });
      }
    });
  }


  hideDialog(): void {
    this.groupDialog = false;
    this.selectedGroup = this.createEmptyGroup();
  }
}
