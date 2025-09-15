import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ManagementuserComponent } from './management-user.component';
import { ManagementuserRoutingModule } from './management-user-routing.module';
import { RouterModule } from '@angular/router';
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
    CommonModule,
    ManagementuserRoutingModule,
    TableModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    DropdownModule
],
    declarations: [ManagementuserComponent]
})
export class ManagementuserModule { }
