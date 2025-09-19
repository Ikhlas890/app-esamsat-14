import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgramkeringanandendaComponent } from './program-keringanan-denda.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ProgramkeringanandendaComponent }
    ])],
    exports: [RouterModule]
})
export class ProgramkeringanandendaRoutingModule { }
