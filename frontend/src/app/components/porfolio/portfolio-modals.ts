import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio-modals',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-modals.html',
  standalone: true
})
export class PortfolioModals {
  @Input() activeModal: string | null = null;
  @Input() formData: any = {};
  
  @Output() close = new EventEmitter<void>();
  @Output() saveProfile = new EventEmitter<any>();
  @Output() saveSocialLinks = new EventEmitter<any>();
  @Output() addSkill = new EventEmitter<any>();
  @Output() addMethodology = new EventEmitter<any>();
  @Output() addExperience = new EventEmitter<any>();
  @Output() addEducation = new EventEmitter<any>();
  @Output() addProject = new EventEmitter<any>();

  closeModal() {
    this.close.emit();
  }

  onSaveProfile() {
    this.saveProfile.emit(this.formData);
  }

  onSaveSocialLinks() {
    this.saveSocialLinks.emit(this.formData);
  }

  onAddSkill() {
    this.addSkill.emit(this.formData);
  }

  onAddMethodology() {
    this.addMethodology.emit(this.formData);
  }

  onAddExperience() {
    this.addExperience.emit(this.formData);
  }

  onAddEducation() {
    this.addEducation.emit(this.formData);
  }

  onAddProject() {
    this.addProject.emit(this.formData);
  }
}
