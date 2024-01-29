import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',

})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private deBouncer = new Subject<string>();
  private deBouncerSubscription?: Subscription;
  @Input() public placeholder: string = '';
  @Input() public initialValue: string = '';
  @Output() public value = new EventEmitter<string>();
  @Output() public onDeBounce = new EventEmitter<string>();
  constructor() { }


  ngOnInit() {
    this.deBouncerSubscription = this.deBouncer
      .pipe(debounceTime(400))
      .subscribe(
        value => this.onDeBounce.emit(value)
      )
  }
  emitValue(txtInput: string): void {
    this.value.emit(txtInput)
  }
  onKeyPress(txtInput: string): void {
    this.deBouncer.next(txtInput)
  }
  ngOnDestroy(): void {
    this.deBouncerSubscription?.unsubscribe();
  }

}
