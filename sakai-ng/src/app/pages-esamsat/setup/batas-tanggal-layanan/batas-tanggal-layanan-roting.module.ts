import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BatastanggallayananComponent } from './batas-tanggal-layanan.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BatastanggallayananComponent }
    ])],
    exports: [RouterModule]
})
export class BatastanggallayananRoutingModule { }
