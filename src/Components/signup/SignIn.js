import React,{Component} from 'react';
import { Link , withRouter } from 'react-router-dom';
import './SignUp.css';
//import PropTypes from 'prop-types';

   class SignIn extends Component{
        constructor(){
        super()
        this.state={
            email:'',
            password:''
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        }
        change(event){
            let target=event.target;
            let value=target.value;
            let name=target.name;
            this.setState({
             [name]:value
         });
        }
        onSubmit(event){
            event.preventDefault();
            console.log('this form is submited with this data');
            console.log(this.state);
            this.props.history.push('/Home');
        }

render(){
           return(
                <div className='form'>
                <form className='form_fields' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='email'>E-mail Address :</label> 
         <input type='email'
            required
            id='email'
            name='email'
            className='form_field_input'
            placeholder="Enter E-mail"
            onChange={this.change}
            value={this.state.email}/>
           </div>
           <div className='form_field'>
          <label className='form_label' htmlFor='password'>Password :</label>
        <input type='password'
            required
            id="password"
            name='password'
            className='form_field_input'
            placeholder="********************"
            onChange={this.change}
            value={this.state.password} /> 
            </div>
            <div className='form_field'>
           <button className='form_field_button btn'>Sign In</button><Link to='/' className='form_name_link'> Create an Account</Link>
           </div>
        </form>
        </div>  
    )
           }
        }


export default withRouter(SignIn);
  