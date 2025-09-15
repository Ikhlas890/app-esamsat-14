import { Component, OnInit, ViewChild } from '@angular/core';
import { Masterbendahara, MasterbendaharaService } from 'src/app/services-api/masterbendahara.service';
import { Masterpegawai, MasterpegawaiService } from 'src/app/services-api/masterpegawai.service';
import { MasterreknrcService, Masterreknrc } from 'src/app/services-api/masterreknrc.service';
import { MasteruptService, Masterupt } from 'src/app/services-api/masterupt.service';
import { MasterbankService, Masterbank } from 'src/app/services-api/masterbank.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
    selector: 'app-daftar-bendahara',
    templateUrl: './daftar-bendahara.component.html',
    styleUrls: ['./daftar-bendahara.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class DaftarbendaharaComponent implements OnInit {
    // Daftar bendahara (masterbendahara)
    masterbendaharaList: Masterbendahara[] = [];

    // Untuk multi-select di tabel
    selectedMasterbendaharas: Masterbendahara[] = [];

    // untuk satu record aktif (object tunggal, di form/dialog).
    selectedMasterbendahara: Masterbendahara = this.getEmptyMasterbendahara();

    masterbendaharaDialog = false;
    masterbendaharaEdit = false;

    masterpegawaiOptions: { label: string; value: number | null }[] = [];
    masterpegawaiList: Masterpegawai[] = []; // menyimpan semua data pegawai

    masterbankOptions: { label: string; value: number | null }[] = [];

    filteredReknrc: { label: string; value: number }[] = [];

    masteruptOptions: { label: string; value: number | null }[] = [];


    loadingDaftar = false;

    constructor(
        private masterbendaharaService: MasterbendaharaService,
        private masterpegawaiService: MasterpegawaiService,
        private masterreknrcService: MasterreknrcService,
        private masterbankService: MasterbankService,
        private masteruptService: MasteruptService,
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
        const dataToExport = this.dt?.filteredValue || this.masterbendaharaList;

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'daftar_bendahara');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(data, `${fileName}.xlsx`);
    }
    // End export data (Excel)

    ngOnInit(): void {
        this.loadDaftar();
        this.loadMasterPegawai();
        this.loadMasterBank();
        this.loadMasterUpt();
    }

    // ==== Daftar Entitas CRUD ====
    getEmptyMasterbendahara(): Masterbendahara {
        return {
            idpegawai: 0,
            idupt: 0,
            idbank: 0,
            norek: '',
            namarek: '',
            jnsbend: '1',
            status: '1',
            jabatan: '',
            pangkat: '',
            uid: '',
            koordinator: 0,
            idreknrc: 0,
            telepon: '',
            ket: '',
            createby: ''
        } as Masterbendahara;;
    }

    jenisBendaharaOptions = [
        { label: 'Bendahara Penerimaan', value: '1' }
    ];

    statusOptions = [
        { label: 'Aktif', value: '1' },
        { label: 'Tidak Aktif', value: '0' }
    ];

    // Ambil data jenis jabatan dari value jenisJabatanOptions
    getJenisBendaharaLabel(value: string): string {
        const found = this.jenisBendaharaOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    getKoordinatorLabel(value: number): string {
        const found = this.masteruptOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    getStatusLabel(value: string): string {
        const found = this.statusOptions.find(opt => opt.value === value);
        return found ? found.label : '-';
    }

    loadDaftar(): void {
        this.loadingDaftar = true;
        this.masterbendaharaService.getAll().subscribe({
            next: (data) => {
                this.masterbendaharaList = data;
                this.loadingDaftar = false;
            },
            error: (err) => {
                console.error('Gagal memuat daftar', err);
                this.loadingDaftar = false;
            }
        });
    }

    loadMasterPegawai(): void {
        this.masterpegawaiService.getAll().subscribe((data: Masterpegawai[]) => {
            this.masterpegawaiList = data;

            this.masterpegawaiOptions = [
                ...data.map(pegawai => ({
                    label: pegawai.nama,
                    value: pegawai.idpegawai
                }))
            ];
        });
    }

    loadMasterBank(): void {
        this.masterbankService.getAll().subscribe((data: Masterbank[]) => {
            this.masterbankOptions = [
                ...data.map(bank => ({
                    label: bank.namabank,
                    value: bank.idbank
                }))
            ];
        });
    }

    loadMasterUpt(): void {
        this.masteruptService.getAll().subscribe((data: Masterupt[]) => {
            this.masteruptOptions = [
                ...data.map(upt => ({
                    label: upt.nmupt,
                    value: upt.idupt
                }))
            ];
        });
    }

    searchReknrc(event: any) {
        const query = event.query;
        this.masterreknrcService.getForSelect(query).subscribe(data => {
            this.filteredReknrc = data.map(r => ({
                label: `${r.kdrek} - ${r.nmrek}`,
                value: r.idreknrc
            }));
        });
    }
    onPegawaiChange(event: any) {
        const selectedId = event.value; // idpegawai yang dipilih
        const pegawai = this.masterpegawaiList.find(p => p.idpegawai === selectedId);

        if (pegawai) {
            this.selectedMasterbendahara.jabatan = pegawai.jabatan;
            this.selectedMasterbendahara.pangkat = pegawai.pangkat;
        } else {
            this.selectedMasterbendahara.jabatan = undefined;
            this.selectedMasterbendahara.pangkat = undefined;
        }
    }

    openNewDaftar(): void {
        this.selectedMasterbendahara = this.getEmptyMasterbendahara();
        this.masterbendaharaDialog = true;
        this.masterbendaharaEdit = false;
    }

    private getIdReknrcValue(idreknrc: number | { label: string; value: number } | null | undefined): number {
        if (idreknrc && typeof idreknrc === 'object') {
            return idreknrc.value;
        }
        return idreknrc ?? 0;
    }

    editDaftar(item: Masterbendahara): void {
        this.selectedMasterbendahara = { ...item };

        // ✅ kalau backend kasih idreknrc = number, ubah ke {label, value}
        if (item.idreknrc) {
            this.masterreknrcService.getById(this.getIdReknrcValue(item.idreknrc)).subscribe((rek) => {
                this.selectedMasterbendahara.idreknrc = {
                    label: `${rek.kdrek} - ${rek.nmrek}`,
                    value: rek.idreknrc
                };
            });
        }

        this.masterbendaharaDialog = true;
        this.masterbendaharaEdit = true;
    }


    saveDaftar(): void {
        const payload: any = {
            idpegawai: this.selectedMasterbendahara.idpegawai ?? 0,
            idbank: this.selectedMasterbendahara.idbank ?? 0,
            norek: this.selectedMasterbendahara.norek || '',
            namarek: this.selectedMasterbendahara.namarek || '',
            jnsbend: this.selectedMasterbendahara.jnsbend?.trim() || '1',
            status: this.selectedMasterbendahara.status || '1',
            jabatan: this.selectedMasterbendahara.jabatan || '',
            pangkat: this.selectedMasterbendahara.pangkat || '',
            uid: this.selectedMasterbendahara.uid || '',
            koordinator: this.selectedMasterbendahara.koordinator ?? 0,
            // ✅ ambil hanya value, bukan object
            idreknrc: (this.selectedMasterbendahara.idreknrc as any)?.value
                ?? this.selectedMasterbendahara.idreknrc
                ?? 0,
            telepon: this.selectedMasterbendahara.telepon || '',
            ket: this.selectedMasterbendahara.ket || '',
            createby: 'admin', // seharusnya ambil dari auth
            createdate: new Date().toISOString() // ✅ sesuai format swagger
        };

        console.log('Payload final:', payload);

        if (this.masterbendaharaEdit) {
            payload.updateby = 'admin';
            this.masterbendaharaService.update(this.selectedMasterbendahara.idbend!, payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterbendaharaDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data berhasil diperbarui' });
                },
                error: (err) => {
                    console.error('Gagal update data', err);
                    this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Terjadi kesalahan saat memperbarui data' });
                }
            });
        } else {
            this.masterbendaharaService.create(payload).subscribe({
                next: () => {
                    this.loadDaftar();
                    this.masterbendaharaDialog = false;
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
        if (!this.selectedMasterbendaharas || this.selectedMasterbendaharas.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Peringatan', detail: 'Pilih data yang ingin dihapus' });
            return;
        }

        this.confirmationService.confirm({
            message: `Yakin ingin menghapus ${this.selectedMasterbendaharas.length} data ini?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedMasterbendaharas.map(u => u.idbend);
                // panggil API delete untuk tiap id
                ids.forEach(id => {
                    this.masterbendaharaService.delete(id).subscribe({
                        next: () => {
                            this.masterbendaharaList = this.masterbendaharaList.filter(u => u.idbend !== id);
                        },
                        error: () => {
                            this.messageService.add({ severity: 'error', summary: 'Gagal', detail: `Gagal hapus data ID ${id}` });
                        }
                    });
                });

                this.selectedMasterbendaharas = []; // kosongkan selection
                this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Data terhapus' });
            }
        });
    }

    confirmDeleteDaftar(item: Masterbendahara): void {
        this.confirmationService.confirm({
            message: `Yakin ingin menghapus daftar bendahara <b>${item.namarek}</b>?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.masterbendaharaService.delete(item.idbend!).subscribe({
                    next: () => {
                        this.masterbendaharaList = this.masterbendaharaList.filter(p => p.idbend !== item.idbend);
                        this.messageService.add({ severity: 'success', summary: 'Berhasil', detail: 'Daftar bendahara telah dihapus' });
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal menghapus daftar bendahara' });
                    }
                });
            }
        });
    }
}