import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DaftarhariliburComponent } from './daftar-hari-libur.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DaftarhariliburComponent }
    ])],
    exports: [RouterModule]
})
export class DaftarhariliburRoutingModule { }
