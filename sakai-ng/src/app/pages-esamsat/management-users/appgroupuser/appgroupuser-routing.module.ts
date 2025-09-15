import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppgroupuserComponent } from './appgroupuser.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AppgroupuserComponent }
    ])],
    exports: [RouterModule]
})
export class AppgroupuserRoutingModule { }
