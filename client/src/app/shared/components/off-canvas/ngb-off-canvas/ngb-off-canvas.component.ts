import { Component, Input } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-offcanvas-content',
	standalone: true,
	template: `
		<div class="offcanvas-header">
			<h5 class="offcanvas-title">Menu</h5>
			<button
				type="button"
				class="btn-close text-reset"
				aria-label="Close"
				(click)="activeOffcanvas.dismiss('Cross click')"
			></button>
		</div>
		<div class="offcanvas-body">
			<div>Hello {{ name }}</div>
      <div>Employees</div>
      <div>Customers</div>
      <div>Department</div>
			<button type="button" class="btn btn-outline-dark" (click)="activeOffcanvas.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdOffcanvasContent {
	@Input() name:any;

	constructor(public activeOffcanvas: NgbActiveOffcanvas) {}
}

@Component({
	selector: 'ngbd-offcanvas-component',
	templateUrl: './ngb-off-canvas.component.html',
})
export class NgbdOffCanvasComponent {
	constructor(private offcanvasService: NgbOffcanvas) {}

	open() {
		const offcanvasRef = this.offcanvasService.open(NgbdOffcanvasContent);
		offcanvasRef.componentInstance.name = 'World';
	}
}
