
const TextInput = ({ label, name, type='text', value, onChange, placeholder, ariaDescribeBy, error }) => {

    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <input
                className={`form-control ${error ? 'error' : ''}`}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-describedby={ariaDescribeBy}
            />

            {/* for validation error display */}
            <div className='validation-error-space'>
                {error && <span className='validation-error'>{error}</span>}
            </div>
        </div>
    );

};

export default TextInput;
