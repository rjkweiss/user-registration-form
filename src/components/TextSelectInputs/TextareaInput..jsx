
const TextareaInput = ({label, name, value, onChange, maxChars, ariaDescribeBy, error}) => {

    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <textarea
                className={`form-control ${error ? 'error': ''}`}
                name={name}
                id={name}
                rows='5'
                value={value}
                onChange={onChange}
                aria-describedby={ariaDescribeBy}
            />

            {/* handle character limit */}
            <div className='char-count'>
                <span className={value.length > maxChars ? 'char-limit-exceeded': ''}>
                    {maxChars - value.length} characters remaining
                </span>
            </div>

            {/* handle validation errors */}
            <div className='validation-error-space'>
                {error && <span className='validation-error'>{error}</span>}
            </div>
        </div>
    );
};

export default TextareaInput;
