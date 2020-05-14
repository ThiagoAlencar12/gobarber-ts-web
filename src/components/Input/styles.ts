import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  color: #666360;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 90%;

  display: flex;
  align-items: center;
  margin-top: 8px;

  input {
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
