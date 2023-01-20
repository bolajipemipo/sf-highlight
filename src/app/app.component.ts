import { Component, Inject } from '@angular/core';
import { SfNode } from './sf-node';
import { DOCUMENT } from '@angular/common';

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

  private allNodeElements!: NodeListOf<HTMLElement> | undefined;

  nodesProcessed!: Array<SfNode>;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  processHighlightedText() {
    const selection = window.getSelection();

    let isReversed = false;
    if (selection) {
      isReversed = selection?.anchorOffset > selection?.focusOffset;
    }

    this.allNodeElements = selection?.getRangeAt(0)?.commonAncestorContainer?.parentNode?.querySelectorAll('.node-processed');

    let selectedRows;

    if (isReversed) {
      selectedRows = this.processSelectedNodes(selection?.focusNode?.parentElement, selection?.anchorNode?.parentElement, []);
    } else {
      selectedRows = this.processSelectedNodes(selection?.anchorNode?.parentElement, selection?.focusNode?.parentElement, []);
    }

    const allRows = this.processAllNodes(selection?.anchorNode?.parentElement, selection?.focusNode?.parentElement, isReversed);

    // Output: Approach 1
    // this.nodesProcessed = selectedRows.map((row: any) => new SfNode(row.id, row.innerText))

    // Output: Approach 2
    if (allRows) {
      if (isReversed) {allRows.reverse()}
      this.nodesProcessed = allRows.map((row: any) => new SfNode(row.id, row.innerText))
    }
  }

  /**
   * Approach 1
   * Goes through all the nodes to find the ones that match the selected duos (start/end nodes)
   * @param startingELement
   * @param endingELement
   * @param isReversed
   */
  processAllNodes(startingELement: HTMLElement | null | undefined, endingELement: HTMLElement | null | undefined, isReversed: boolean) {
    const matchedNodes = [];

    let includeCursor = false;
    let endCursor = false;

    if (!this.allNodeElements) {
      return ;
    }

    const starting = isReversed ? this.allNodeElements!.length - 1 : 0;
    const condition = (i: number) => isReversed ? (i > 0) : (i < this.allNodeElements!.length);

    for (let i = starting; condition(i); isReversed ? i-- : i++) {
      if (startingELement?.id === this.allNodeElements[i].id) {
        includeCursor = true;
      }

      if (endingELement?.id === this.allNodeElements[i].id) {
        endCursor = true;
      }

      if (includeCursor) {
        matchedNodes.push(this.allNodeElements[i])
      }

      if (endCursor) {
        break;
      }
    }

    return matchedNodes;
  }

  /**
   * Approach 2
   * Goes through higlighted nodes to find the ones that match the selected duos (start/end nodes)
   * @param startingELement
   * @param endingELement
   * @param affectedList
   */
  processSelectedNodes(startingELement: Element | null | undefined, endingELement: Element | null | undefined, affectedList: any = []): any {
    // Only add if the element doesn't exist and is a node
    if (!affectedList.find((af: any) => af.id === startingELement?.id) && startingELement?.className === "node-processed") {
      affectedList.push(startingELement);
    }

    if (startingELement?.id === endingELement?.id) {
      return ;
    }

    if (startingELement?.nextElementSibling?.className === "node-processed") {
      // Check the elements' next sibling
      this.processSelectedNodes(startingELement?.nextElementSibling, endingELement, affectedList);
    } else if (startingELement?.nextElementSibling?.className === "node-parent-processed") {
      // Keep checking the children of "node-parent-processed"
      this.processSelectedNodes(startingELement?.nextElementSibling.firstElementChild, endingELement, affectedList);
    } else if (startingELement?.parentElement?.className === "node-parent-processed") {
      // Keep going back to the parent till we reach the root of "node-parent-processed"
      this.processSelectedNodes(startingELement?.parentElement, endingELement, affectedList);
    }

    return affectedList;
  }
}
