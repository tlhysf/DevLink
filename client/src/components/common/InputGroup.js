import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function InputGroup({
	name,
	placeholder,
	value,
	errors,
    onChange,
    icon,
    type
}) {
	return (
		<div className="input-group mb-3">
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                    <i className={icon}/>
                </span>
            </div>
			<input
				className={classNames("form-control form-control-lg", {
					"is-invalid": errors,
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{errors && <div className="invalid-feedback"> {errors} </div>}
		</div>
	);
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
	placeholder:PropTypes.string,
	value:PropTypes.string.isRequired,
	errors:PropTypes.string,
	icon:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

InputGroup.defaultProps = { 
    type: 'text' 
}
