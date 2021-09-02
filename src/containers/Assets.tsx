import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import ConnectedAccountPill from 'components/ConnectedAccountPill';

const AssetsWrapper = styled.main`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 60px 0 160px 0;

  .connected-account-pill {
    margin-bottom: 20px;
  }
`;

const Assets = (): JSX.Element => {
  const history = useHistory();

  return (
    <AssetsWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <button
        onClick={() => {
          history.push('/add-asset');
        }}
      >
        Next
      </button>
    </AssetsWrapper>
  );
};

export default Assets;
