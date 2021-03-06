import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import validator from 'validator'

import style from './style.css';

import Header from '../components/Header/index';

import { network } from '../config/network';

const EnviarLivro = () => {

    const history = useHistory();

    const [nomeLivro, setNomeLivro] = useState("");
    const [nomeAutor, setNomeAutor] = useState("");
    const [generoLivro, setGeneroLivro] = useState("");
    const [idiomaLivro, setIdiomaLivro] = useState("");
    const [arquivo, setArquivo] = useState("");


    const [errorMessage, setErrorMessage] = useState(null);

    const [usuario, setUsuario] = useState(null);

    const handleLogin = async (e) => {

        e.preventDefault();

        

            const formData = new FormData();

            formData.append('nome_livro', nomeLivro);
            formData.append('nome_autor', nomeAutor);
            formData.append('genero_livro', generoLivro);
            formData.append('idioma_livro', idiomaLivro);
            formData.append('arquivo', arquivo);

            const token = await localStorage.getItem('@token')

            try{
                await fetch(network.api + '/cadastro-livro', {
                    method: 'post',
                    headers: {
                        'x-access-token': token 
                    },
                    body: formData
                })
                .then(response => response.text())
                .then(async data => {
                    try {
                        window.alert(data);
                        history.push({ pathname: '/' });
                    } catch (e) {
                        // saving error
                    }
                })
        
            }catch(err){
                //
            }

        
        
    
    }

    useEffect( async () => {
        setUsuario(await localStorage.getItem('@usuario'));
    }, [])

    if(usuario == null) {
        return (
            <div>
                <Header noSearchBar={true} />
                <a>Voc?? precisa de uma conta para acessar essa p??gina</a>
            </div>
        )
    } else {
        return (
            <div className='colored-container'>
    
                {/*}<Header noSearchBar={true} />{*/} 
    
                <form onSubmit={(e) => handleLogin(e)} className='login-container'>
                    <div className='login-div'>
                        <div className='top'>
                            <h1>Registre seu PDF em nosso site</h1>
                            <a className='error-msg'>{errorMessage}</a>
                        </div>
                        
                        <div>
    
                            <div>
                                <a>Nome do livro</a> <br />
                                <input type={"text"} onChange={(e) => setNomeLivro(e.target.value)} />
                            </div>
    
                            <div>
                                <a>Nome do autor</a> <br />
                                <input type={"text"} onChange={(e) => setNomeAutor(e.target.value)}/>
                            </div>
    
                            <div>
                                <a>G??nero</a> <br />
                                <select defaultValue={"fic????o"} onChange={(e) => setGeneroLivro(e.target.value)}>
                                    <option title='fic????o' value={'fic????o'}>fic????o</option>
                                    <option title='filosofia' value={'filosofia'}>filosofia</option>
                                    <option title='fantasia' value={'fantasia'}>fantasia</option>
                                    <option title='educacional' value={'educacional'}>educacional</option>
                                    <option title='linguagens' value={'linguagens'}>linguagens</option>
                                    <option title='medicina' value={'medicina'}>medicina</option>
                                </select>
                            
                            </div>
    
                            <div>
                                <a>Idioma</a> <br />
                                <select defaultValue={'pt-br'} onChange={(e) => setIdiomaLivro(e.target.value)} >
                                    <option title='portugu??s-br' value={'pt-br'}>portugu??s-br</option>
                                    <option title='ingl??s-eua' value={'en-us'}>ingl??s-eua</option>
                                    <option title='alem??o' value={'de'}>alem??o</option>
                                    <option title='italiano' value={'ital'}>italiano</option>
                                    <option title='latim' value={'lat'}>latim</option>
                                </select>
                               
                            </div>
    
                            <div>
                                <a>Arquivo</a> <br />
                                <input type={"file"} onChange={(e) => setArquivo(e.target.files[0]) } accept=".pdf" />
                                
                            </div>
                        </div>
    
                        <button type='submit'> Pr??ximo </button>
                        
                        <Link to="/">voltar</Link>
                    </div>
                </form>
    
            </div>
        );
    }

}

export default EnviarLivro;