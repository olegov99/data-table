import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableService} from '../data-table.service';
import { IStudentData} from '../student-data';
import { identityRevealedValidator, birthdateEdgeValidator } from '../custom-validators.directive';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.less']
})
export class AddStudentFormComponent implements OnInit {
  studentForm = new FormGroup({
    fullName: new FormGroup({
      firstNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z]+$')
      ]),
      lastNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z]+$')
      ]),
    }, {validators: identityRevealedValidator}),
    birthdateControl: new FormControl('', [
      Validators.required,
      birthdateEdgeValidator
    ]),
    averageScoreControl: new FormControl('', [
      Validators.required
    ])
  });

  constructor(public dataTableService: DataTableService) { }

  ngOnInit() {
    this.dataTableService.closeAddStudentPopup();
  }

  isFirstNameEmpty(): boolean {
    const firstName = this.studentForm.controls.fullName.get('firstNameControl');
    if (!firstName.value && (firstName.dirty || firstName.touched)) {
      return true;
    }
  }

  isLastNameEmpty(): boolean {
    const lastName = this.studentForm.controls.fullName.get('lastNameControl');
    if (!lastName.value && (lastName.dirty || lastName.touched)) {
      return true;
    }
  }

  isFirstNameInvalid(): boolean {
    const firstName = this.studentForm.controls.fullName.get('firstNameControl');
    if (firstName.invalid && (firstName.dirty || firstName.touched)) {
      return true;
    }
  }

  isLastNameInvalid(): boolean {
    const lastName = this.studentForm.controls.fullName.get('lastNameControl');
    if (lastName.invalid && (lastName.dirty || lastName.touched)) {
      return true;
    }
  }

  isFullNameInvalid(): boolean {
    if (this.studentForm.controls.fullName.errors) {
      return this.studentForm.controls.fullName.errors.identityRevealed;
    }
  }

  isBirthdateEdgeInvalid(): boolean {
    if (this.studentForm.controls.birthdateControl.errors) {
      return this.studentForm.controls.birthdateControl.errors.birthdateEdge;
    }
  }

  isBirthdateInvalid(): boolean {
    const birthdate = this.studentForm.get('birthdateControl');
    if (!birthdate.value && (birthdate.dirty || birthdate.touched)) {
      return true;
    }
  }

  isAverageScoreInvalid(): boolean {
    const averageScore = this.studentForm.get('averageScoreControl');
    if (!averageScore.value && (averageScore.dirty || averageScore.touched)) {
      return true;
    }
  }

  getStudentData(): IStudentData {
    return {
      firstName: this.studentForm.controls.fullName.get('firstNameControl').value,
      lastName: this.studentForm.controls.fullName.get('lastNameControl').value,
      birthdate: new Date(this.studentForm.get('birthdateControl').value),
      averageScore: Number(this.studentForm.get('averageScoreControl').value),
    };
  }

  addStudent(): void {
    const _studentFormData = this.getStudentData();
    this.dataTableService.addStudent(_studentFormData);
  }

  onSubmit() {
    this.addStudent();
    this.closePopup();
    this.clearFormControls();
  }

  clearFormControls(): void {
    this.studentForm.reset();
  }

  isPopupOpen(): boolean {
    return this.dataTableService.isAddStudentPopupOpen();
  }

  closePopup(): void {
    this.dataTableService.closeAddStudentPopup();
    this.clearFormControls();
  }



}
