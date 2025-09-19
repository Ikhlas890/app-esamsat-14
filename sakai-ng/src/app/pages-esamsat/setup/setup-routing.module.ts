import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'daftar-bendahara', loadChildren: () => import('./daftar-bendahara/daftar-bendahara.module').then(m => m.DaftarbendaharaModule) },
        { path: 'daftar-entitas', loadChildren: () => import('./daftar-entitas/daftar-entitas.module').then(m => m.DaftarentitasModule) },
        { path: 'daftar-pegawai', loadChildren: () => import('./daftar-pegawai/daftar-pegawai.module').then(m => m.DaftarPegawaiModule) },
        { path: 'kode-rekening', loadChildren: () => import('./kode-rekening/kode-rekening.module').then(m => m.KodeRekeningModule) },
        { path: 'daftar-hari-libur', loadChildren: () => import('./daftar-hari-libur/daftar-hari-libur.module').then(m => m.DaftarhariliburModule) },
        { path: 'daftar-penandatangan-dokumen', loadChildren: () => import('./daftar-penandatanganan-dokumen/daftar-penandatangan-dokumen.module').then(m => m.DaftarpenandatanganandokumenModule) },
        { path: 'program-keringanan-denda', loadChildren: () => import('./program-keringanan-denda/program-keringanan-denda.module').then(m => m.ProgramkeringanandendaModule) },
        { path: 'batas-tanggal-layanan', loadChildren: () => import('./batas-tanggal-layanan/batas-tanggal-layanan.module').then(m => m.BatastanggallayananModule) },
    ])],
    exports: [RouterModule]
})
export class SetupRoutingModule { }
