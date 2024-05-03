import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '@util/error';

@Component({
  selector: 'comp-submit-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-file.component.html',
  styleUrls: ['./submit-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitFileComponent {

  @ViewChild('template', { static: true }) template!: TemplateRef<any>;
  @ViewChild('deployFileElt') deployFileElt!: ElementRef;
  @Output() select_file: EventEmitter<string> = new EventEmitter<string>();

  private deploy_json!: string;

  constructor(
    private readonly errorService: ErrorService,
  ) { }

  async onDeployFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    let text;
    this.deploy_json = '';
    if (file) {
      text = await file.text();
      if (!text.trim()) {
        return;
      }
      text = text.trim();
      try {
        const deploy_json = JSON.parse(text);
        this.deploy_json = deploy_json;
      } catch {
        const error = 'Error parsing deploy';
        console.error(error);
        this.errorService.setError(error as string);
      }
    }
    this.select_file.emit(this.deploy_json);
    this.deployFileElt.nativeElement.value = '';
  }

  deployFileClick() {
    (this.deployFileElt.nativeElement as HTMLInputElement).click();
  }

}
