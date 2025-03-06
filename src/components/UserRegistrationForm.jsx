import { useState } from 'react';

import TextInput from './TextSelectInputs/TextInput';
import SelectInput from './TextSelectInputs/SelectInput';
import RadioInput from './ButtonInputs/RadioInput';
import TextareaInput from './TextSelectInputs/TextareaInput.';
import CheckboxInput from './ButtonInputs/CheckboxInput';

import './UserRegistrationForm.css';
import './TextSelectInputs/TextSelectInputs.css';
import './ButtonInputs/ButtonInputs.css';

function UserRegistrationForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        phoneType: '',
        staff: '',
        bio: '',
        emailNotifications: false
    });

    // store errors encountered during validation
    const [validationErrors, setValidationErrors] = useState({});

    // tracks if form has been submitted
    const [submitted, setSubmitted] = useState(false);

    // handle data change
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

    // regular expressions for validating phone number & email address
    const phoneRegex =/^(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // handle data validation
    const validateForm = () => {

        // store the errors
        const newError = {};

        // check that name has been provided
        if (!formData.name.trim()) {
            newError.name = 'Name is required';
        }

        // check that email has been provided & is valid email
        if (!formData.email.trim()) {
            newError.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newError.email = 'Invalid email format';
        }

        // check that phone number provided is valid
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newError.phone = 'Invalid Phone number. Phone number must be 10 digits';
        }

        // check phone number type
        if (formData.phone && !formData.phoneType) {
            newError.phoneType = 'A phone type is required when a phone number is entered';
        }

        // check that bio meets the character limit
        if (formData.bio.length > 280) {
            newError.bio = 'Bio cannot exceed 280 characters';
        }

        // set the errors
        setValidationErrors(newError);

        // return a boolean whether we have any errors
        return Object.keys(newError).length === 0;
    };

    // handle form submission
    const onSubmit = (e) => {
        // prevent default behavior
        e.preventDefault();

        // updated submitted boolean
        setSubmitted(true);

        // check if form is correct
        if (validateForm()) {

            // get data to be submitted and edit
            const submissionData ={
                ...formData,
                phoneType: formData.phone ? formData.phoneType : '',
                submittedOn: new Date().toISOString()
            };
            // log data in console <-- could use REST API later on for this part
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

            // clear out validation errors
            setValidationErrors({});

            // reset the submitted status of form
            setSubmitted(false);

        } else {
            console.log('validation error!');
        }


    };

    return (
        <div className='user-registration-form'>
            <h2>User Registration Form</h2>

            <form onSubmit={onSubmit}>

                {/* name */}
                <TextInput
                    label='Name'
                    name = 'name'
                    value={formData.name}
                    onChange={handleChange}
                    ariaDescribeBy='nameError'
                    error={validationErrors.name}
                />

                {/* email*/}
                <TextInput
                    label='Email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    ariaDescribeBy='emailError'
                    error={validationErrors.email}
                />

                {/* phone number */}
                <TextInput
                    label='Phone Number'
                    name='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={handleChange}
                    ariaDescribeBy='phoneError'
                    placeholder='(123) 456-7890'
                    error={validationErrors.phone}
                />

                {/* phone type */}
                <SelectInput
                    label="PhoneType"
                    name="phoneType"
                    value={formData.phoneType}
                    onChange={handleChange}
                    options={['Home', 'Mobile', 'Work']}
                    disabled={!formData.phone}
                    ariaDescribeBy="phoneTypeError"
                    error={validationErrors.phoneType}
                />

                {/* staff */}
                <RadioInput
                    label='Staff'
                    name='staff'
                    options={['Instructor', 'Student']}
                    value={formData.staff}
                    onChange={handleChange}
                />

                {/* Bio */}
                <TextareaInput
                    label='Bio'
                    name='bio'
                    value={formData.bio}
                    onChange={handleChange}
                    maxChars='280'
                    ariaDescribeBy='bioError'
                    error={validationErrors.bio}
                />

                {/* sign up checkbox */}
                <CheckboxInput
                    label='Sign up for email notifications'
                    name='emailNotifications'
                    value={formData.emailNotifications}
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                />

                {/* submit btn */}
                <div className='btn'>
                    <button type='submit' className='btn-primary'>Register</button>
                </div>

            </form>
        </div>
    );
}

export default UserRegistrationForm;
