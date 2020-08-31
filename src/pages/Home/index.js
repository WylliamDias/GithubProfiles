import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import axios from 'axios';

import Profile from '../../components/Profile';

import './styles.css';

function Home() {
  const initialUserInfoState = {
    username: '',
    followers: 0,
    totalRepos: 0,
    avatar_url: '',
    repos: []
  };

  const [ userInfos, setUserInfos ] = useState(initialUserInfoState);

  const [ isLoading, setIsLoading ] = useState(false);

  const [ inputProfile, setInputProfile ] = useState('');

  async function getProfileInfos(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data: { avatar_url, login, followers } } = await axios.get(`https://api.github.com/users/${inputProfile}`);
      const { data } = await axios.get(`https://api.github.com/users/${inputProfile}/repos`);

      data.sort((repoA, repoB) => {
        if (repoA.stargazers_count < repoB.stargazers_count)
          return 1;
        return 0;
      });

      const [ repo1, repo2, repo3, repo4 ] = data;

      setUserInfos({
        username: login,
        followers,
        avatar_url,
        totalRepos: data.length,
        repos: [ repo1, repo2, repo3, repo4 ]
      });

    } catch (error) {
      alert('Erro!, usuário não encontrado');
      setUserInfos(initialUserInfoState);
    }

    setIsLoading(false);
  }

  return (
    <>
      <main id="home-main">
        <section className="input-container">
          <label htmlFor="search-github-profile">
            Pesquisar por perfil
          </label>
          <form className="input-box" onSubmit={getProfileInfos}>
            <input
              id="search-github-profile"
              type="text"
              value={inputProfile}
              onChange={event => setInputProfile(event.target.value)}
              required
            />
            <span>
              Pesquisar por perfil
            </span>
            <button type="submit">
              <AiOutlineSearch />
            </button>
          </form>
        </section>

        <section className="profile-info-container">
          {
            isLoading ? <h1>...</h1> : <Profile userInfos={userInfos} />
          }
        </section>
      </main>
    </>
  );
}

export default Home;
