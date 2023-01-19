import { Component } from '@angular/core';
import { SfNode } from './sf-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  allNodes: SfNode[] = [
    new SfNode('1', 'First Description'),
    new SfNode('2', 'Second Description'),
    new SfNode('3', 'Third Description', [
      new SfNode('3.1', 'Second Description'),
      new SfNode('3.2', 'Third Description', [
        new SfNode('3.2.1', 'Second Description'),
        new SfNode('3.2.2', 'Third Description'),
      ]),
    ]),
    new SfNode('4', 'Fourth Description'),
  ];

  nodesProcessed: SfNode[] = [];

  startingNode?: SfNode | null;
  endingNode?: SfNode | null;

  onmousedown($event: MouseEvent, node: SfNode) {
    this.startingNode = node;
    this.endingNode = null;
    this.nodesProcessed = [node];
  }

  onmouseover($event: MouseEvent, node: SfNode) {
    if (!this.startingNode) {
      return ;
    }

    const onTheList = this.isANodeToProcess(node);

    if (onTheList) {
      const nextNode = this.findNextNodeToProcess(node);
      if (nextNode) {
        this.removeNodeFromProcessing(nextNode);
      }
    }

    if (!onTheList) {
      this.nodesProcessed.push(node);
    }
  }

  onmouseup($event: MouseEvent, node: SfNode) {
    if (!this.startingNode) {
      return ;
    }

    if (this.nodesProcessed.length === 1) {
      this.removeNodeFromProcessing(node)
    }

    this.endingNode = node;
    this.startingNode = null;
  }

  private isANodeToProcess(node: SfNode): SfNode | undefined {
    return this.nodesProcessed.find(lNode => lNode.id === node.id);
  }

  private removeNodeFromProcessing(node: SfNode) {
    this.nodesProcessed.splice(this.nodesProcessed.indexOf(node), 1);
  }

  private findNextNodeToProcess(node: SfNode): SfNode | undefined {
    return this.nodesProcessed[this.nodesProcessed.indexOf(node) + 1];
  }
}
