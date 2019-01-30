export class Student {
  private _firstName: string;
  private _lastName: string;
  private _birthdate: Date;
  private _averageScore: number;
  private _id: number;

  constructor(firstName: string, lastName: string, birthdate: Date, averageScore: number, id: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthdate = birthdate;
    this._averageScore = averageScore;
    this._id = id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get birthdate(): Date {
    return this._birthdate;
  }

  get averageScore(): number {
    return this._averageScore;
  }

  get id(): number {
    return this._id;
  }

}
