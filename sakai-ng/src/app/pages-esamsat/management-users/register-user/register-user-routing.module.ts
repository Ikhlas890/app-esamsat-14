import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisteruserComponent } from './register-user.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RegisteruserComponent }
    ])],
    exports: [RouterModule]
})
export class RegisteruserRoutingModule { }
