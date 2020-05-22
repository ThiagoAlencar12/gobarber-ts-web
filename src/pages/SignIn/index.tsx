import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, Content, Background } from './styles';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import getErros from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface DataSignIn {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { singIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: DataSignIn) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        singIn({
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Login Aprovado ',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getErros(err);

          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro na autenticação ',
            description:
              'Ocorreu um erro em seu login, campos não podem estar vazios ou cheque suas credenciais',
          });
        }
      }
    },
    [singIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="NewAccount">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
