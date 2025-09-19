import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DaftarpenandatanganandokumenComponent } from './daftar-penandatangan-dokumen.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DaftarpenandatanganandokumenComponent }
    ])],
    exports: [RouterModule]
})
export class DaftarpenandatanganandokumenRoutingModule { }
