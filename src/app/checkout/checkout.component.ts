import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardNumber: [''],
        cardHolderId: [''],
        cardHolderName: [''],
        expirationDate: [''],
        CVC: [''],
      }),
    });
  }

  onSubmit() {
    console.log(this.checkoutForm.get('customer')?.value);
  }
}
