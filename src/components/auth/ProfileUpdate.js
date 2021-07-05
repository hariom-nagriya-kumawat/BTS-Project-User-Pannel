// import React, { Component } from "react";
// import { FormGroup, FormControl, FormLabel, Form, Button } from "react-bootstrap";
// class ProfileUpdate extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             password: "",
//             name: "",
//             errors: {},
//             contact_number: "",
//             userId: localStorage.getItem("userId"),
//         };
//     }
//     componentDidUpdate = ({ UserDetail }) => {
//         if (
//             UserDetail &&
//             UserDetail.data &&
//             UserDetail.data !== this.props.UserDetail.data
//         ) {

//             const { name, email, contact_number, address_details, _id } = UserDetail.data;
//             this.setState({
//                 email: email,
//                 name: name,
//                 userId: _id,
//                 address_details: {
//                     city: city ? city.trim() : "",
//                     address: address ? address : "",
//                     zipcode: zipcode,
//                   },
//                 contact_number: contact_number,
//             })
//         }
//     }
//     handleChange = (e) => {
//         const { target } = e;
//         const { value, name } = target;
//         this.setState({
//             [name]: value,
//             errors: {
//                 ...this.state.errors,
//                 [name]: false,
//             },
//         });
//     };
//     onUpdate = async (event) => {
//         event.preventDefault();
//         const { email, userId, address_details, contact_number, name } = this.state;
//         try {
//             const json = {
//                 email: email,
//                 name: name,
//                 address_details: address_details,
//                 contact_number: contact_number,

//             };
//             console.log("@@@@@", json);
//             this.props.updateUser(json);

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     render() {
//         const { UserDetail } = this.props;
//         const { name, email, contact_number, address_details,
//             address,
//             city,
//             zipcode} = this.state;
//         return (
//             <>


//                 <div class="card">

//                     <div class="card-body">
//                         <FormGroup>
//                             <FormLabel>
//                                 <i className="fas fa-envelope mr-2" />
//                                 name
//                             </FormLabel>
//                             <FormControl
//                                 type="text"
//                                 name="name"
//                                 value={name}
//                                 onChange={(e) => this.handleChange(e)}

//                             />

//                         </FormGroup>
//                         <FormGroup>
//                             <FormLabel>
//                                 <i className="fas fa-envelope mr-2" />
//                                 Email
//                             </FormLabel>
//                             <FormControl
//                                 type="email"
//                                 name="email"
//                                 value={email}
//                                 onChange={(e) => this.handleChange(e)}

//                             />

//                         </FormGroup>

//                         <FormGroup>
//                             <FormLabel>
//                                 <i className="fas fa-phone mr-2" />
//                                 Contact Number
//                             </FormLabel>
//                             <FormControl
//                                 type="text"
//                                 name="contact_number"
//                                 value={contact_number}
//                                 onChange={(e) => this.handleChange(e)}

//                             />

//                         </FormGroup>
//                         <Form.Group className="mb-3">
//                             <Form.Label> <i class="fas fa-address-card mr-2"></i>Address Details</Form.Label>
//                             <Form.Control as="textarea" name="address_details" value={address_details} rows={2} />
//                         </Form.Group>
                        
//               <div className="col-lg-12 col-sm-12">
//                 <FormGroup>
//                   <FormControl
//                     type="text"
//                     name="address"
//                     value={address}
//                     placeholder="Address"
//                     onChange={(e) => this.handleChange(e)}
//                     isInvalid={errors.address}
//                   />

//                   <Form.Control.Feedback type="invalid">
//                     {errors.address ? errors.address : null}
//                   </Form.Control.Feedback>
//                 </FormGroup>
//               </div>
//               <div className="col-md-6 col-sm-12">
//                 <FormGroup>
//                   <FormControl
//                     type="text"
//                     name="city"
//                     value={city}
//                     placeholder="Town/City"
//                     onChange={(e) => this.handleChange(e)}
//                     isInvalid={errors.city}
//                   />

//                   <Form.Control.Feedback type="invalid">
//                     {errors.city ? errors.city : null}
//                   </Form.Control.Feedback>
//                 </FormGroup>
//               </div>
//               <div className="col-md-6 col-sm-12">
//                 <FormGroup>
//                   <FormControl
//                     type="text"
//                     name="zipcode"
//                     value={zipcode}
//                     placeholder="Postcode/zipcode"
//                     onChange={(e) => this.handleChange(e)}
//                     isInvalid={errors.zipcode}
//                   />

//                   <Form.Control.Feedback type="invalid">
//                     {errors.zipcode ? errors.zipcode : null}
//                   </Form.Control.Feedback>
//                 </FormGroup>
//               </div>

//                         <Button
//                             className="submit rounded-pill bg1"
//                             onClick={(e) => this.onUpdate(e)}
//                         >
//                             Submit
//                         </Button>

//                     </div>
//                 </div>

//             </>
//         );
//     }
// }

// export default ProfileUpdate;
