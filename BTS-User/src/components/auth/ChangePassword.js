import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel, Form, Button } from "react-bootstrap";
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            cPassword: "",
            userId: localStorage.getItem("userId"),
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
    onChangepasswordData = async (event) => {
        event.preventDefault();
        const { userId, password, cPassword } = this.state;
        try {
            const json = {
                password: password,
                user_id: userId,

            };
            this.props.onChangepassword(json);

        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { password, cPassword } = this.state;
        return (
            <>


                <div class="card">

                    <div class="card-body">
                        <FormGroup>
                            <FormLabel>
                                <i className="fas fa-lock mr-2" />
                                Password
                            </FormLabel>

                            <FormControl
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => this.handleChange(e)}
                                id="pass_log_id"
                            />

                            {/* <i toggle="#password-field" class="fa fa-fw fa-eye field_icon toggle-password"></i> */}


                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                <i className="fas fa-lock mr-2" />
                                Confirm Password
                            </FormLabel>
                            <FormControl
                                type="password"
                                name="cPassword"
                                value={cPassword}
                                onChange={(e) => this.handleChange(e)}

                            />

                        </FormGroup>
                        <Button
                            className="submit rounded-pill bg1"
                            onClick={(e) => this.onChangepasswordData(e)}
                        >
                            Submit
                        </Button>

                    </div>
                </div>

            </>
        );
    }
}

export default ChangePassword;
