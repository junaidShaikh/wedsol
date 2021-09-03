import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import FlexRowWrapper from 'components/common/wrappers/FlexRowWrapper';

import wedSolLogo from 'assets/logos/wedsol.png';

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 42px;

  background: #ffffff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.04);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  & > ${FlexRowWrapper} {
    width: 100%;
    height: 100%;

    align-items: center;
    justify-content: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
    }

    .wedsol-logo {
      width: 22px;
      height: 22px;
      margin-right: 13px;
    }

    p {
      font-family: 'Inter';
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0.505em;

      color: #000000;
    }
  }
`;

const Navbar = (): JSX.Element => {
  return (
    <NavbarWrapper>
      <FlexRowWrapper>
        <Link to="/">
          <img className="wedsol-logo" src={wedSolLogo} alt="CHAINWED" />
          <p>CHAINWED</p>
        </Link>
      </FlexRowWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
