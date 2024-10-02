import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // Hooks
    const navigate = useNavigate();
    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {
            setLoading(true);

            const target = event.target as typeof event.target & {
                email: { value: string },
                senha: { value: string }
            };

            axios.post('http://localhost:3001/login', {
                email: target.email.value,
                password: target.senha.value,
            }).then((resposta) => {
                console.log('deu bom');
                console.log(resposta.data);

                localStorage.setItem('americanos.token', JSON.stringify(resposta.data));
                navigate('/dashboard');
            }).catch((erro) => {
                console.log('deu ruim');
                console.log(erro);
                setLoading(false);
                setToast(true);
            });

        } else {
            refForm.current.classList.add('was-validated');
        }
    }, [navigate]);

    return (
        <>
            <Loading visible={loading} />
            <Toast
                show={toast}
                message='Dados inválidos'
                colors='danger'
                onClose={() => setToast(false)}
            />
            <div className={`${styles.main} container d-flex justify-content-center align-items-center`}>
                <div className={`${styles.border} p-4 rounded shadow-lg`} style={{ maxWidth: '400px', width: '100%' }}>
                    <div className='text-center mb-4'>
                        <img src="src/assets/logo.png" alt="Login Image" className='img-fluid' style={{ maxWidth: '150px' }} />
                        <h1 className='text-strong mt-3'>Login</h1>
                        <p className='text-strong'>Preencha os campos para logar</p>
                    </div>
                    <hr />
                    <form
                        className='needs-validation'
                        noValidate
                        onSubmit={submitForm}
                        ref={refForm}
                    >
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite seu email'
                                id='email'
                                required
                            />
                            <div className='invalid-feedback'>
                                Por favor digite seu email
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='senha' className='form-label'>Senha</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Digite sua senha'
                                id='senha'
                                required
                            />
                            <div className='invalid-feedback'>
                                Por favor digite sua senha
                            </div>
                        </div>

                        <div className='d-grid'>
                            <button
                                className='btn btn-success'
                                type='submit'
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
