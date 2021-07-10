import React, { Component } from "react";
import Validator from "js-object-validation";
import { FormGroup, FormControl, Form } from "react-bootstrap";
import FullPageLoader from "../../containers/Loader/FullPageLoader";
import { signupRequest } from "../../actions";
import { connect } from "react-redux";
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            fname: "",
            lname: "",
            password: "",
            cpassword: "",
            contact_number: "",
            address: "",
            city: "",
            zipcode: "",
            errors: {},
            isLoading: false,
        };
    }
    handleChange = (e) => {
        const { target } = e;
        const { value, name } = target;
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: false,
            },
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const {
            fname,
            lname,
            contact_number,
            email,
            password,
            cpassword,
            address,
            city,
            zipcode,
        } = this.state;

        try {
            const data = {
                fname: fname ? fname.trim() : "",
                lname: lname ? lname.trim() : "",
                email: email ? email.trim() : "",
                contact_numbere: contact_number,
                password: password ? password.trim() : "",
                cpassword: cpassword ? password.trim() : "",
                city: city ? city.trim() : "",
                address: address ? address : "",
                zipcode: zipcode,
            };
            const json = {
                name: fname ? fname.trim() : "",
                lname: lname ? lname.trim() : "",
                email: email ? email.trim() : "",
                contact_numbere: contact_number,
                password: password ? password.trim() : "",
                cpassword: cpassword ? password.trim() : "",
                address_details: {
                    city: city ? city.trim() : "",
                    address: address ? address : "",
                    zipcode: zipcode,
                },
                role: "USER",
            };

            const validations = {
                fname: {
                    required: true,
                    maxlength: 50,
                },
                lname: {
                    required: true,
                    maxlength: 50,
                },
                email: {
                    required: true,
                    email: true,
                    maxlength: 100,
                },
                contact_numbere: {
                    required: true,
                    minlength: 10,
                    maxlength: 10,
                    numeric: true,
                },
                city: {
                    required: true,
                    maxlength: 50,
                },
                password: {
                    required: true,
                },
                cpassword: {
                    required: true,
                    // equal: password
                },
                address: {
                    required: true,
                },
                zipcode: {
                    required: true,
                },
            };
            const messages = {
                name: {
                    required: "Please Enter First Name",
                    maxlength: "Name should be at last 50 character long",
                },
                lname: {
                    required: "Please Enter Lirst Name",
                    maxlength: "Name should be at last 50 character long",
                },
                email: {
                    required: "Please Enter Email",
                    email: "Email should be valid email",
                    maxlength: "Email should be at more 100 character long",
                },
                country: {
                    required: "Please Enter City",
                    maxlength: "Country name should be at last 50 character long",
                },

                contact_numbere: {
                    required: "Please Enter Contact Numbere",
                    minlength: "Mobile no should be 10 charater long",
                    maxlength: "Mobile no should be 10 charater long",
                },
                password: {
                    required: "Please Enter Password",
                    minlength: "Password should be at least 6 charater long",
                    maxlength: "Password should be at more 10 charater long",
                },
                address: {
                    required: "Please Enter Address",
                },
                zipcode: {
                    required: "Please Enter zipcode",
                },
            };

            const { isValid, errors } = Validator(data, validations, messages);
            if (!isValid) {
                this.setState({ errors, isLoading: false });
            } else {
                this.props.signUpRequest(json);
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        const {
            login,
            cpassword,
            errors,
            fname,
            lname,
            contact_number,
            email,
            password,
            address,
            city,
            zipcode, isLoading
        } = this.state;
        return (
            <>
                {

                    isLoading ?<div class="loading">Loading&#8230;</div>
                    : null
                }
                <FormGroup className="form-col">
                    <FormControl
                        type="text"
                        name="fname"
                        value={fname}
                        placeholder="First Name"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.fname}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.fname ? errors.fname : null}
                    </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="form-col">
                    <FormControl
                        type="text"
                        name="lname"
                        value={lname}
                        placeholder="Last Name"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.lname}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.lname ? errors.lname : null}
                    </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="form-col">
                    <FormControl
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.email}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.email ? errors.email : null}
                    </Form.Control.Feedback>
                </FormGroup>


                <FormGroup className="form-col">
                    <FormControl
                        type="text"
                        name="contact_number"
                        value={contact_number}
                        placeholder="Phone"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.contact_numbere}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.contact_numbere ? errors.contact_numbere : null}
                    </Form.Control.Feedback>
                </FormGroup>


                <FormGroup className="form-col">
                    <FormControl
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.password ? errors.password : null}
                    </Form.Control.Feedback>
                </FormGroup>


                <FormGroup className="form-col">
                    <FormControl
                        type="password"
                        name="cpassword"
                        value={cpassword}
                        placeholder="Confirm Password"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.cpassword}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.cpassword ? errors.cpassword : null}
                    </Form.Control.Feedback>
                </FormGroup>


                <FormGroup className="form-col">
                    <FormControl
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.address}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.address ? errors.address : null}
                    </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="form-col">
                    <FormControl
                        type="text"
                        name="city"
                        value={city}
                        placeholder="Town/City"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.city}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.city ? errors.city : null}
                    </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="form-col">
                    <FormControl
                        type="text"
                        name="zipcode"
                        value={zipcode}
                        placeholder="Postcode/zipcode"
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={errors.zipcode}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.zipcode ? errors.zipcode : null}
                    </Form.Control.Feedback>
                </FormGroup>
                <div className="form-col text-right mb-0">
                    <input type="submit" value="SignUp"
                        onClick={(e) => this.handleSubmit(e)}></input>
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    AuthReducer: state.AuthReducer,
});
const mapDispatchToProps = (dispatch) => {
    return {

        signUpRequest: (data) => {
            dispatch(signupRequest(data));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);