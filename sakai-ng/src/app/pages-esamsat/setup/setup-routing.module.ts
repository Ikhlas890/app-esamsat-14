import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'daftar-bendahara', loadChildren: () => import('./daftar-bendahara/daftar-bendahara.module').then(m => m.DaftarbendaharaModule) },
        { path: 'daftar-entitas', loadChildren: () => import('./daftar-entitas/daftar-entitas.module').then(m => m.DaftarentitasModule) },
        { path: 'daftar-pegawai', loadChildren: () => import('./daftar-pegawai/daftar-pegawai.module').then(m => m.DaftarPegawaiModule) },
        { path: 'kode-rekening', loadChildren: () => import('./kode-rekening/kode-rekening.module').then(m => m.KodeRekeningModule) },
    ])],
    exports: [RouterModule]
})
export class SetupRoutingModule { }
