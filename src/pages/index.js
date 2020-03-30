import React from 'react'
import { graphql } from 'gatsby'
import { Text, Link } from '@zeit-ui/react'
import { Col, Row } from 'react-flexbox-grid';

import { Avatar, Topbar } from '../components'
import withStyle from '../components/Layout'
import { Wrapper, StyledSocialMediaIconsReact } from '../utils/style'
import paths from '../utils/paths'
import profileImg from '../../static/tim-image.png'

const Landing = ({ data, switchTheme }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <>
      <Wrapper middle='md'>
        <Col xs={12} lg={3}>
          <Row center='xs'>
            <Avatar
              src={profileImg}
              size={220}
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
              <Link href={paths.ABOUT} pure underline>About</Link>  |  <Link href='mailto:tim.givois.mendez@gmail.com' pure underline>Contact</Link>
            </Text>

          </Row>
        </Col>
      </Wrapper>
      <Row>
        <Col xs={12}>
          <Topbar switchTheme={switchTheme} />
        </Col>
      </Row>
    </>

  )
}

export const query = graphql`
query HomePageQuery {
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date]}
  ) {
    edges {
      node {
        frontmatter {
          title
          path
        }
      }
    }
  }
}
`

export default withStyle(Landing);
