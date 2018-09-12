import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appMyDirect]'
})
export class MyProbeDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'blue';
  }


}
