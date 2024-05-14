import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'comp-submit-wasm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-wasm.component.html',
  styleUrls: ['./submit-wasm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitWasmComponent {

  @ViewChild('wasmElt') wasmElt!: ElementRef;
  @ViewChild('template', { static: true }) template!: TemplateRef<any>;
  @Output() select_wasm: EventEmitter<Uint8Array | undefined> = new EventEmitter<Uint8Array | undefined>();

  private wasm!: Uint8Array | undefined;
  file_name!: string;

  async onWasmSelected(event: Event) {
    this.file_name = this.wasmElt?.nativeElement.value.split('\\').pop();
    const file = (event.target as HTMLInputElement).files?.item(0), buffer = await file?.arrayBuffer();
    this.wasm = buffer && new Uint8Array(buffer);
    const wasmBuffer = this.wasm?.buffer;
    if (!wasmBuffer) {
      this.resetWasmClick();
    }
    this.select_wasm.emit(this.wasm);
  }

  onWasmClick() {
    (this.wasmElt.nativeElement as HTMLInputElement).click();
  }

  resetWasmClick() {
    this.wasmElt.nativeElement.value = '';
    this.wasm = undefined;
    this.file_name = '';
    this.select_wasm.emit(undefined);
  }

}
