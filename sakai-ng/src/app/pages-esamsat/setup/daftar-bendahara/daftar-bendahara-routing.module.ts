import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DaftarbendaharaComponent } from './daftar-bendahara.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DaftarbendaharaComponent }
    ])],
    exports: [RouterModule]
})
export class DaftarbendaharaRoutingModule { }
