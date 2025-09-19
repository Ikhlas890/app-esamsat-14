import { Component, OnInit, ViewChild } from "@angular/core";
import { Masterhapusdenda, MasterhapusdendaService } from "src/app/services-api/masterhapusdenda.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { Table } from "primeng/table";
import { formatDate } from "@angular/common";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-program-keringanan-denda',
    templateUrl: './program-keringanan-denda.component.html',
    styleUrls: ['./program-keringanan-denda.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ProgramkeringanandendaComponent implements OnInit {
    // Hapus Denda (masterhapusdenda)
    masterhapusdendaList: Masterhapusdenda[] = [];

    // Untuk multi-select di tabel
    selectedMasterhapusdendas: Masterhapusdenda[] = [];

    // untuk satu record aktif (object tunggal, di form/dialog).
    selectedMasterhapusdenda: Masterhapusdenda = this.getEmptyMasterhapusdenda();

    masterhapusdendaDialog = false;
    masterhapusdendaEdit = false;

    loadingDaftar = false;

    constructor(
        private masterhapusdendaService: MasterhapusdendaService,
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
        const dataToExport = this.dt?.filteredValue || this.masterhapusdendaList;

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'program_keringanan_denda');
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
    getEmptyMasterhapusdenda(): Masterhapusdenda {
        return {
            jenis: '',
            uraian: '',
            awal: '',
            akhir: '',
            nilai: null,
            satuan: '',
            ket: '',
            status: '',
            createby: '',
        } as Masterhapusdenda; // jangan set id (primary) di sini!
    }

    statusOptions = [
        { label: 'Aktif', value: '1' },
        { label: 'Tidak Aktif', value: '0' }
    ];

    jenisOptions = [
        { label: 'Hapus Denda Pajak', value: '1' },
        { label: 'Bayar Pokok 3 Tahun', value: '2' }
    ];

    satuanOptions = [
        { label: '%', value: '%' }
    ];

    getStatusLabel(value: string): string {
        const found = this.statusOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    getJenisLabel(value: string): string {
        const found = this.jenisOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    getSatuanLabel(value: string): string {
        const found = this.satuanOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    loadDaftar(): void {
        this.loadingDaftar = true;
        this.masterhapusdendaService.getAll().subscribe({
            next: (data) => {
                this.masterhapusdendaList = data;
                this.loadingDaftar = false;
            },
            error: (err) => {
                console.error('Gagal memuat daftar', err);
                this.loadingDaftar = false;
            }
        });
    }

    openNewDaftar(): void {
        this.selectedMasterhapusdenda = this.getEmptyMasterhapusdenda();
        this.masterhapusdendaDialog = true;
        this.masterhapusdendaEdit = false;
    }

    editDaftar(item: Masterhapusdenda): void {
        this.selectedMasterhapusdenda = {
            ...item,
            awal: item.awal ? new Date(item.awal) : null,
            akhir: item.akhir ? new Date(item.akhir) : null
        };
        this.masterhapusdendaDialog = true;
        this.masterhapusdendaEdit = true;
    }

    saveDaftar(): void {
        const payload: any = {
            // ✅ ambil hanya value, bukan object
            jenis: (this.selectedMasterhapusdenda.jenis as any)?.value
                ?? this.selectedMasterhapusdenda.jenis
                ?? 0,
            uraian: this.selectedMasterhapusdenda.uraian || '',
            awal: this.selectedMasterhapusdenda.awal
                ? formatDate(this.selectedMasterhapusdenda.awal, 'yyyy-MM-dd', 'en-US')
                : '',
            akhir: this.selectedMasterhapusdenda.akhir
                ? formatDate(this.selectedMasterhapusdenda.akhir, 'yyyy-MM-dd', 'en-US')
                : '',
            nilai: this.selectedMasterhapusdenda.nilai || null,
            satuan: this.selectedMasterhapusdenda.satuan || '',
            ket: this.selectedMasterhapusdenda.ket || '',
            status: this.selectedMasterhapusdenda.status || '',
        };

        if (this.masterhapusdendaEdit) {
            // update
            payload.updateby = 'admin'; // user login seharusnya diambil dari auth
            this.masterhapusdendaService.update(this.selectedMasterhapusdenda.idhapusdenda!, payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterhapusdendaDialog = false;
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
            this.masterhapusdendaService.create(payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterhapusdendaDialog = false;
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
        if (!this.selectedMasterhapusdendas || this.selectedMasterhapusdendas.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih data yang ingin dihapus' });
            return;
        }

        this.confirmationService.confirm({
            message: `Yakin ingin menghapus ${this.selectedMasterhapusdendas.length} data ini?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedMasterhapusdendas.map(u => u.idhapusdenda);
                // panggil API delete untuk tiap id
                ids.forEach(id => {
                    this.masterhapusdendaService.delete(id).subscribe({
                        next: () => {
                            this.masterhapusdendaList = this.masterhapusdendaList.filter(u => u.idhapusdenda !== id);
                        },
                        error: () => {
                            this.messageService.add({ severity: 'error', summary: 'Gagal', detail: `Gagal hapus data ID ${id}` });
                        }
                    });
                });

                this.selectedMasterhapusdendas = []; // kosongkan selection
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data terhapus' });
            }
        });
    }

    confirmDeleteDaftar(item: Masterhapusdenda): void {
        this.confirmationService.confirm({
            message: `Yakin ingin menghapus program keringan (denda) <b>${item.uraian}</b>?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.masterhapusdendaService.delete(item.idhapusdenda).subscribe({
                    next: () => {
                        this.masterhapusdendaList = this.masterhapusdendaList.filter(p => p.idhapusdenda !== item.idhapusdenda);
                        this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Program keringan (denda) telah dihapus' });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus program keringan (denda)' });
                    }
                });
            }
        });
    }
}