import React, { Component } from "react";
import Validator from "js-object-validation";
import FullPageLoader from "../../containers/Loader/FullPageLoader";
import { FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { loginRequest } from "../../actions";
import { connect } from "react-redux";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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
    onLogin = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { email, password } = this.state;
        try {
            const json = {
                email: email,
                password: password,
            };
            const validations = {
                email: {
                    required: true,
                    email: true,
                    maxlength: 100,
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 10,
                },
            };
            const messages = {
                email: {
                    required: "Please enter email",
                    email: "Email should be valid email",
                    maxlength: "Email should be at last 100 character long",
                },

                password: {
                    required: "Please enter password",
                    minlength: "Password should be at least 6 character long",
                    maxlength: "Password should be at last 10 character long",
                },
            };

            const { isValid, errors } = Validator(json, validations, messages);
            if (!isValid) {
                this.setState({ isLoading: false});
                this.setState({ errors });
            } else {
                this.props.loginRequest(json);
                
                this.setState({ isLoading: false});
            }
        } catch (error) {
            console.log(error);
            
            this.setState({ isLoading: false});
        }
    };

    render() {
        const { email, password, errors, isLoading } = this.state;
        return (
            <>
                {

                    isLoading ? <div class="loading">Loading&#8230;</div>
                        : null
                }
                <FormGroup className="form-col">
                    <FormControl
                        type="email"
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
                        value={password}
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                        type="password"
                        isInvalid={errors.password}
                        placeholder="Password"
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.password ? errors.password : null}
                    </Form.Control.Feedback>
                </FormGroup>
                <div className="form-col text-right mb-0">
                    <input type="submit" value="Login" onClick={(e) => this.onLogin(e)}></input>
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
        loginRequest: (data) => {
            dispatch(loginRequest(data));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);