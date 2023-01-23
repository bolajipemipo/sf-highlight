import { Component, Input, OnInit } from '@angular/core';
import { SfNode } from '../sf-node';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
})
export class NodeListComponent implements OnInit {

  @Input() nodeList!: Array<SfNode>;
  @Input() nodesProcessed!: Array<SfNode>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
