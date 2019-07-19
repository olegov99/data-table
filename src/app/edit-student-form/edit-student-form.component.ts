<<<<<<< HEAD
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
=======
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
>>>>>>> fea8d329046f748a5093b9e0e7d0e40f58d09c39

import { DataTableService} from '../data-table.service';
import { IStudentData} from '../student-data';
import { identityRevealedValidator, birthdateEdgeValidator } from '../custom-validators.directive';
import { Student } from '../student';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditStudentFormComponent implements OnInit {

<<<<<<< HEAD
  @Input() isOpen: boolean;

=======
>>>>>>> fea8d329046f748a5093b9e0e7d0e40f58d09c39
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
    this.dataTableService.closeEditStudentPopup();
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

  editStudent(): void {
    const _studentFormData = this.getStudentData();
    this.dataTableService.editStudent(_studentFormData);
  }

  onSubmit() {
    this.editStudent();
    this.closePopup();
    this.clearFormControls();
  }

  clearFormControls(): void {
    this.studentForm.reset();
  }

  isPopupOpen(): boolean {
<<<<<<< HEAD
    return this.isOpen;
=======
    return this.dataTableService.isEditStudentPopupOpen();
>>>>>>> fea8d329046f748a5093b9e0e7d0e40f58d09c39
  }

  closePopup(): void {
    this.dataTableService.closeEditStudentPopup();
    this.clearFormControls();
  }

  fillEditFormControls(student: Student): void {
      this.studentForm.patchValue({
        fullName: {
          firstNameControl: student.firstName,
          lastNameControl: student.lastName
        },
        birthdateControl: this.dateToString(student.birthdate),
        averageScoreControl: String(student.averageScore)
      });
  }

  dateToString(date: Date): string {
    const datePipe: DatePipe = new DatePipe(navigator.language);
    const stringDateFormat = 'y-MM-dd';
    const stringDate = datePipe.transform(date, stringDateFormat);
    return stringDate;
  }
}
