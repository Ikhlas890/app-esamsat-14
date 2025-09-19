import { Component, OnInit, ViewChild } from "@angular/core";
import { Masterflow, MasterflowService } from "src/app/services-api/masterflow.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { Table } from "primeng/table";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-batas-tanggal-layanan',
    templateUrl: './batas-tanggal-layanan.component.html',
    styleUrls: ['./batas-tanggal-layanan.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class BatastanggallayananComponent implements OnInit {
    // Batas Tanggal Layanan (masterflow)
    masterflowList: Masterflow[] = [];

    // Untuk multi-select di tabel
    selectedMasterflows: Masterflow[] = [];

    // untuk satu record aktif (object tunggal, di form/dialog).
    selectedMasterflow: Masterflow = this.getEmptyMasterflow();

    masterflowDialog = false;
    masterflowEdit = false;

    loadingDaftar = false;

    constructor(
        private masterflowService: MasterflowService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    // Export data (Excel)
    @ViewChild('dt') dt!: Table;

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    exportExcel() {
        // pilih data yg difilter, kalau tidak ada ambil semua
        const dataToExport = this.dt?.filteredValue || this.masterflowList;

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'batas_tanggal_layanan');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(data, `${fileName}.xlsx`);
    }
    // End export data (Excel)

    ngOnInit(): void {
        this.loadDaftar();
    }

    // ==== Daftar Entitas CRUD ====
    getEmptyMasterflow(): Masterflow {
        return {
            kdflow: '',
            nmflow: '',
            pkb: '',
            bbn1: '',
            bbn2: '',
            swd: '',
            atbKen: '',
            flowJr: '',
            stnkbaru: '',
            tnkb: '',
            sahstnk: '',
            perpanjangstnk: '',
            potongan: '',
            bataslayanan: null,
            satuan: '',
            status: '',
            createby: ''
        } as Masterflow; // jangan set id (primary) di sini!
    }

    statusOptions = [
        { label: 'Aktif', value: '1' },
        { label: 'Tidak Aktif', value: '2' }
    ];

    getStatusLabel(value: string): string {
        const found = this.statusOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    loadDaftar(): void {
        this.loadingDaftar = true;
        this.masterflowService.getAll().subscribe({
            next: (data) => {
                this.masterflowList = data;
                this.loadingDaftar = false;
            },
            error: (err) => {
                console.error('Gagal memuat daftar', err);
                this.loadingDaftar = false;
            }
        });
    }

    openNewDaftar(): void {
        this.selectedMasterflow = this.getEmptyMasterflow();
        this.masterflowDialog = true;
        this.masterflowEdit = false;
    }

    editDaftar(item: Masterflow): void {
        this.selectedMasterflow = { ...item };
        this.masterflowDialog = true;
        this.masterflowEdit = true;
    }

    saveDaftar(): void {
        const payload: any = {
            kdflow: this.selectedMasterflow.kdflow || '',
            nmflow: this.selectedMasterflow.nmflow || '',
            pkb: this.selectedMasterflow.pkb || '',
            bbn1: this.selectedMasterflow.bbn1 || '',
            bbn2: this.selectedMasterflow.bbn2 || '',
            swd: this.selectedMasterflow.swd || '',
            atbKen: this.selectedMasterflow.atbKen || '',
            flowJr: this.selectedMasterflow.flowJr || '',
            stnkbaru: this.selectedMasterflow.stnkbaru || '',
            tnkb: this.selectedMasterflow.tnkb || '',
            sahstnk: this.selectedMasterflow.sahstnk || '',
            perpanjangstnk: this.selectedMasterflow.perpanjangstnk || '',
            potongan: this.selectedMasterflow.potongan || '',
            bataslayanan: this.selectedMasterflow.bataslayanan || null,
            satuan: this.selectedMasterflow.satuan || '',
            status: (this.selectedMasterflow.status as any)?.value
                ?? this.selectedMasterflow.status
                ?? null,
            createdate: new Date().toISOString()
        };

                            console.log('daftar payload:', payload);

        if (this.masterflowEdit) {
            // update
            payload.updateby = 'admin'; // user login seharusnya diambil dari auth
            this.masterflowService.update(this.selectedMasterflow.kdflow!, payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterflowDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil diperbarui' });
                },
                error: (err) => {
                    console.error('Gagal update data', err);
                    this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Terjadi kesalahan saat memperbarui data' });
                }
            });
        } else {
            // create
            payload.createby = 'admin'; // user login seharusnya diambil dari auth
            this.masterflowService.create(payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterflowDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil ditambahkan' });
                },
                error: (err) => {
                    console.error('Gagal create data', err);
                    this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Terjadi kesalahan saat menambahkan data' });
                }
            });
        }
    }

    deleteSelectedDaftar(): void {
        if (!this.selectedMasterflows || this.selectedMasterflows.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih data yang ingin dihapus' });
            return;
        }

        this.confirmationService.confirm({
            message: `Yakin ingin menghapus ${this.selectedMasterflows.length} data ini?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedMasterflows.map(u => u.kdflow);
                // panggil API delete untuk tiap id
                ids.forEach(id => {
                    this.masterflowService.delete(id).subscribe({
                        next: () => {
                            this.masterflowList = this.masterflowList.filter(u => u.kdflow !== id);
                        },
                        error: () => {
                            this.messageService.add({ severity: 'error', summary: 'Gagal', detail: `Gagal hapus data ID ${id}` });
                        }
                    });
                });

                this.selectedMasterflows = []; // kosongkan selection
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data terhapus' });
            }
        });
    }

    confirmDeleteDaftar(item: Masterflow): void {
        this.confirmationService.confirm({
            message: `Yakin ingin menghapus batas tanggal layanan <b>${item.nmflow}</b>?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.masterflowService.delete(item.kdflow).subscribe({
                    next: () => {
                        this.masterflowList = this.masterflowList.filter(p => p.kdflow !== item.kdflow);
                        this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Batas tanggal layanan telah dihapus' });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus daftar pegawai' });
                    }
                });
            }
        });
    }
}