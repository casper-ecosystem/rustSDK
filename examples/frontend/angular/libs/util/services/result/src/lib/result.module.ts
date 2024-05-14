import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultService } from './result.service';
import { UtilHihlightWebworkerModule } from '@util/hightlight-webworker';

@NgModule({
  imports: [CommonModule, UtilHihlightWebworkerModule],
  providers: [ResultService]
})
export class ResultModule { }
