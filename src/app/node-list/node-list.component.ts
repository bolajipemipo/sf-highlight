import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SfNode } from '../sf-node';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
})
export class NodeListComponent implements OnInit {

  @Input() nodeList!: Array<SfNode>;
  @Input() nodesProcessed!: Array<SfNode>;
  @Output() doneSelecting: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  finishedHighlighting() {
    this.doneSelecting.emit(true);
  }

}
