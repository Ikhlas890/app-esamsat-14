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
import { KodeRekeningRoutingModule } from './kode-rekening-routing.module';
import { KoderekeningComponent } from './kode-rekening.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    imports: [
        KodeRekeningRoutingModule,
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        TableModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        RadioButtonModule,
        ToastModule,
        TabMenuModule,
        ConfirmDialogModule,
        ToolbarModule,
        TabViewModule
    ],
    declarations: [KoderekeningComponent]
})
export class KodeRekeningModule { }
