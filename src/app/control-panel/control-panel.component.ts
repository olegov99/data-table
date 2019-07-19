import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataTableService} from '../data-table.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent implements OnInit {
  scoreFilter: boolean[];
  birthdateFilter: Date[];

  constructor(public dataTableService: DataTableService) { }

  ngOnInit() {
    this.setBgRed(true);
    this.setScoreFilter();
    this.setBirthdateFilter();
  }

  setSearchStudent(value: string) {
    this.dataTableService.setSearchStudent(value);
  }

  setBgRed(value: boolean) {
    this.dataTableService.setBgRed(value);
  }

  isBgRed(): boolean {
    return this.dataTableService.isBgRed();
  }

  setScoreFilter(): void {
    this.scoreFilter = this.dataTableService.getScoreFilter();
  }

  addScoreFilter(index: number, value: boolean): void {
    this.dataTableService.addScoreFilter(index, value);
  }

  setBirthdateFilter(): void {
    this.birthdateFilter = this.dataTableService.getBirthdateFilter();
  }

  addBirthdateFilter(index: number, value: string): void {
    this.dataTableService.addBirthdateFilter(index, value);
  }

  getIndex(index): number {
    return index;
  }

  openAddStudentPopup(): void {
    this.dataTableService.openAddStudentPopup();
  }
}
