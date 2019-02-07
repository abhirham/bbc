import React from 'react';
import {reduxForm, Field} from 'redux-form';

class PaymentForm extends React.Component{

    renderError({error,touched}){
		if(error && touched){
			return (
				<div class="ui pointing red basic label">
					{error}
				</div>
			)
		}
	}

    renderInput = ({input, meta}) => {
        return (
            <div className="required eight wide field">
                <label>Amount</label>
                <div className="ui right labeled input">
                    <input type="text" {...input} autoComplete="off" placeholder="00.00" />
                    <div className="ui tag label">CAD</div>
                </div>
                {this.renderError(meta)}
            </div>
        )
    }

    render(){
        return (
            <form className="ui equal width error form">
                <div className="fields">
                    <div className="required eight wide field">
                        <label>Category</label>
                        <Field name="category" placeholder="Category" component="select">
                            <option value=""></option>
                            <option value="membership">Membership</option>
                            <option value="tests">Tests</option>
                            <option value="product">Product</option>
                        </Field>
                    </div>
                    <Field name="amount" component={this.renderInput} />
                </div>
            </form>
        )
    }

}

const validate = (formValues) => {
    const error = {};
    if(!formValues.category)
        error.category = "Select a valid option";
    if(!formValues.amount)
        error.amount = "Enter a valid amount";
    return error;
}

export default reduxForm({
    form: "paymentForm",
    validate
})(PaymentForm);