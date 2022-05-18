import React, { useEffect, useRef } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from './firebase.init';
import Processing from './Processing';

const Register = () => {

        const emailRef = useRef('');
        const passwordRef = useRef('');
        const navigate = useNavigate();
        const location = useLocation();

        const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
        const [
            createUserWithEmailAndPassword,
            user,
            loading,
            error,
        ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

        useEffect(() => {
            let from = location.state?.from?.pathname || "/";
            if (user || googleUser) {
                navigate(from, { replace: true })
            }
        })

        const handleRegister = async e => {
            e.preventDefault();
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            await createUserWithEmailAndPassword(email, password);
        }
        const handleGoogleSignIn = () => {
            signInWithGoogle();
    }
    
    return (
        <div>
            <div className="py-6 my-24">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}></div>
                    <form onSubmit={handleRegister} className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">T-Fashion Warehouse</h2>
                        <p className="text-xl text-gray-600 text-center">Welcome!</p>
                        <button type='button' onClick={handleGoogleSignIn} className=" mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 w-full">
                            {
                                googleLoading ?
                                    <span className='px-4 py-3 flex justify-center items-center'>
                                        <svg className="mx-3 h-6 w-6 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                    :
                                    <div className='flex items-center justify-center'>
                                        <div className="px-4 py-3">
                                            <svg className="h-6 w-6" viewBox="0 0 40 40">
                                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                            </svg>
                                        </div>
                                        <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
                                    </div>
                            }
                        </button>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <p className="text-xs text-center text-gray-500 uppercase">or Signup with email</p>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input ref={emailRef} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" required />
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            </div>
                            <input ref={passwordRef} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required />
                        </div>
                        {
                            error && <div className='text-red-600'>
                                <p>{error.message}</p>
                            </div>
                        }
                        {
                            googleError && <div className='text-red-600'>
                                <p>Error: {googleError.message}</p>
                            </div>
                        }
                        <div className="mt-8">
                            <button type='submit' className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">{
                                loading ?
                                    <Processing></Processing>
                                    :
                                    <p>Sign Up</p>
                            }</button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4"></span>
                            <p className="text-xs text-gray-500 uppercase">or <Link to={'/login'} className="underline">Log in</Link></p>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                        <Link to={'/'} className="text-sm text-gray-600 flex gap-1 items-center mt-2 underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>Back to Home</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;