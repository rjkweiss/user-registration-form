
import './UserRegistrationForm.css';

function UserRegistrationForm() {

    return (
        <div className="user-registration-form">
            <h2>User Registration Form</h2>
            <form>
                {/* name */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" name="name" id="name" />
                </div>

                {/* email*/}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" name="email" id="email" />
                </div>

                {/* phone number */}
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input className="form-control" type="tel" name="phone" id="phone" />
                </div>

                {/* phone type */}
                <div className="form-group">
                    <label htmlFor="phoneType">PhoneType</label>
                    <select name="phoneType" id="phoneType" className="form-control">
                        <option value="" disabled>Select Phone Type</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Work">Work</option>
                        <option value="Home">Home</option>
                    </select>
                </div>

                {/* staff */}
                <div className="form-group">
                    <label htmlFor="staff">Staff</label>
                    <div className="radio-input">
                        {/* instructor */}
                        <label>
                            <input type="radio" name="staff" id="instructor" value="Instructor" className="form-control" />
                            Instructor
                        </label>

                        {/* student */}
                        <label>
                            <input type="radio" name="staff" id="student" value="Student" className="form-control" />
                            Student
                        </label>
                    </div>
                </div>

                {/* Bio */}
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" rows="3" />
                </div>

                {/* sign up checkbox */}
                <div className="form-group">
                    <label htmlFor="emailNotificationSignup">
                        <input className="form-control" type="checkbox" name="emailNotificationSignup" id="emailNotificationSignup" />
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
