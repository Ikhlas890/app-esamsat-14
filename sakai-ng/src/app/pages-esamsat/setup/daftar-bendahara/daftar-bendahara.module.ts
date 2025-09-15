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
import { DaftarbendaharaComponent } from './daftar-bendahara.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { DaftarbendaharaRoutingModule } from './daftar-bendahara-routing.module';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    imports: [
        DaftarbendaharaRoutingModule,
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        TableModule,
        DialogModule,
        RadioButtonModule,
        RouterModule,
        InputTextModule,
        ToastModule,
        ConfirmDialogModule,
        AutoCompleteModule,
        DropdownModule,
        ToolbarModule
    ],
    declarations: [DaftarbendaharaComponent]
})
export class DaftarbendaharaModule { }
