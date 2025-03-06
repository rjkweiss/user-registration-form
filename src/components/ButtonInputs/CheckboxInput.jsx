
const CheckboxInput = ({label, name, value, checked, onChange}) => {
    return (
        <div className='form-group'>
            <label className='checkbox-label'>
                <input
                    type='checkbox'
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
                {label}
            </label>
        </div>
    );
};

export default CheckboxInput;
