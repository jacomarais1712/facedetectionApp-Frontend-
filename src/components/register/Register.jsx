import React, { useState, useEffect } from 'react';
import './Register.css';

function Register ({ onRouteChange, loadUser }) {
    const [regName, setRegName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    

    const onRegNameChange = (event) => {
        setRegName(event.target.value)
    }

    const onRegEmailChange = (event) => {
        setRegEmail(event.target.value)
    }

    const onRegPasswordChange = (event) => {
        setRegPassword(event.target.value)
    }

    const onRegSubmit = (event) => {
        event.preventDefault();
        fetch(`${import.meta.env.VITE_BACKENDAPI}/register`, {
            method: "post",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                name: regName,
                email: regEmail,
                password: regPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                loadUser(data)
                onRouteChange('home')
            }
        })
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure tc">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 f2-m f1-l fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={onRegNameChange} className="mw6 center w-90 w-90-m w-100-l pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="text" name="name" id="animated-input" required placeholder='Enter Name'/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={onRegEmailChange} className="mw6 center w-90 w-90-m w-100-l pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" name="email-address"  id="email-address" required placeholder='Enter Email'/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={onRegPasswordChange} className="mw6 center w-90 w-90-m w-100-l b pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="password" name="password"  id="password" required placeholder='Enter Password'/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onRegSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                    </div>
                </form>
            </main>
        </article>
    );
}

export default Register