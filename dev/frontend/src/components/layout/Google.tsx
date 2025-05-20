import React from 'react';

const Google: React.FC = () => {
      return (
            <a href="https://accounts.google.com/o/oauth2/auth?client_id=626775549529-mgarkqol48n6optt5dd209ucc414sln0.apps.googleusercontent.com&redirect_uri=http://localhost:8085/oauth2/callback/google&response_type=code&scope=profile%20email">
                  <button>Google 로그인</button>
            </a>
      );
};

export default Google;
