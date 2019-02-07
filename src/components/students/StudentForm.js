import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {DateInput} from 'semantic-ui-calendar-react';
import '../../stylesheets/StudentForm.css';

class StudentForm extends Component{

	

	renderError({error,touched}){
		if(error && touched){
			return (
				<div class="ui pointing red basic label">
					{error}
				</div>
			)
		}
	}
	
    renderInput = ({input, meta, label, ph, type}) => {
		return (
            <div className="required field">
                <label>{label}</label>
                <input type={type || "text"} {...input} autoComplete="off" placeholder={ph || label} />
				{this.renderError(meta)}
			</div>
        )
		}
		
		renderDatePicker = ({input,label,meta}) => {
			return (
				<div className="required field">
					<label>{label}</label>
					<DateInput closable
						value={input.value} 
						onChange={(e, value) => input.onChange(value.value)} iconPosition="left" 
						placeholder="DD-MM-YYYY" popupPosition="bottom left" closeOnMouseLeave={false}
					/>
					{this.renderError(meta)}
				</div>
			)
		}

		

		renderStudentFields(){
			return (
				<>
					<div className="equal width fields">
						<Field name="firstName" component={this.renderInput} label="First Name" />
						<Field name="lastName" component={this.renderInput} label="Last Name" />
					</div>
					<div className="equal width fields">
						<Field name="dob" component={this.renderDatePicker} label="Date of Birth" />
						<Field name="doj" component={this.renderDatePicker} label="Date of Join" />
					</div>
					<div className="fields">
						<div className="seven wide field">
							<Field name="email" component={this.renderInput} label="Email" 
								ph="username@example.com" />
						</div>
						<Field name="phoneNumber" component={this.renderInput} label="Phone Number" 
							type="number" ph="(xxx)xxx xxxx"
						/>
						
						<div className="required field">
							<label>Gender</label>
							<Field name="gender" component="select">
								<option>Select</option>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</Field>
						</div>
					</div>
					<div className="fields">
						<div className="eight wide field">
							<Field name="streetAddress" component={this.renderInput} label="Street Address" />
						</div>
						<Field name="city" component={this.renderInput} label="City" />
						<Field name="province" component={this.renderInput} label="Province" />
					</div>
				</>
			)
		}

		renderParentFields(){
			return (
				<>
					<div className="equal width fields">
						<Field name="parentFirstName" component={this.renderInput} label="First Name" />
						<Field name="parentLastName" component={this.renderInput} label="Last Name" />
					</div>
					<div className="fields">
						<div className="four wide field">
							<label>Relation</label>
							<Field name="relation" component="select">
								<option>Select</option>
								<option value="Father">Father</option>
								<option value="Mother">Mother</option>
							</Field>
						</div>
						<div className="five wide field">
							<Field name="parentPhoneNumber" component={this.renderInput} label="Phone Number" 
								type="number" ph="(xxx)xxx xxxx"
							/>
						</div>
						<div className="seven wide field">
							<Field name="parentEmail" component={this.renderInput} label="Email" 
								ph="username@example.com" />
						</div>
					</div>
				</>
			)
		}

		

		renderRankFields(){
			return (
				<div className="fields">
					<div className="eight wide field">
						<label>Rank {this.props.disable?"(new students get white by default)":""}</label>
						<Field name="rank" component="select" disabled={this.props.disable}>
							<option value="white">White</option>
							<option value="yellow">Yellow</option>
							<option value="orange">Orange</option>
							<option value="green">Green</option>
							<option value="blue">Blue</option>
							<option value="purple">Purple</option>
							<option value="brown">Brown</option>
							<option value="red">Red</option>
							<option value="black">Black</option>
						</Field>
							
					</div>
				</div>
			)
		}

	render(){
			return (
				<form className="ui form">
					<div className="ui grid">
						<div className="eight wide column">
							<div className="ui green segment">
								<h1 className="ui header">Student Details
									<h5 className="ui header">(All fields are mandatory)</h5>
									</h1>
								{this.renderStudentFields()}
							</div>
						</div>
						<div className="eight wide column">
							<div className="ui blue segment">
								<h1 className="ui header">Parent Details<h5 className="ui header">(Optional)</h5></h1>
								{this.renderParentFields()}
							</div>
							<div className="ui yellow segment">
								<h1 className="ui header">Rank Details</h1>
								{this.renderRankFields()}
							</div>
						</div>
					</div>
				</form>
			)
    }
}

const validate = formValues => {
	const errors = {};
	if(!formValues.firstName)
		errors.firstName="Field cannot be blank"
	if(!formValues.lastName)
		errors.lastName="Field cannot be blank"
	if(!formValues.email)
		errors.email="Field cannot be blank"
	else if(!formValues.email.match(/[a-z0-9][a-z0-9]*@[a-z0-9][a-z0-9]*\.[a-z0-9][a-z0-9]*/))
		errors.email="Enter a valid email"
	if(!formValues.phoneNumber)
		errors.phoneNumber="Field cannot be blank"
	else if(formValues.phoneNumber.toString().length!==10)
		errors.phoneNumber="Enter a valid phone number"
	if(!formValues.city)
		errors.city="Field cannot be blank"
	if(!formValues.streetAddress)
		errors.streetAddress="Field cannot be blank"
	if(!formValues.province)
		errors.province="Field cannot be blank"
	if(!formValues.dob)
		errors.dob="Please make a selection"
	if(!formValues.doj)
		errors.doj="Please make a selection"
	if(!formValues.gender || formValues.gender==="Select")
		errors.gender="Please make a selection"
	return errors;
	
}

export default reduxForm({
	form: 'studentForm',
	validate
})(StudentForm);