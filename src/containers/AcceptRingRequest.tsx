import styled from 'styled-components/macro';

import ConnectedAccountPill from 'components/ConnectedAccountPill';
import Container from 'components/common/wrappers/Container';
import AcceptRingRequestCard from 'components/AcceptRingRequestCard';

import previewRing1 from 'assets/images/preview-ring-1.png';

const AcceptRingRequestWrapper = styled.main`
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

  & > ${Container} {
    max-width: 851px;
  }
`;

const AcceptRingRequest = (): JSX.Element => {
  return (
    <AcceptRingRequestWrapper>
      <ConnectedAccountPill className="connected-account-pill" />
      <Container>
        <AcceptRingRequestCard
          proposerName="Rahul"
          spouseName="Priyanka"
          proposerRing={previewRing1}
          message={
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
          }
          signedBy={['Rahul Kumar', 'Priyanka Bedi']}
          qrCodeString="Hello World"
        />
      </Container>
    </AcceptRingRequestWrapper>
  );
};

export default AcceptRingRequest;
