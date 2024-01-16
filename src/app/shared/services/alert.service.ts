import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // It will inject this provider at the root level of the application so it can be accessed anywhere.
})
export class AlertService {
  showSuccess(message: string): void {
    this.showAlert('success', message);
  }

  showError(message: string): void {
    this.showAlert('danger', message);
  }

  showInfo(message: string): void {
    this.showAlert('info', message);
  }

  private showAlert(type: string, message: string): void {
    // You may need to adapt this based on Flowbite's alert implementation
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
      <strong>${type.charAt(0).toUpperCase() + type.slice(1)}!</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(alert);

    // Adjust the duration to match your Flowbite alert behavior
    setTimeout(() => {
      alert.remove();
    }, 5000); // Remove the alert after 5 seconds (adjust as needed)
  }
}