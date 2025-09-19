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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgramkeringanandendaRoutingModule } from './program-keringanan-denda-routing.module';
import { ProgramkeringanandendaComponent } from './program-keringanan-denda.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    imports: [
        ProgramkeringanandendaRoutingModule,
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        TableModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        AutoCompleteModule,
        RadioButtonModule,
        ToastModule,
        ConfirmDialogModule,
        ToolbarModule,
        InputTextareaModule,
        CalendarModule
    ],
    declarations: [ProgramkeringanandendaComponent]
})
export class ProgramkeringanandendaModule { }
