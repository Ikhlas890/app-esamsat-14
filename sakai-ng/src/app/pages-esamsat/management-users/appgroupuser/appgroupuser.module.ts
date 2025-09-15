import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppgroupuserComponent } from './appgroupuser.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AppgroupuserRoutingModule } from './appgroupuser-routing.module';

@NgModule({
    imports: [
        AppgroupuserRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        CardModule,
    ],
    declarations: [AppgroupuserComponent],
})
export class AppgroupuserModule { }
