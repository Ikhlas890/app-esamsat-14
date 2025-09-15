import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DaftarPegawaiComponent } from './daftar-pegawai.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DaftarPegawaiComponent }
    ])],
    exports: [RouterModule]
})
export class DaftarPegawaiRoutingModule { }
