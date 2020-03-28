import React from 'react';
import { Wrapper } from '../../styles/PageStyles';
import styled from 'styled-components';
import Grid from 'styled-components-grid';
import Logo from './logo.png';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  width: 100%;
  background: ${p => p.theme.secondaryColor};
`;

const FooterContainer = styled.div`
  margin: 10px;
  color: ${p => p.theme.white};
`;

const Col = styled(Grid.Unit)`
  padding: 0 50px;
  ${p =>
    p.centertext &&
    `
    text-align: center;
  `}
  @media only screen and (max-width: 991px) {
    text-align: center;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li``;

const StyledLink = styled(Link)`
  color: ${p => p.theme.paleGreyColor};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Wrapper>
        <FooterContainer>
          <Grid>
            <Col
              centertext='true'
              size={{ xs: 1, sm: 1 / 2, md: 1 / 2, lg: 1 / 4 }}
            >
              <img
                src={Logo}
                alt='Timesly.io Logo'
                style={{ maxWidth: '50%', margin: '0 auto' }}
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis pariatur ex nostrum saepe.
              </p>
            </Col>
            <Col size={{ xs: 1, sm: 1 / 2, md: 1 / 2, lg: 1 / 4 }}>
              <h3>Title</h3>
              <List>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
              </List>
            </Col>
            <Col size={{ xs: 1, sm: 1 / 2, md: 1 / 2, lg: 1 / 4 }}>
              <h3>Title</h3>
              <List>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
              </List>
            </Col>{' '}
            <Col size={{ xs: 1, sm: 1 / 2, md: 1 / 2, lg: 1 / 4 }}>
              <h3>Title</h3>
              <List>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
                <Item>
                  <StyledLink to='/'>Home</StyledLink>
                </Item>
              </List>
            </Col>
          </Grid>
        </FooterContainer>
      </Wrapper>
    </StyledFooter>
  );
};
