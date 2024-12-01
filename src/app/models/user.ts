export class User {
  cin!: number; // Obligatoire
  email!: string; // Obligatoire
  firstName!: string; // Obligatoire
  lastName!: string; // Obligatoire
  phoneNumber!: string; // Obligatoire
  address!: string; // Obligatoire
  birthDate!: string; // Obligatoire
  gender!: string; // Obligatoire
  role!: string; // Obligatoire
  nationality!: string; // Obligatoire
  passportNumber!: string; // Obligatoire
  passportIssueDate!: string; // Obligatoire
  passportExpiryDate!: string; // Obligatoire

  constructor(data?: Partial<User>) {
    if (data) {
      this.cin = data.cin || 0;
      this.email = data.email || '';
      this.firstName = data.firstName || 'Unknown';
      this.lastName = data.lastName || 'Unknown';
      this.phoneNumber = data.phoneNumber || '0000000000';
      this.address = data.address || 'Unknown';
      this.birthDate = data.birthDate || new Date().toISOString();
      this.gender = data.gender || 'Unknown';
      this.role = data.role || 'USER';
      this.nationality = data.nationality || 'Unknown';
      this.passportNumber = data.passportNumber || 'Unknown';
      this.passportIssueDate = data.passportIssueDate || new Date().toISOString();
      this.passportExpiryDate = data.passportExpiryDate || new Date().toISOString();
    }
  }
}
