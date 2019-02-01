import { Injectable } from '@angular/core';
import { Student } from './student';
import { STUDENTS } from './mock-students';
import { IStudentData } from './student-data';


@Injectable({
  providedIn: 'root'
})

export class DataTableService {
  private _searchStudent: string;
  private _bgRedCheckbox: boolean;
  private _scoresFilter: boolean[] = [true, true, true, true, true];
  private _birthdateFilter: Date[] = [new Date( 0, 0, 0), new Date()];
  private _sorting: string;
  private _students: Student[];
  private _filteredStudents: Student[];
  private _addStudentPopup: boolean;
  private _editStudentPopup: boolean;
  private _selectedStudent: Student;

  constructor() {
    this.setStudents();
  }

  getSelectedStudent(): Student {
    return this._selectedStudent;
  }

  openEditStudentPopup(student: Student): void {
    this._editStudentPopup = true;
    this._selectedStudent = student;
  }

  isEditStudentPopupOpen(): boolean {
    return this._editStudentPopup;
  }

  closeEditStudentPopup(): void {
    this._editStudentPopup = false;
  }

  openAddStudentPopup(): void {
    this._addStudentPopup = true;
  }

  isAddStudentPopupOpen(): boolean {
    return this._addStudentPopup;
  }

  closeAddStudentPopup(): void {
    this._addStudentPopup = false;
  }

  getSearchStudent(): string {
    return this._searchStudent;
  }

  setSearchStudent(queryString: string): void {
    this._searchStudent = this.capitalizeFirstLetter(queryString);
  }

  isBgRed(): boolean {
    return this._bgRedCheckbox;
  }

  setBgRed(selectLowScores: boolean): void {
    this._bgRedCheckbox = selectLowScores;
  }

  addScoreFilter(score: number, selectedScore: boolean): void {
    this._scoresFilter[score] = selectedScore;
    this.updateStudents();
  }

  getScoreFilter(): boolean[] {
    return this._scoresFilter;
  }

  addBirthdateFilter(index: number, birthdate: string): void {
    this._birthdateFilter[index] = this.parseDate(birthdate);
    this.updateStudents();
  }

  getBirthdateFilter(): Date[] {
    return this._birthdateFilter;
  }

  getStudents(): Student[] {
    return this._filteredStudents;
  }

  setStudents(): void {
    this._students = STUDENTS;
    this.updateStudents();
  }

  sortBy(sorting: string): void {
    this._sorting = sorting;
    if (sorting === 'first-name') {
      this.sortByFirstName();
    }
    if (sorting === 'last-name') {
      this.sortByLastName();
    }
    if (sorting === 'birthdate') {
      this.sortByBirthdate();
    }
    if (sorting === 'score') {
      this.sortByScore();
    }
  }

  sortByFirstName(): void {
    this._students = this._students.sort((firstStudent: Student, secondStudent: Student) => {
      return firstStudent.firstName > secondStudent.firstName ? 1 : -1;
    });
    this.updateStudents();
  }

  sortByLastName(): void {
    this._students = this._students.sort((firstStudent: Student, secondStudent: Student) => {
      return firstStudent.lastName > secondStudent.lastName ? 1 : -1;
    });
    this.updateStudents();
  }

  sortByBirthdate(): void {
    this._students = this._students.sort((firstStudent: Student, secondStudent: Student) => {
      return firstStudent.birthdate.getTime() > secondStudent.birthdate.getTime() ? 1 : -1;
    });
    this.updateStudents();
  }

  sortByScore(): void {
    this._students = this._students.sort((firstStudent: Student, secondStudent: Student) => {
      if (firstStudent.averageScore > secondStudent.averageScore) {
        return 1;
      }
      if (firstStudent.averageScore < secondStudent.averageScore) {
        return -1;
      }
      return 0;
    });
    this.updateStudents();
  }

  removeStudent(studentID: number) {
    this._students = this._students.filter(student => {
      return student.id !== studentID;
    });
    this.updateStudents();
  }

  addStudent(studentData: IStudentData): void {
    const _student = this.createStudentInstance(studentData);
    this._students.push(_student);
    this.updateStudents();
  }

  editStudent(studentData: IStudentData): void {
    for (const student of this._students) {
      if (student.id === this._selectedStudent.id) {
        student.firstName = this.capitalizeFirstLetter(studentData.firstName);
        student.lastName = this.capitalizeFirstLetter(studentData.lastName);
        student.birthdate = studentData.birthdate;
        student.averageScore = studentData.averageScore;
      }
    }
  }

  createStudentInstance(studentData: IStudentData): Student {
    const _firstName = this.capitalizeFirstLetter(studentData.firstName);
    const _lastName = this.capitalizeFirstLetter(studentData.lastName);
    const _birthdate = studentData.birthdate;
    const _averageScore = studentData.averageScore;
    const _id = this.generateStudentID();
    return new Student(_firstName, _lastName, _birthdate, _averageScore, _id);
  }

  generateStudentID(): number {
    return this._students[this._students.length - 1].id + 1;
  }

  private updateStudents(): void {
    this._filteredStudents = this.filterStudents();
  }

  private filterStudents(): Student[] {
    const _birthdateFrom: number = this._birthdateFilter[0].getTime();
    const _birthdateTo: number = this._birthdateFilter[1].getTime();
    return this._students.filter(student => {
       if (this._scoresFilter[student.averageScore - 1] === true) {
         if (_birthdateFrom < student.birthdate.getTime() && _birthdateTo > student.birthdate.getTime()) {
           return student;
         }
       }
    });
  }

  private parseDate(birthdate: string) {
    return new Date(birthdate);
  }

  private capitalizeFirstLetter(word?: string): string {
    if (!word) {
      return;
    }
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
