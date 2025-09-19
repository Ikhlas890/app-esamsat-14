import { Component, OnInit, ViewChild } from "@angular/core";
import { Masterjabttd, MasterjabttdService } from "src/app/services-api/masterjabttd.service";
import { Jnsdok, JnsdokService } from "src/app/services-api/jnsdok.service";
import { Masterpegawai, MasterpegawaiService } from "src/app/services-api/masterpegawai.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { Table } from "primeng/table";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-daftar-penandatangan-dokumen',
    templateUrl: './daftar-penandatangan-dokumen.component.html',
    styleUrls: ['./daftar-penandatangan-dokumen.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class DaftarpenandatanganandokumenComponent implements OnInit {
    // Daftar Penandatangan Dokumen (masterjabttd)
    masterjabttdList: Masterjabttd[] = [];

    // Untuk multi-select di tabel
    selectedMasterjabttds: Masterjabttd[] = [];

    // untuk satu record aktif (object tunggal, di form/dialog).
    selectedMasterjabttd: Masterjabttd = this.getEmptyMasterjabttd();

    masterjabttdDialog = false;
    masterjabttdEdit = false;

    jnsdokOptions: { label: string; value: string | null }[] = [];
    masterpegawaiOptions: { label: string; value: number | null }[] = [];

    loadingDaftar = false;

    constructor(
        private masterjabttdService: MasterjabttdService,
        private jnsdokService: JnsdokService,
        private masterpegawaiService: MasterpegawaiService,
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
        const dataToExport = this.dt?.filteredValue || this.masterjabttdList;

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'daftar_penandatanganan_dokumen');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(data, `${fileName}.xlsx`);
    }
    // End export data (Excel)

    ngOnInit(): void {
        this.loadDaftar();
        this.loadJnsdok();
        this.loadMasterPegawai();
    }

    // ==== Daftar Entitas CRUD ====
    getEmptyMasterjabttd(): Masterjabttd {
        return {
            idpegawai: null,
            kddok: '',
            jabatan: '',
            ket: '',
            status: '',
            createby: ''
        } as Masterjabttd; // jangan set id (primary) di sini!
    }

    filterByData(selectedJenis: string | null) {
    if (selectedJenis) {
      this.dt.filter(selectedJenis, 'kddok', 'equals');
    } else {
      this.dt.filter('', 'kddok', 'equals'); // Reset filter jenis pajak
    }
  }

    statusOptions = [
        { label: 'Aktif', value: '1' },
        { label: 'Tidak Aktif', value: '2' }
    ];

    jabatanOptions = [
        { label: 'Kepala UPT', value: '1' }
    ];

    getStatusLabel(value: string): string {
        const found = this.statusOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    getJnsDokLabel(value: string): string {
        const found = this.jnsdokOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    getMasterPegawaiLabel(value: number): string {
        const found = this.masterpegawaiOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    loadDaftar(): void {
        this.loadingDaftar = true;
        this.masterjabttdService.getAll().subscribe({
            next: (data) => {
                this.masterjabttdList = data;
                this.loadingDaftar = false;
            },
            error: (err) => {
                console.error('Gagal memuat daftar', err);
                this.loadingDaftar = false;
            }
        });
    }

    loadJnsdok(): void {
        this.jnsdokService.getAll().subscribe((data: Jnsdok[]) => {
            this.jnsdokOptions = [
                { label: '--- Pilih Dokumen ---', value: null },
                ...data.map(dok => ({
                    label: dok.namadok,
                    value: dok.kddok
                }))
            ];
        });
    }

    loadMasterPegawai(): void {
        this.masterpegawaiService.getAll().subscribe((data: Masterpegawai[]) => {
            this.masterpegawaiOptions = [
                ...data.map(pegawai => ({
                    label: pegawai.nama,
                    value: pegawai.idpegawai
                }))
            ];
        });
    }

    openNewDaftar(): void {
        this.selectedMasterjabttd = this.getEmptyMasterjabttd();
        this.masterjabttdDialog = true;
        this.masterjabttdEdit = false;
    }

    editDaftar(item: Masterjabttd): void {
        this.selectedMasterjabttd = { ...item };
        this.masterjabttdDialog = true;
        this.masterjabttdEdit = true;
    }

    saveDaftar(): void {
        const payload: any = {
            idpegawai: this.selectedMasterjabttd.idpegawai || null,
            kddok: this.selectedMasterjabttd.kddok || '',
            jabatan: this.selectedMasterjabttd.jabatan || '',
            ket: this.selectedMasterjabttd.ket || '',
            status: this.selectedMasterjabttd.status || '',
            createdate: new Date().toISOString() // ✅ sesuai format swagger

        };

        if (this.masterjabttdEdit) {
            // update
            payload.updateby = 'admin'; // user login seharusnya diambil dari auth
            this.masterjabttdService.update(this.selectedMasterjabttd.idjabttd!, payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterjabttdDialog = false;
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
            this.masterjabttdService.create(payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterjabttdDialog = false;
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
        if (!this.selectedMasterjabttds || this.selectedMasterjabttds.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih data yang ingin dihapus' });
            return;
        }

        this.confirmationService.confirm({
            message: `Yakin ingin menghapus ${this.selectedMasterjabttds.length} data ini?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedMasterjabttds.map(u => u.idjabttd);
                // panggil API delete untuk tiap id
                ids.forEach(id => {
                    this.masterjabttdService.delete(id).subscribe({
                        next: () => {
                            this.masterjabttdList = this.masterjabttdList.filter(u => u.idjabttd !== id);
                        },
                        error: () => {
                            this.messageService.add({ severity: 'error', summary: 'Gagal', detail: `Gagal hapus data ID ${id}` });
                        }
                    });
                });

                this.selectedMasterjabttds = []; // kosongkan selection
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data terhapus' });
            }
        });
    }

    confirmDeleteDaftar(item: Masterjabttd): void {
        this.confirmationService.confirm({
            message: `Yakin ingin menghapus daftar penandatangan dokumen <b>${item.kddok}</b>?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.masterjabttdService.delete(item.idjabttd).subscribe({
                    next: () => {
                        this.masterjabttdList = this.masterjabttdList.filter(p => p.idjabttd !== item.idjabttd);
                        this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Daftar penandatanganan dokumen telah dihapus' });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus daftar penandatanganan dokumen' });
                    }
                });
            }
        });
    }
}