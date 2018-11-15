import { NgModule } from "@angular/core";
import {
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    exports: [
        MatDialogModule,
        MatCardModule,
        MatCheckboxModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatRadioModule,
        MatToolbarModule
    ]
})

export class UiModule {}