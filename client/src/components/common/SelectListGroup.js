import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function SelectListGroup({
	name,
	placeholder,
	value,
	errors,
	info,
	onChange,
	options,
}) {
	const selectOption = options.map((option) => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));

	return (
		<div className="form-group">
			<select
				className={classNames("form-control form-control-lg", {
					"is-invalid": errors,
				})}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}>
				{selectOption}
			</select>
			{info && <small className="form-text text-muted"> {info} </small>}
			{errors && <div className="invalid-feedback"> {errors} </div>}
		</div>
	);
}

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	errors: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
};
