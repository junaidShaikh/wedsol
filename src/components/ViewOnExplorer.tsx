import * as React from 'react';
import styled from 'styled-components/macro';

import { ReactComponent as Solana } from 'assets/logos/solana.svg';

const ViewOnExplorerWrapper = styled.a`
  text-decoration: none;
  width: 100%;
  height: 50px;

  display: grid;
  place-items: center;
  position: relative;
  cursor: pointer;

  border: 1px solid #000000;
  border-radius: 54px;

  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.085em;

  color: #000000;

  svg {
    position: absolute;
    width: 28px;
    height: 24px;
    left: 28px;
  }
`;

const ViewOnExplorer = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element => {
  return (
    <ViewOnExplorerWrapper {...props}>
      <Solana />
      View on Explorer
    </ViewOnExplorerWrapper>
  );
};

export default ViewOnExplorer;
