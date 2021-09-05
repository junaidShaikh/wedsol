import * as React from 'react';
import styled from 'styled-components/macro';

const TextArea = styled.textarea`
  width: 100%;
  min-height: 50px;

  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  font-family: 'Inter';
  padding: 18px 0;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbbbbb;
  margin-bottom: 12px;

  resize: vertical;

  &::placeholder {
    color: rgba(6, 6, 6, 0.4);
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(6, 6, 6, 0.4);
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(6, 6, 6, 0.4);
  }
`;

const FormTextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref): JSX.Element => {
    return <TextArea {...props} ref={ref} autoComplete="off" />;
  }
);

export default FormTextArea;
