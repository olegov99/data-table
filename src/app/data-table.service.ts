import { Injectable } from '@angular/core';
import { Student } from './student';
import { STUDENTS } from './mock-students';


@Injectable({
  providedIn: 'root'
})

export class DataTableService {
  private _searchStudent: string;
  private _bgRedCheckbox: boolean;
  private _scoresFilter: boolean[] = [true, true, true, true, true];
  private _birthdateFilter: Date[] = [new Date(1900, 5, 5), new Date(2015, 5, 5)];
  private _students: Student[];
  private _filteredStudents: Student[];

  constructor() {
    this.setStudents();
  }

  getSearchStudent(): string {
    return this._searchStudent;
  }

  setSearchStudent(queryString: string): void {
    this._searchStudent = this.capitalizeFirstLetter(queryString);
    console.log(queryString);
  }

  getBgRed(): boolean {
    return this._bgRedCheckbox;
  }

  setBgRed(selectLowScores: boolean): void {
    this._bgRedCheckbox = selectLowScores;
  }

  addScoreFilter(score: number, selectedScore: boolean): void {
    this._scoresFilter[score] = selectedScore;
    this.filterStudents();
  }

  getScoreFilterValue(score: number) {
    return this._scoresFilter[score];
  }

  getScoreFilter(): boolean[] {
    return this._scoresFilter;
  }

  addBirthdateFilter(index: number, birthdate: string): void {
    this._birthdateFilter[index] = this.parseDate(birthdate);
    this.filterStudents();
  }

  getBirthdateFilter(): Date[] {
    return this._birthdateFilter;
  }

  getStudents(): Student[] {
    return this._filteredStudents;
  }

  setStudents(): void {
    this._students = STUDENTS;
    this.filterStudents();
  }

  sortByFirstName(): void {
    this._filteredStudents = this._filteredStudents.sort((firstStudent: Student, secondStudent: Student) => {
      return firstStudent.firstName > secondStudent.firstName ? 1 : -1;
    });
  }

  sortByLastName(): void {
    this._filteredStudents = this._filteredStudents.sort((firstStudent: Student, secondStudent: Student) => {
      return firstStudent.lastName > secondStudent.lastName ? 1 : -1;
    });
  }

  sortByBirthdate(): void {
    this._filteredStudents = this._filteredStudents.sort((firstStudent: Student, secondStudent: Student) => {
      return firstStudent.birthDate.getTime() > secondStudent.birthDate.getTime() ? 1 : -1;
    });
  }

  sortByScore(): void {
    this._filteredStudents = this._filteredStudents.sort((firstStudent: Student, secondStudent: Student) => {
      if (firstStudent.averageScore > secondStudent.averageScore) {
        return 1;
      }
      if (firstStudent.averageScore < secondStudent.averageScore) {
        return -1;
      }
      return 0;
    });
  }

  removeStudent(studentID: number) {
    this._students = this._students.filter(student => {
      return student.id !== studentID;
    });
    this.filterStudents();
  }

  private filterStudents(): void {
    const birthdateFrom: number = this._birthdateFilter[0].getTime();
    const birthdateTo: number = this._birthdateFilter[1].getTime();
    this._filteredStudents = this._students.filter(student => {
       if (this._scoresFilter[student.averageScore - 1] === true) {
         if (birthdateFrom < student.birthDate.getTime() && birthdateTo > student.birthDate.getTime()) {
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
