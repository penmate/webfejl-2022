import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessfulRoutingModule } from './successful-routing.module';
import { SuccessfulComponent } from './successful.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';

@NgModule({
  declarations: [
    SuccessfulComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    SuccessfulRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SuccessfulModule { }
