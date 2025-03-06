export type Language = "en" | "el";

export interface LanguageStrings {
  admin: string;
  user: string;
  appointmentSchedule: string;
  selectDateTime: string;
  appointmentDetails: string;
  appointmentTitle: string;
  appointmentTitlePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  selectDate: string;
  selectTime: string;
  hour: string;
  minutes: string;
  selectedDate: string;
  selectedTime: string;
  address: string;
  addToGoogleCalendar: string;
  addToAppleCalendar: string;
  selectLanguage: string;
  time: string;
  backToForm: string;
  incompleteInformation: string;
  incompleteInformationDescription: string;
  copyLink: string;
  linkCopied: string;
}

export const languages: Record<Language, LanguageStrings> = {
  en: {
    admin: "Administrator",
    user: "User",
    appointmentSchedule: "Appointment Schedule",
    selectDateTime: "Select date and time for the appointment",
    appointmentDetails: "Appointment Details",
    appointmentTitle: "Appointment Title",
    appointmentTitlePlaceholder: "Enter appointment title",
    description: "Description",
    descriptionPlaceholder: "Enter appointment description",
    selectDate: "Select Date",
    selectTime: "Select Time",
    hour: "Hour",
    minutes: "Minutes",
    selectedDate: "Selected Date",
    selectedTime: "Selected Time",
    address: "Address",
    addToGoogleCalendar: "Add to Google Calendar",
    addToAppleCalendar: "Add to Apple Calendar",
    selectLanguage: "Select Language",
    time: "Time",
    backToForm: "Back to Form",
    incompleteInformation: "Incomplete Information",
    incompleteInformationDescription:
      "Please complete the appointment form to generate calendar links and QR codes.",
    copyLink: "Copy Link",
    linkCopied: "Link Copied",
  },
  el: {
    admin: "Διαχειριστής",
    user: "Χρήστης",
    appointmentSchedule: "Πρόγραμμα Ραντεβού",
    selectDateTime: "Επιλέξτε ημερομηνία και ώρα για το ραντεβού",
    appointmentDetails: "Στοιχεία Ραντεβού",
    appointmentTitle: "Τίτλος Ραντεβού",
    appointmentTitlePlaceholder: "Τίτλος ραντεβού",
    description: "Περιγραφή",
    descriptionPlaceholder: "Περιγραφή ραντεβού",
    selectDate: "Επιλογή Ημερομηνίας",
    selectTime: "Επιλογή Ώρας",
    hour: "Ώρα",
    minutes: "Λεπτά",
    selectedDate: "Επιλεγμένη Ημερομηνία",
    selectedTime: "Επιλεγμένη Ώρα",
    address: "Διεύθυνση",
    addToGoogleCalendar: "Προσθήκη στο Google Calendar",
    addToAppleCalendar: "Προσθήκη στο Apple Calendar",
    selectLanguage: "Επιλογή Γλώσσας",
    time: "Ώρα",
    backToForm: "Επιστροφή στη Φόρμα",
    incompleteInformation: "Ελλιπείς Πληροφορίες",
    incompleteInformationDescription:
      "Παρακαλώ συμπληρώστε τη φόρμα ραντεβού για να δημιουργηθούν οι σύνδεσμοι ημερολογίου και οι κωδικοί QR.",
    copyLink: "Αντιγραφή Συνδέσμου",
    linkCopied: "Ο Σύνδεσμος Αντιγράφηκε",
  },
};

export const defaultAppointmentTitles: Record<Language, string> = {
  en: "Appointment",
  el: "Ραντεβού",
};

export const defaultAppointmentDescriptions: Record<Language, string> = {
  en: "Appointment at the studio",
  el: "Ραντεβού στο στούντιο",
};

export const studioLocations: Record<Language, string> = {
  en: "Stylianou Gonata 4, Thessaloniki",
  el: "Στυλιανού Γόνατα 4, Θεσσαλονίκη",
};
