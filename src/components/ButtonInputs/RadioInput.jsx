
const RadioInput = ({label, name="staff", options, value, onChange}) => {
    return(
        <div className="form-group">
            <label>{label}</label>
            <div className="radio-input">
                {options.map(option => (
                    <label key={option} className="radio-label">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={onChange}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioInput;
