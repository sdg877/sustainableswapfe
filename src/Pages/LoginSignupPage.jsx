
import React, { useState } from 'react';
import LoginForm from '../Components/LoginForm.jsx';
import SignUpForm from '../Components/SignUpForm.jsx';

const LoginSignupPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    const handleLoginOrSignUp = () => {
        window.location.href = '/profile/';
    };

    return (
        <main>
            <div>
                <h2>{showLoginForm ? 'Login' : 'Sign Up'}</h2>
                {showLoginForm ? <LoginForm onLogin={handleLoginOrSignUp} /> : <SignUpForm onSignUp={handleLoginOrSignUp} />}
                <button 
                    onClick={toggleForm}
                    className="btn btn-primary mt-3">
                    {showLoginForm ? 'No Account? Sign Up Here' : 'Have an Account? Login Here.'}
                </button>
            </div>
        </main>
    );
};

export default LoginSignupPage;
