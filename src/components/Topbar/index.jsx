import React, { useEffect } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import Toggle from 'react-toggle'
import { useTheme, Text, Link } from '@zeit-ui/react'

import profileImg from '../../../static/tim-image.png'
import Logo from '../Logo'
import Emoji from '../Emoji'
import Avatar from '../Avatar'
import { Wrapper, BarWrapper, StyledSocialMediaIconsReact } from './style'
import paths from '../../utils/paths'
import './style.css'


const Topbar = ({ switchTheme, isMainPage }) => {
  const theme = useTheme();

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const sticky = navbar.offsetTop;
    const height = navbar.offsetHeight;

    const addStickyToNavBar = () => {
      if (window.pageYOffset >= sticky + navbar.offsetHeight) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
    addStickyToNavBar()

    window.onscroll = function() {addStickyToNavBar()};
  })


  return (
    <>
    {
      isMainPage ? (
        <Wrapper middle='md'>
          <Col xs={12} lg={3}>
            <Row center='xs'>
              <Avatar
                src={profileImg}
                size={180}
                />
            </Row>
            <Row center='xs' align='center'>
              <Text>Tim Givois – Software Engineer</Text>
            </Row>
            <Row center='xs' align='center'>
              <StyledSocialMediaIconsReact
                borderColor="rgba(0,0,0,0.25)"
                borderWidth="0"
                borderStyle="solid"
                icon="twitter"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(28,186,223,1)"
                iconSize="4"
                roundness="50%"
                url="https://twitter.com/timgivois"
                size="25"
              />
              •
              <StyledSocialMediaIconsReact
                borderColor="rgba(0,0,0,0.25)"
                borderWidth="0"
                borderStyle="solid"
                icon="github"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="rgba(0,0,0,1)"
                iconSize="4"
                roundness="50%"
                url="https://github.com/timgivois"
                size="25"
              />
            •
              <StyledSocialMediaIconsReact
                borderColor="rgba(0,0,0,0.25)"
                borderWidth="0"
                borderStyle="solid"
                icon="linkedin"
                iconColor="rgba(255,255,255,1)"
                backgroundColor="#0e76a8"
                iconSize="4"
                roundness="50%"
                url="https://linkedin.com/in/timgivois"
                size="25"
              />
            </Row>

          </Col>
          <Col xs={12} lg={9} style={{padding: '0 30px', borderLeft: '1px solid'}}>
            <Row center='xs' start='lg'>
              <Text h2>Hey! Welcome to my blog.</Text>
            </Row>
            <Row center='xs' start='lg' style={{marginTop: '25px'}}>
              <Text h4>I believe in the Wisdom of the crowds, that's why I created this small spot to share a bit of what I learnt.</Text>
              <Text h4>The blog doesn't have a topic, but I mainly write about software (React and stuff).</Text>
            </Row>
            <Row center='xs'>
              <Text>
                <Link href={paths.ROOT} pure underline>About</Link>  |  <Link href='mailto:tim.givois.mendez@gmail.com' pure underline>Contact</Link>
              </Text>

            </Row>
          </Col>
        </Wrapper>
      ) : null
    }
      <BarWrapper id='navbar' type={theme.type} between='xs' middle='xs' center='xs'>
        <Col xs={5} md={3}>
          <Logo />
        </Col>
        <Col xs={5} md={3}>
          <Toggle
            className='change-mode'
            icons={{
              checked: <Emoji style={{ marginLeft: '-3px' }} symbol='🌙' />,
              unchecked: <Emoji style={{ marginLeft: '-3px' }} symbol='☀️' />,
            }}
            onChange={e => {
              const nextTheme = e.target.checked ? 'dark' : 'light'
              switchTheme(nextTheme)
            }}
          />
        </Col>
      </BarWrapper>

    </>)
}

Topbar.defaultProps = {
  isMainPage: false,
  switchTheme: () => {},
}
export default Topbar
