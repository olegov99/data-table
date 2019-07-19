<<<<<<< HEAD
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
=======
import { Component, OnInit, ViewChild } from '@angular/core';
// import { EventEmitter } from '@angular/core';
>>>>>>> fea8d329046f748a5093b9e0e7d0e40f58d09c39
import {IPopup } from '../popup';
import { DataTableService } from '../data-table.service';
import { Student } from '../student';
import { EditStudentFormComponent } from '../edit-student-form/edit-student-form.component';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataTableComponent implements OnInit {
  private _removePopup: IPopup = {
    isOpen: false
  };

  @ViewChild(EditStudentFormComponent) editStudentForm: EditStudentFormComponent;

  constructor(public dataTableService: DataTableService) { }

  ngOnInit() {}

  getStudents() {
    return this.dataTableService.getStudents();
  }

  getSearchStudent(): string {
    return this.dataTableService.getSearchStudent();
  }

  isLow(averageScore: number): boolean {
    return averageScore < 3 ? true : false;
  }

  sortBy(sorting: string): void {
    this.dataTableService.sortBy(sorting);
  }

  isPopupOpen(): boolean {
    return this._removePopup.isOpen;
  }

  openPopup(id: number): void {
    this._removePopup.isOpen = true;
    this._removePopup.studentID = id;
  }

  closePopup(): void {
    this._removePopup.isOpen = false;
    this._removePopup.studentID = null;
  }

  removeStudent() {
    if (this._removePopup.studentID) {
      this.dataTableService.removeStudent(this._removePopup.studentID);
      this.closePopup();
    } else {
      this.closePopup();
    }
  }

  openEditStudentPopup(student: Student): void {
    this.dataTableService.openEditStudentPopup(student);
  }

  fillEditFormControls(student: Student): void {
    this.editStudentForm.fillEditFormControls(student);
  }

<<<<<<< HEAD
  isHighlightOn(): boolean {
    return this.dataTableService.isBgRed();
  }

  isEditStudentPopupOpen(): boolean {
    return this.dataTableService.isEditStudentPopupOpen();
  }

  isAddStudentPopupOpen(): boolean {
    return this.dataTableService.isAddStudentPopupOpen();
  }

=======
>>>>>>> fea8d329046f748a5093b9e0e7d0e40f58d09c39
}
