import React, { useState, useEffect } from 'react';

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
        fetch('https://facedetectionappbackend.onrender.com/register', {
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
                console.log("registration success")
            }
        })
    }

    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure tc">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={onRegNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" required placeholder='Enter Name'/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={onRegEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required placeholder='Enter Email'/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={onRegPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required placeholder='Enter Password'/>
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