import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DaftarentitasComponent } from './daftar-entitas.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DaftarentitasComponent }
    ])],
    exports: [RouterModule]
})
export class DaftarentitasRoutingModule { }
