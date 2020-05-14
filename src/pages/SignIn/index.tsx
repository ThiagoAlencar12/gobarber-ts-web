import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import * as S from './styles';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <S.Container>
    <S.Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <input placeholder="E-mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="NewAccount">
        <FiLogIn />
        Criar conta
      </a>
    </S.Content>
    <S.Background />
  </S.Container>
);

export default SignIn;
