import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/ui/files/add-files/file.service';

@Component({
  selector: 'app-pay-remittance',
  templateUrl: './pay-remittance.component.html',
  styleUrls: ['./pay-remittance.component.css']
})
export class PayRemittanceComponent {
  typeForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() payAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() paysId! : any;
  claim:any;
  agentId: any;
  agents: any;

  constructor(private uploadService: UploadService, private route: ActivatedRoute,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
  } 

  ngOnInit() {

    console.log(this.paysId)
    this.typeForm = this.fb.group({
      dateTo: '',
      dateFrom: '',
    });

  }




  onSubmit(event: Event) {
    event.preventDefault();
    if (this.typeForm.valid) {
      this.spinner.show();
  console.log(this.typeForm.value)
      this.service.postToUrl(`${API.CLIENTS}remittances/pay`, this.typeForm.value).subscribe(
        (res) => {
          this.data = res;
          this.spinner.hide();
          this.alert.showSuccess('Saved Successfully');
          this.closeModal();
          this.payAdded.emit(res); // Emit the result after success
        },
        (error) => {
          console.error('Error processing payment:', error);
          this.spinner.hide();
        }
      );
    }
  }
    closeModal() {
    const modalOptions: ModalOptions = {
      onHide: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.hide();
  }

  showModal() {
    const modalOptions: ModalOptions = {
      onShow: () => {
      },
  };
  const instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };
    const modal = new Modal(document.getElementById('modal'), modalOptions, instanceOptions);
    modal.show();
  }

}
