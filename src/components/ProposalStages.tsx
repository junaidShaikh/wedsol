import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

import FlexRowWrapper from './common/wrappers/FlexRowWrapper';
import FlexColumnWrapper from './common/wrappers/FlexColumnWrapper';

import sendARing from 'assets/images/send-a-ring.png';
import registerMarriage from 'assets/images/register-marriage.png';

const ProposalStagesWrapper = styled.div`
  width: 622px;
  height: 141px;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 13px;

  & > ${FlexRowWrapper} {
    height: 100%;

    & > ${FlexColumnWrapper} {
      flex: 0 1 50%;

      justify-content: center;
      align-items: center;

      cursor: pointer;

      &:first-of-type {
        border-right: 1px solid #e3e3e3;
      }

      & > ${FlexRowWrapper} {
        align-items: center;
        justify-content: center;

        .send-a-ring-image,
        .register-marriage-image {
          width: 65px;
          height: 65px;
          margin-left: 14px;
          margin-right: 14px;
        }

        h4 {
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;

          color: #060606;
          margin-bottom: 4px;
        }

        p {
          max-width: 165px;

          font-weight: 500;
          font-size: 18px;
          line-height: 22px;

          color: rgba(6, 6, 6, 0.4);
        }
      }
    }
  }
`;

interface ProposalStagesProps {
  disableProposalFlow?: boolean;
  disableMarriageFlow?: boolean;
}

const ProposalStages = ({
  disableProposalFlow = false,
  disableMarriageFlow = false,
}: ProposalStagesProps): JSX.Element => {
  const history = useHistory();

  return (
    <ProposalStagesWrapper>
      <FlexRowWrapper>
        <FlexColumnWrapper
          onClick={() => (disableProposalFlow ? {} : history.push('/proposal/new'))}
          style={{ cursor: disableProposalFlow ? 'not-allowed' : 'pointer' }}
        >
          <FlexRowWrapper>
            <img src={sendARing} alt="" className="send-a-ring-image" />
            <div>
              <h4>Send a ring</h4>
              <p>Send a virtual ring & propose</p>
            </div>
          </FlexRowWrapper>
        </FlexColumnWrapper>
        <FlexColumnWrapper
          onClick={() => (disableMarriageFlow ? {} : history.push('/marriage/new'))}
          style={{ cursor: disableMarriageFlow ? 'not-allowed' : 'pointer' }}
        >
          <FlexRowWrapper>
            <img src={registerMarriage} alt="" className="register-marriage-image" />
            <div>
              <h4>Register Marriage</h4>
              <p>Begin a new marriage forever</p>
            </div>
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </FlexRowWrapper>
    </ProposalStagesWrapper>
  );
};

export default ProposalStages;
