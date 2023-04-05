import axios from 'axios';
import { useCallback, useState } from 'react';
import Input from "../components/input";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

const Auth = ()=> {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(()=> {
        setVariant((curretVariant)=> curretVariant === 'login' ? 'register' : 'login'); },[]
    );

    const login = useCallback(async () => {
        try {
          await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/'
          });
    
          router.push('/');
        } catch (error) {
          console.log(error);
        }
      }, [email, password, router]);
    
      const register = useCallback(async () => {
        try {
          await axios.post('/api/register', {
            email,
            name,
            password
          });
    
          login();
        } catch (error) {
            console.log(error);
        }
      }, [email, name, password, login])

    return(
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
            <div className="w-full h-full bg-black lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo"  className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="self-center w-full px-16 py-16 mt-2 bg-black rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-md">
                        <h2 className="mb-8 text-4xl font-bold text-white">
                           {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register'  && (
                        <Input 
                            label="Username"
                            onChange={(ev: any)=> setName(ev.target.value)}
                            id="name"
                            value={name}
                            />)}
                            <Input 
                            label="Email"
                            onChange={(ev: any)=> setEmail(ev.target.value)}
                            id="email"
                            type="email"
                            value={email}
                            />
                            <Input 
                            label="Password"
                            onChange={(ev: any)=> setPassword(ev.target.value)}
                            id="password"
                            type="password"
                            value={password}
                            />
                        </div> 
                        <button onClick={variant === 'login' ? login : register} className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700">
                         {variant === 'login' ? 'Login' : 'Sign up'}
                       </button>
                        <p className="mt-12 text-neutral-500">
                           {variant ==="login" ? "First time using Netflix?":"Already have an account"}
                            <span onClick={toggleVariant} className="ml-1 text-white cursor-pointer hover:underline">
                                {variant==="login" ? "Create an account" : "Sign Up"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth; 