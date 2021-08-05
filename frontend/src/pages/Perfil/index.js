import React, { useCallback } from 'react';
import './styles.css';
import background from '../../assets/background_login.jpg'
import useAuth from '../../hooks/useAuth';
import { Redirect } from 'react-router-dom';
import SomeSpinner from '../../components/SomeSpinner';


export default function Login(){

    const { signed, signOut, loading } = useAuth();

    const handleSignOut = useCallback( () => {
        
        signOut();
    }, [signOut]);

    if (loading) {
        return (
            <SomeSpinner/>
        )    
    }


    return (
        <div>
            {!signed ? (<Redirect to='./login'/>) :(
                <div >
                    <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
                    <div className="login-container">
                        <section className="form" >
                            <form>
                                <h1>Faça Logout</h1>
                                <button className="button" onClick={ handleSignOut }>Sair</button>
                                
                            </form>
                        </section>
                    </div>
                    
                    
                        
                    
                </div>
            )}
        </div>
        
        

    );
}

