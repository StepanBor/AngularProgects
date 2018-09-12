import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective implements OnInit {
  @HostBinding('class.show') isOpen = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.isOpen = false;
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;

  }
}
