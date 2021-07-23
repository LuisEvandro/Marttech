import styles from '../login/styles.module.css'
import TextField from '@material-ui/core/TextField';
import { Loader } from '../loader/index';
import { useContext, useState } from 'react';
import { AuthContext } from "../../contexts/authContext";
import { IconButton } from '@material-ui/core';
import router from 'next/router';

export default function LoginComponent() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const { login } = useContext(AuthContext)

    function reqLogin(event: any){
        event.preventDefault();

        login(email, password, window.location.pathname)
    }

    const handleEnterKey = (event) => {
		if(event.key === 'Enter'){
            reqLogin(event);
        }
	};

    return (
        <>
            <div className={styles.containerLoginComponent}>

                <h2>LOGIN</h2>

                <div className={styles.divInput}>
                    <TextField
                        id="email"
                        disabled={isLoading}
                        label="E-mail"
                        type="text"
                        variant="outlined"
                        className={styles.inputStyles}
                        value={email}
                        onKeyPress={(e) => handleEnterKey(e)}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.divInput}>
                    <TextField
                        id="password"
                        disabled={isLoading}
                        label="Senha"
                        type={showPassword ? "text":"password"}
                        variant="outlined"
                        InputProps={{
                            endAdornment: 	<IconButton
                                                aria-label="toque para ver a senha"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                <span className="material-icons">{showPassword ? ("visibility"):("visibility_off")}</span>
                                            </IconButton>,
                        }}
                        className={styles.inputStyles}
                        value={password}
                        onKeyPress={(e) => handleEnterKey(e)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles.divInput}>
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            <div 
                                className={styles.buttonStyles}
                                onClick={(event) => reqLogin(event)}
                            >
                                Entrar
                            </div>       
                        )
                    }
                </div>

                <div className={styles.divInput}>
                    <div 
                        className={styles.buttonStyles}
                        onClick={() => router.push('/authentication/register')}
                    >
                        Registrar-se
                    </div>       
                </div>
            </div>
        </>
    )
}