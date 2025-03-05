import { useState } from 'react';

import './UserRegistrationForm.css';

function UserRegistrationForm() {

    // state variables to keep track of our form input
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [phoneType, setPhoneType] = useState('');
    // const [staff, setStaff] = useState('');
    // const [bio, setBio] = useState('');
    // const [emailNotifications, setEmailNotifications] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        phoneType: "",
        staff: "",
        bio: "",
        emailNotifications: false
    });

    // store errors encountered during validation
    const [validationErrors, setValidationErrors] = useState({});

    // handle data change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
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
            newError.name = "Name is required";
        }

        // check that email has been provided & is valid email
        if (!formData.email.trim()) {
            newError.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newError.email = "Invalid email format";
        }

        // check that phone number provided is valid
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newError.phone = "Invalid Phone number. Phone number must be 10 digits";
        }

        // check phone number type
        if (formData.phone && !formData.phoneType) {
            newError.phoneType = "A phone type is required when a phone number is entered";
        }

        // check that bio meets the character limit
        if (formData.bio.length > 280) {
            newError.bio = "Bio cannot exceed 280 characters";
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

        // check if form is correct
        if (validateForm()) {
            // log data in console <-- could use REST API later on for this part
            console.log("form submitted successfully!");
            console.log(formData);

            // reset the form after it has been successfully submitted
            setFormData({
                name: "",
                email: "",
                phone: "",
                phoneType: "",
                staff: "",
                bio: "",
                emailNotifications: false
            });
        } else {
            console.log("validation error!");
        }


    };

    return (
        <div className="user-registration-form">
            <h2>User Registration Form</h2>
            <form onSubmit={onSubmit}>
                {/* name */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                    {validationErrors.name && (<span className="validation-error">{validationErrors.name}</span>)}
                </div>

                {/* email*/}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    {validationErrors.email && (<span className="validation-error">{validationErrors.email}</span>)}
                </div>

                {/* phone number */}
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        className="form-control"
                        type="tel"
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        value={formData.phone}
                    />
                    {validationErrors.phone && (<span className="validation-error">{validationErrors.phone}</span>)}
                </div>

                {/* phone type */}
                <div className="form-group">
                    <label htmlFor="phoneType">PhoneType</label>
                    <select
                        className="form-control"
                        name="phoneType"
                        id="phoneType"
                        onChange={handleChange}
                        value={formData.phoneType}
                    >
                        <option value="" disabled>Select Phone Type</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Work">Work</option>
                        <option value="Home">Home</option>
                    </select>
                    {validationErrors.phoneType && (<span className="validation-error">{validationErrors.phoneType}</span>)}
                </div>

                {/* staff */}
                <div className="form-group">
                    <label htmlFor="staff">Staff</label>
                    <div className="radio-input">
                        {/* instructor */}
                        <label>
                            <input
                                className="form-control"
                                type="radio"
                                name="staff"
                                id="instructor"
                                value="Instructor"
                                onChange={handleChange}
                                checked={formData.staff === 'Instructor'}
                            />
                            Instructor
                        </label>

                        {/* student */}
                        <label>
                            <input
                                className="form-control"
                                type="radio"
                                name="staff"
                                id="student"
                                value="Student"
                                onChange={handleChange}
                                checked={formData.staff === 'Student'}
                            />
                            Student
                        </label>
                    </div>
                </div>

                {/* Bio */}
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        name="bio"
                        id="bio"
                        rows="3"
                        onChange={handleChange}
                        value={formData.bio}
                    />
                    {validationErrors.bio && (<span className="validation-error">{validationErrors.bio}</span>)}
                </div>

                {/* sign up checkbox */}
                <div className="form-group">
                    <label htmlFor="emailNotifications">
                        <input
                            className="form-control"
                            type="checkbox"
                            name="emailNotifications"
                            id="emailNotifications"
                            onChange={handleChange}
                            checked={formData.emailNotifications}
                        />
                        Sign up for email notifications
                    </label>
                </div>

                {/* submit btn */}
                <div className="btn">
                    <button type="submit" className="btn-primary">Register</button>
                </div>


            </form>
        </div>
    );
}

export default UserRegistrationForm;
