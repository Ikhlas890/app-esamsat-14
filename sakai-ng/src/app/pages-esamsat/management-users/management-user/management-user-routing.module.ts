import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagementuserComponent } from './management-user.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ManagementuserComponent }
    ])],
    exports: [RouterModule]
})
export class ManagementuserRoutingModule { }
