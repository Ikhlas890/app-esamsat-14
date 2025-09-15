import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KoderekeningComponent } from './kode-rekening.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: KoderekeningComponent }
    ])],
    exports: [RouterModule]
})
export class KodeRekeningRoutingModule { }
