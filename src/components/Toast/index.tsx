import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './ToasMessage';
import { ToastMessageData } from '../../hooks/ToastContext';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessageData[];
}

const ToastMessage: React.FC<ToastProps> = ({ message }) => {
  const messagesTransition = useTransition(message, (messages) => messages.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {messagesTransition.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastMessage;
