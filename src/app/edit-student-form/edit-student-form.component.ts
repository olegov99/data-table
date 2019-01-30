import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DataTableService} from '../data-table.service';
import { IStudentData} from '../student-data';
import { identityRevealedValidator } from '../identity-revealed.directive';
import { birthdateEdgeValidator } from '../birthdate-edge.directive';
import { Student } from '../student';

@Component({
  selector: 'app-edit-student-form',
  templateUrl: './edit-student-form.component.html',
  styleUrls: ['./edit-student-form.component.less']
})
export class EditStudentFormComponent implements OnInit {

  openedStudent: Student;

  studentForm = new FormGroup({
    fullName: new FormGroup({
      firstNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastNameControl: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
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

  addStudent(): void {
    const _studentFormData = this.getStudentData();
    this.dataTableService.addStudent(_studentFormData);
  }

  onSubmit(form: NgForm) {
    this.addStudent();
    this.closePopup();
    this.clearFormControls();
  }

  clearFormControls(): void {
    this.studentForm.reset();
  }

  isPopupOpen(): boolean {
    if (this.dataTableService.isEditStudentPopupOpen()) {
      this.openedStudent = this.dataTableService.getOpenedStudent();
      console.log(this.openedStudent);
    }
    return this.dataTableService.isEditStudentPopupOpen();
  }

  closePopup(): void {
    this.dataTableService.closeEditStudentPopup();
    this.clearFormControls();
  }

  setFirstNameControl(): void {
    if (this.openedStudent) {
      this.studentForm.patchValue({
        fullName: {
          firstNameControl: this.openedStudent.firstName
        }
      });
    }
  }
}
