import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as S from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <S.Container>
    <S.Background />

    <S.Content>
      <img src={logoImg} alt="GoBarber" />

      <form action="/">
        <h1>Faça seu cadastro</h1>

        <Input name="name" icon={FiUser} placeholder="E-mail" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>
        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="NewAccount">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </S.Content>
  </S.Container>
);

export default SignUp;
