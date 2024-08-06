import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GymCaveFormService} from "../services/gym-cave-form.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  creditCardMonths:number[] =[];
  creditCardYears:number[] =[];

  constructor(private formBuilder: FormBuilder, private GymCaveFormService: GymCaveFormService) {

  }

  ngOnInit(): void {
    const startMonth = new Date().getMonth() +1 ;
    this.GymCaveFormService.GetCreditCardMonths(startMonth).subscribe(
      data =>{
        this.creditCardMonths = data;
      }
    )
    this.GymCaveFormService.GetCreditCardYears().subscribe(
      data=>{
        this.creditCardYears = data;
      }
    )
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

  HandleMonthAndYear() {

    const creditCardFormGroup = this.checkoutForm.get('creditCard');
    const selectedYear :number = Number(creditCardFormGroup?.value.expirationDate);
    const CurrentYear = new Date().getFullYear();
    let startMonth = 1
    if(selectedYear == CurrentYear){
      startMonth =  new Date().getMonth() +1 ;
    }
    else {
      startMonth = 1
    }

    this.GymCaveFormService.GetCreditCardMonths(startMonth).subscribe(
      data =>{
        this.creditCardMonths = data;
      }
    )
    this.GymCaveFormService.GetCreditCardYears().subscribe(
      data=>{
        this.creditCardYears = data;
      }
    )
  }
}
