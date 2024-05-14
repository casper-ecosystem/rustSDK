import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from './client.service';

@NgModule({
  imports: [CommonModule],
  providers: [ClientService]
})
export class ClientModule { }
