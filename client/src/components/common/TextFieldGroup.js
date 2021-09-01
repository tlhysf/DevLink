import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function TextFieldGroup({
	name,
	placeholder,
	value,
	label,
	errors,
	info,
	type,
	onChange,
	disabled,
}) {
	return (
		<div className="form-group">
			<input
				type={type}
				className={classNames("form-control form-control-lg", {
					"is-invalid": errors,
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted"> {info} </small>}
			{errors && <div className="invalid-feedback"> {errors} </div>}
		</div>
	);
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
	placeholder:PropTypes.string,
	value:PropTypes.string.isRequired,
	errors:PropTypes.string,
	info:PropTypes.string,
	type:PropTypes.string.isRequired,
	onChange:PropTypes.func.isRequired,
	disabled:PropTypes.string
}

TextFieldGroup.defaultProps = { 
    type: 'text' 
}
