import { Component, OnInit } from '@angular/core';
import { DataTableService} from '../data-table.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less']
})
export class ControlPanelComponent implements OnInit {
  scoreFilter: boolean[];
  birthdateFilter: Date[];

  constructor(public dataTableService: DataTableService) { }

  ngOnInit() {
    this.setBgRed(true);
    this.setScoreFilter();
  }

  setSearchStudent(value: string) {
    this.dataTableService.setSearchStudent(value);
  }

  setBgRed(value: boolean) {
    this.dataTableService.setBgRed(value);
  }

  getBgRed(): boolean {
    return this.dataTableService.getBgRed();
  }

  setScoreFilter(): void {
    this.scoreFilter = this.dataTableService.getScoreFilter();
  }

  addScoreFilter(index: number, value: boolean): void {
    this.dataTableService.addScoreFilter(index, value);
  }

  getIndex(index): number {
    return index;
  }

  setBirthdateFilter(): void {
    this.birthdateFilter = this.dataTableService.getBirthdateFilter();
  }

  addBirthdateFilter(index: number, value: string): void {
    console.log(value);
    this.dataTableService.addBirthdateFilter(index, value);
  }

}
