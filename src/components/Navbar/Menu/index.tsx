import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import { Links } from '../navLinks';
import { NavLink, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Burger from '../Burger';
import Grid from 'styled-components-grid';
import { useClickAway } from 'react-use';
import { NavLogo, Button } from '../styles';
import Logo from '../logo.png';
import { setAccessToken } from '../../../accessToken';
import { useLogoutMutation } from '../../../generated/graphql';
import useAuth from '../../../context/authentication/useAuth';

interface StyledMenuProps {
  open?: Boolean;
  children: ReactElement | null;
}

const StyledMenu = styled.div<StyledMenuProps>`
  z-index: 10;
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.secondaryColor};
  transform: ${({ open }) => (open ? 'translateX(50px)' : 'translateX(-100%)')};
  height: 100vh;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  border-right: solid 1px ${p => p.theme.white};
  padding: 5rem 3rem;
  position: fixed;
  top: 0;
  left: -50px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
    border-right: none;
  }
`;

interface Props {
  open: boolean;
  links: Links[];
  setOpen: Function;
}

export const List = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 0 auto;
`;

export const ListItem = styled.li`
  width: 100%;
  margin-bottom: 25px;
`;

export const Link = styled(NavLink)`
  color: ${p => p.theme.white};
  text-decoration: none;
  &:hover {
    color: ${p => p.theme.primaryColor};
  }
`;

const Menu: React.FC<RouteComponentProps & Props> = ({
  open,
  links,
  setOpen,
  history: { push }
}) => {
  const ref = useRef(null);
  const [logout, { client }] = useLogoutMutation();
  const { isAuthenticated, updateAuth } = useAuth();

  useClickAway(ref, () => {
    if (open) setOpen(false);
  });

  const onLinkClick = () => setOpen(false);
  return (
    <StyledMenu open={open} ref={ref}>
      <Grid>
        <Grid.Unit visible={{ xs: true, sm: false }}>
          <Burger open={open} setOpen={setOpen} />
        </Grid.Unit>
        <List>
          <NavLogo>
            <img
              src={Logo}
              alt='Timesly.io Logo'
              style={{
                maxHeight: '70px',
                marginBottom: '25px',
                paddingBottom: '25px',
                borderBottom: '2px solid #FFF'
              }}
            />
          </NavLogo>
          {links.map(({ text, path }) => (
            <ListItem key={path}>
              <Link to={path} onClick={onLinkClick}>
                {text}
              </Link>
            </ListItem>
          ))}
          {isAuthenticated ? (
            <ListItem>
              <Button
                onClick={async () => {
                  await logout();
                  setAccessToken('');
                  // await client!.resetStore();
                  updateAuth(false);
                  push('/');
                  setOpen(false);
                }}
              >
                Logout
              </Button>
            </ListItem>
          ) : (
            <ListItem>
              <Button
                onClick={() => {
                  push('/sign-up');
                  setOpen(false);
                }}
              >
                Sign Up
              </Button>
            </ListItem>
          )}
        </List>
      </Grid>
    </StyledMenu>
  );
};

export default withRouter(Menu);
