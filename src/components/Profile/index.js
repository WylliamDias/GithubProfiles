import React from 'react';

import './styles.css';

function Profile( { userInfos } ) {
  return userInfos.username && (
    <div className="profile-container">
      <section className="profile-info">
        <img
          src={userInfos.avatar_url}
          alt="Avatar"
        />
        <h3>{userInfos.username}</h3>
      </section>

      <section className="profile-data">
        <article className="profile-count">
          <div className="followers-count">
            Folowers: {userInfos.followers}
          </div>

          <div className="repositories-count">
            Repositories: {userInfos.totalRepos}
          </div>
        </article>
        <article className="profile-repositories">
          <ul className="repositories-list">
            {userInfos.repos.map( repositorie => {
              return (
                <li key={repositorie.id} className="repositorie">
                  {repositorie.name}
                </li>
              );
            } )}
          </ul>
        </article>
      </section>
    </div>
  );
}

export default Profile;
