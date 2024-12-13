import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalOptions, InstanceOptions, Modal } from 'flowbite';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { Department } from 'src/app/models/department';
import { PaymentStatus, FileType } from 'src/app/models/policy-status';
import { ApiService, API } from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/ui/files/add-files/file.service';

@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.css']
})
export class UpdateRolesComponent {
  typeForm!: FormGroup;
  data: any
  isAddMode!: boolean;
  id:any;
  @Output() rolesAdded : EventEmitter<number> = new EventEmitter<number>();
  @Input() rolesId! : any;
  role:any;
  departmentOptions = Object.values(Department);

  constructor(private uploadService: UploadService, private route: ActivatedRoute,
    private fb: FormBuilder, private service: ApiService, private spinner: NgxSpinnerService,private alert: AlertService) {
  } 

  ngOnInit() {
    console.log(this.rolesId)
    const roleId = this.rolesId
    if (roleId) {        
      this.getrole(roleId)
    }
    console.log(this.rolesId)
    this.typeForm = this.fb.group({
      name: '',
      department: '',
    });

  }

  getrole(roleId:any) {
    this.service.getFromUrl(`${API.AUTH}roles/${roleId}`).pipe(first())
        .subscribe(x => {
            this.typeForm.patchValue({
                name: x.name,
                department: x.department
            });
        });
  }

  onSubmit(event: Event) {
    event.preventDefault(); 
    if (this.typeForm.valid) { 
      this.spinner.show();

      this.service.updateToUrl(`${API.AUTH}roles/${this.rolesId}`, this.typeForm.value).subscribe((res) => {
        this.data = res;
        this.spinner.hide();
        this.alert.showSuccess("Saved Successfully");
        this.closeModal();
        this.rolesAdded.emit(res);
      });
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
