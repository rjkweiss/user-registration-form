# User Registration Form

## Overview
This project is a User Registration Form built with React. It includes real-time validation, modular components, and an improved user experience with features like dynamic error handling, character limits, and conditional input enabling/disabling.

## Features
- Real-time Form Validation - Instant error messages as the user types.
- Reusable Input Components - Modularized input fields for maintainability.
- Conditional Field Behavior - phoneType dropdown is disabled unless phone is provided.
- Character Counter for Bio - Users can see remaining characters.
- Prevent Excess Input in Bio - Users can't exceed the limit but can delete characters.
- Dynamic Error Highlighting - Invalid fields are highlighted in red.
- Consistent Layout - Error messages don’t shift input fields.
- Custom Styling - Custom checkbox/radio styles and a themed dropdown arrow.
- Submission Timestamp - Stores form submission time.

## Installation
### 1. Clone the Repository
```
git clone
cd user-registration-form
```
### 2. Install Dependencies & Run Project
```
npm install
npm run dev
```
## Project Structure
```
user-registration-form/
│── src/
│   ├── components/
│   │   ├── TextSelectInputs/
│       │   ├──TextInput.jsx
│       │   ├── SelectInput.jsx
│       │   ├── TextareaInput.jsx
│       │   ├── TextSelectInputs.css
│   │   ├── ButtonInputs/
│       │   ├── RadioInput.jsx
│       │   ├── CheckboxInput.jsx
│       │   ├── ButtonInputs.css
│   ├── App.jsx
│   ├── UserRegistrationForm.jsx
│   ├── UserRegistrationForm.css
│   ├── main.jsx
│   ├── index.css
│── public/
│── package.json
```
## Code Explanation
### Form State Management
The form data is managed using ```useState```. Errors are stored separately for real-time validation
```
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  phoneType: "",
  staff: "",
  bio: "",
  emailNotifications: false
});

// manage errors
const [validationErrors, setValidationErrors] = useState({});

// manage state of form submission
const [submitted, setSubmitted] = useState(false);
```

### Input Handling & Validation
Each field is validated separately when changed, and errors are updated instantly.
```
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

    // ensure bio doesn't exceed 280 but still allow user to delete chars
    if (name === 'bio' && value.length > 280) return;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
  });

  // check if we have submitted and then call to validate the form again
  if (submitted) validateForm();
}
```
- **Name & Email** are required inputs
- **Email validation** ensures correct format
- **Phone number validation** ensures correct format
- **Phone type** is required if a phone number is entered
- **Bio has a 280-character limit** and prevents extra input

**_Regular expression_** is used to validate the email format as well as the date format

**Phone Validation**
  - accepts phone numbers in the format xxx xxx xxxx, xxx-xxx-xxxx, (xxx) xxx-xxxx (and variations with no - in between)
  ```
  const phoneRegex =/^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
  ```
**EmailValidation**
  - ensures that email is correctly formed, has @ in the right place and doesn't have invalid characters
    ```
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    ```

### Modularized Input Components
Each input type (text, select, textarea, radio, checkbox) is refactored into its own
reusable components. 
```
<TextInput
  label="Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  error={validationErrors.name}
/>
```

### Dynamic Error Display
Fields with errors turn red and reserved space prevents form from shifting
```
.error {
  border: 2px solid red;
}
.validation-error-space {
  min-height: 20px;
}
```

### Form Submission & Reset
On Submission, the form checks for errors, ensures phoneType is not selected if no phone number is provided, logs the data being submitted with a timestamp, and resets the form if submission was successful.
```
const onSubmit = (e) => {
  e.preventDefault();

  setSubmitted(true);

  if (validateForm()) {
    const submissionData ={
      ...formData,
      phoneType: formData.phone ? formData.phoneType : '',
      submittedOn: new Date().toISOString()
    };

  console.log('form submitted successfully!');
  console.log(submissionData);

  // reset the form after it has been successfully submitted
  setFormData({
    name: '',
    email: '',
    phone: '',
    phoneType: '',
    staff: '',
    bio: '',
    emailNotifications: false
  });
}
```

## Future Improvements
- Add API integration for real submission
- Improve accessibility with ARIA attributes
- Support dark mode

## License
This project is open-source and available under the MIT License.
