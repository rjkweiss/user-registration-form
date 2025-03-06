
const SelectInput = ({ label, name, value, onChange, options, disabled, ariaDescribeBy, error }) => {

    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <select
                className={`form-control ${error ? 'error': ''}`}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                aria-describedby={ariaDescribeBy}
            >
                <option value='' disabled>Select {label} </option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            {/* handle validation errors */}
            <div className='validation-error-space'>
                {error && <span className='validation-error'>{error}</span>}
            </div>
        </div>
    );
};

export default SelectInput;
