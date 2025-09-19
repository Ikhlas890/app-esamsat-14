import { Component, OnInit, ViewChild } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { Masterlibur, MasterliburService } from "src/app/services-api/masterlibur.service";
import { Masterkabkotum, MasterkabkotumService } from "src/app/services-api/masterkabkotum.service";
import { formatDate } from "@angular/common";
import { Table } from "primeng/table";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-daftar-hari-libur',
    templateUrl: './daftar-hari-libur.component.html',
    styleUrls: ['./daftar-hari-libur.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class DaftarhariliburComponent implements OnInit {
    // Daftar libur (masterlibur)
    masterliburList: Masterlibur[] = [];

    // Untuk multi-select di tabel
    selectedMasterliburs: Masterlibur[] = [];

    // untuk satu record aktif (object tunggal, di form/dialog).
    selectedMasterlibur: Masterlibur = this.getEmptyMasterlibur();

    masterliburDialog = false;
    masterliburEdit = false;

    masterkabkotumOptions: { label: string; value: number | null }[] = [];

    loadingDaftar = false;

    constructor(
        private masterliburService: MasterliburService,
        private masterkabkotumService: MasterkabkotumService,
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
        const dataToExport = this.dt?.filteredValue || this.masterliburList;

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'daftar_libur');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(data, `${fileName}.xlsx`);
    }
    // End export data (Excel)

    ngOnInit(): void {
        this.loadDaftar();
        this.loadMasterKabKotum();
    }

    // ==== Daftar Entitas CRUD ====
    getEmptyMasterlibur(): Masterlibur {
        return {
            idkabkota: null,
            level: '',
            tanggal: '',
            namalibur: '',
            ket: '',
            createby: ''
        } as Masterlibur; // jangan set id (primary) di sini!
    }

    levelOptions = [
        { label: 'Libur nasional', value: '1' },
        { label: 'Libur provinsi', value: '2' },
        { label: 'Libur kabupaten/kota', value: '3' }
    ];

    getLevelLabel(value: string): string {
        const found = this.levelOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    getKabKotumLabel(value: number): string {
        const found = this.masterkabkotumOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    loadDaftar(): void {
        this.loadingDaftar = true;
        this.masterliburService.getAll().subscribe({
            next: (data) => {
                this.masterliburList = data;
                this.loadingDaftar = false;
            },
            error: (err) => {
                console.error('Gagal memuat daftar', err);
                this.loadingDaftar = false;
            }
        });
    }

    loadMasterKabKotum(): void {
        this.masterkabkotumService.getAll().subscribe((data: Masterkabkotum[]) => {
            this.masterkabkotumOptions = [
                { label: '--- Pilih Kabupaten/Kota ---', value: null },
                ...data.map(upt => ({
                    label: upt.nmkabkota,
                    value: upt.idkabkota
                }))
            ];
        });
    }

    openNewDaftar(): void {
        this.selectedMasterlibur = this.getEmptyMasterlibur();
        this.masterliburDialog = true;
        this.masterliburEdit = false;
    }

    editDaftar(item: Masterlibur): void {
        this.selectedMasterlibur = {
            ...item,
            tanggal: item.tanggal ? new Date(item.tanggal) : null
        };
        this.masterliburDialog = true;
        this.masterliburEdit = true;
    }

    saveDaftar(): void {
        const payload: any = {
            idkabkota: this.selectedMasterlibur.idkabkota ?? null,
            // ✅ ambil hanya value, bukan object
            level: (this.selectedMasterlibur.level as any)?.value
                ?? this.selectedMasterlibur.level
                ?? null,
            tanggal: this.selectedMasterlibur.tanggal
                ? formatDate(this.selectedMasterlibur.tanggal, 'yyyy-MM-dd', 'en-US')
                : '',
            namalibur: this.selectedMasterlibur.namalibur || '',
            ket: this.selectedMasterlibur.ket || '',
            createdate: new Date().toISOString() // ✅ sesuai format swagger
        };

        if (this.masterliburEdit) {
            // update
            payload.updateby = 'admin'; // user login seharusnya diambil dari auth
            this.masterliburService.update(this.selectedMasterlibur.idlibur!, payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterliburDialog = false;
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
            this.masterliburService.create(payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterliburDialog = false;
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
        if (!this.selectedMasterliburs || this.selectedMasterliburs.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih data yang ingin dihapus' });
            return;
        }

        this.confirmationService.confirm({
            message: `Yakin ingin menghapus ${this.selectedMasterliburs.length} data ini?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedMasterliburs.map(u => u.idlibur);
                // panggil API delete untuk tiap id
                ids.forEach(id => {
                    this.masterliburService.delete(id).subscribe({
                        next: () => {
                            this.masterliburList = this.masterliburList.filter(u => u.idlibur !== id);
                        },
                        error: () => {
                            this.messageService.add({ severity: 'error', summary: 'Gagal', detail: `Gagal hapus data ID ${id}` });
                        }
                    });
                });

                this.selectedMasterliburs = []; // kosongkan selection
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data terhapus' });
            }
        });
    }

    confirmDeleteDaftar(item: Masterlibur): void {
        this.confirmationService.confirm({
            message: `Yakin ingin menghapus daftar hari libur <b>${item.namalibur}</b>?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.masterliburService.delete(item.idlibur).subscribe({
                    next: () => {
                        this.masterliburList = this.masterliburList.filter(p => p.idlibur !== item.idlibur);
                        this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Daftar hari libur telah dihapus' });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus daftar hari libur' });
                    }
                });
            }
        });
    }
}