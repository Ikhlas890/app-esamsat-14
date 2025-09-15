import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from '@angular/common';
import { RegisteruserComponent } from './register-user.component';
import { RegisteruserRoutingModule } from './register-user-routing.module';

@NgModule({
    imports: [
    RegisteruserRoutingModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    DropdownModule
],
    declarations: [RegisteruserComponent]
})
export class RegisteruserModule { }
