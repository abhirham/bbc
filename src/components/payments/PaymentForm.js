import React from 'react';
import {reduxForm, FieldArray, Field} from 'redux-form';

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
            <div className="required seven wide field">
                <label>Amount</label>
                <div className="ui right labeled input">
                    <input type="text" {...input} autoComplete="off" placeholder="00.00" />
                    <div className="ui tag label">CAD</div>
                </div>
                {this.renderError(meta)}
            </div>
        )
    }

    renderDeleteButton(fields,index){
        if(fields.length>1)
         return (
             <span className="ui field ">
                <label style={{color:'white'}}>.</label>
                <button className="ui red button " onClick={e => {
                        e.preventDefault();
                        fields.remove(index);
                    }}>
                    <i className="trash icon"></i>
                </button>
            </span>
        )
    }

    renderFields = ({fields}) => {
       return (
            <>
                {fields.map((field,index) => {
                     return (
                        <div className="fields" key={index}>
                            <div className="required seven wide field">
                                <label>Category</label>
                                <Field name={`${field}.category`} placeholder="Category" component="select">
                                    <option value=""></option>
                                    <option value="membership">Membership</option>
                                    <option value="tests">Tests</option>
                                    <option value="product">Product</option>
                                </Field>
                            </div>
                            <Field name={`${field}.amount`} component={this.renderInput} />
                            {this.renderDeleteButton(fields,index)}
                        </div>
                    )}
               ) }
                <button className="ui green button" onClick={e=> {
                        e.preventDefault();
                        fields.push({})
                    }}>+</button>
            </>
        )
    }

    render(){
        return (
            <form className="ui error form">
                <FieldArray name="purchases" component={this.renderFields} />
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