import { Component, OnInit } from '@angular/core';
import {IPopup } from '../popup';
import { DataTableService } from '../data-table.service';
import { Student } from '../student';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less']
})

export class DataTableComponent implements OnInit {
  private _removePopup: IPopup = {
    isOpen: false
  };

  constructor(public dataTableService: DataTableService) { }

  ngOnInit() { }

  getStudents() {
    return this.dataTableService.getStudents();
  }

  getSearchStudent(): string {
    return this.dataTableService.getSearchStudent();
  }

  isLow(averageScore: number): boolean {
    return averageScore < 3 ? true : false;
  }

  sortByFirstName(): void {
    this.dataTableService.sortByFirstName();
  }

  sortByLastName(): void {
    this.dataTableService.sortByLastName();
  }

  sortByBirthdate(): void {
    this.dataTableService.sortByBirthdate();
  }

  sortByScore(): void {
    this.dataTableService.sortByScore();
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
}
