import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appNewProbeDirective]'
})
export class NewProbeDirectiveDirective implements OnInit{

  navbarDropdownToggle: boolean;
  dropdownShow: string;

  constructor(private renderer: Renderer2, private elemRef: ElementRef) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elemRef.nativeElement, 'backgroundColor', 'blue');
  }



}
