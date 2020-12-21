import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'va-index': '100' }
})
export class ManageTagsComponent {

  form: FormGroup;

  private _tags: Array<Tag>;
  @Input()
  get tags() { return this._tags }
  set tags(value: Array<Tag>) {
    this._tags = value;
    this.addCheckboxes();
  };

  private _selectedTags: Array<number>;
  @Input()
  get selectedTags() { return this._selectedTags }
  set selectedTags(value: Array<number>) {
    this._selectedTags = value;
    this.refreshCheckboxes();
    this.selectedTagsChange.emit(this._selectedTags);
  };

  @Output() selectedTagsChange = new EventEmitter<Array<number>>();
  @Output() dismiss = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      tags: new FormArray([])
    });
  }

  get tagsFormArray() {
    return this.form.controls.tags as FormArray;
  }

  private addCheckboxes() {
    this.tags?.forEach(() => this.tagsFormArray.push(new FormControl(false)));
  }

  private refreshCheckboxes() {
    this.selectedTags?.forEach((tagId) => {
      const tagIndex = this.tags.findIndex(tag => tag.id === tagId);
      if (tagIndex > -1) {
        this.tagsFormArray.controls[tagIndex].setValue(true);
      }
    });
  }

  submit() {
    if (this.tags?.length > 0) {
      this.selectedTags = this.form.value?.tags?.map((checked, i) =>
        checked ? this.tags[i].id : null).filter(v => v !== null);
    }
    this.dismiss.emit();
  }

  cancel() {
    this.dismiss.emit();
  }

}
