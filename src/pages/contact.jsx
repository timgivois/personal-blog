import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Text, Card, Link, Avatar, Divider, Tag } from '@geist-ui/react'
import styled from 'styled-components'
import { SocialIcon } from 'react-social-icons'
import { Helmet } from 'react-helmet'

import withStyle from '../components/Layout'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import paths from '../utils/paths'

import profilePic from '../../static/tim-image.png'
import resume from '../constants/resume'

const ResumeCard = styled(Card)`
  padding: 20px;
`

const Section = styled.div`
  margin: 20px 0;
`

const Contact = ({ switchTheme }) => {
  const { site } = useStaticQuery(graphql`
    query ContactPageMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const siteMetadata = site?.siteMetadata ?? {}
  const canonical = siteMetadata.siteUrl
    ? `${siteMetadata.siteUrl.replace(/\/$/, '')}${paths.CONTACT}`
    : undefined

  return (
    <Grid fluid>
      <Helmet defer={false}>
        <title>{`${siteMetadata.title} | Contact`}</title>
        <meta
          name="description"
          content="Reach out to Tim Givois for collaborations, consulting, or questions about engineering leadership and product strategy."
        />
        {canonical ? <link rel="canonical" href={canonical} /> : null}
      </Helmet>
      <SpeedInsights />
      <Analytics />
      <Row center="xs" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Col xs={12} sm={10} md={8} lg={6}>
          <ResumeCard shadow>
            <Row center="xs">
              <Avatar src={profilePic} size="60px" />
            </Row>
            <Row center="xs">
              <Text h2>{resume.name}</Text>
            </Row>
            <Row center="xs">
              <Text h4>{resume.title}</Text>
            </Row>
            <Row center="xs" style={{ marginTop: '10px', gap: '5px' }}>
              <SocialIcon
                url="https://twitter.com/timgivois"
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url="https://github.com/timgivois"
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url="https://linkedin.com/in/timgivois"
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url="https://stackoverflow.com/users/6553617/tim-givois"
                style={{ height: 35, width: 35 }}
              />
            </Row>
            <Divider />
            <Section>
              <Row center="xs">
                <Text h4>Contact</Text>
              </Row>
              <Row center="xs">
                <div style={{ marginBottom: '8px', textAlign: 'center' }}>
                  <Text small>
                    Email:{' '}
                    <Link
                      href={`mailto:${resume.contact.email}`}
                      pure
                      underline
                    >
                      {resume.contact.email}
                    </Link>
                  </Text>
                </div>
              </Row>
              <Row center="xs">
                <div style={{ marginBottom: '8px', textAlign: 'center' }}>
                  <Text small>
                    Website:{' '}
                    <Link href={resume.contact.website} pure underline>
                      {resume.contact.website}
                    </Link>
                  </Text>
                </div>
              </Row>
            </Section>
            <Divider />
            <Section>
              <Text h4>Summary</Text>
              <Text>{resume.summary}</Text>
            </Section>
            <Divider />
            <Section>
              <Text h4>Experience</Text>
              {resume.experience.map((exp, index) => (
                <Card
                  key={index}
                  shadow
                  style={{ marginBottom: '15px', padding: '10px' }}
                >
                  <Row middle="xs" start="xs">
                    <Link href={exp.companyUrl} pure>
                      <img
                        alt={exp.company}
                        src={exp.logoUrl}
                        style={{
                          height: '60px',
                          width: '60px',
                          objectFit: 'contain',
                          marginRight: '10px',
                        }}
                      />
                    </Link>
                    <div style={{ textAlign: 'left' }}>
                      <Text h5 style={{ marginBottom: '5px' }}>
                        {exp.role}
                      </Text>
                      <Text small style={{ marginBottom: '5px' }}>
                        {exp.period}
                      </Text>
                      <Text
                        small
                        style={{ marginBottom: '5px', marginLeft: '5px' }}
                      >
                        ({exp.duration})
                      </Text>
                      <div>
                        <Text small style={{ marginBottom: '5px' }}>
                          {exp.company}
                        </Text>
                      </div>
                    </div>
                  </Row>
                  <ul
                    style={{
                      marginLeft: '20px',
                      textAlign: 'left',
                      marginTop: '15px',
                    }}
                  >
                    {exp.details.map((d, i) => (
                      <li key={i}>
                        <Text small>{d}</Text>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </Section>
            <Divider />
            <Section>
              <Text h4>Education</Text>
              {resume.education.map((ed, index) => (
                <Card
                  key={index}
                  shadow
                  style={{ marginBottom: '15px', padding: '10px' }}
                >
                  <Row middle="xs" start="xs">
                    {ed.logoUrl && (
                      <Link href={ed.institutionUrl} pure>
                        <img
                          alt={ed.institution}
                          src={ed.logoUrl}
                          style={{
                            height: '60px',
                            width: '60px',
                            objectFit: 'contain',
                            marginRight: '10px',
                          }}
                        />
                      </Link>
                    )}
                    <div style={{ textAlign: 'left' }}>
                      <Text h5>{ed.institution}</Text>
                      <Text small>{ed.degree}</Text>
                      <Text small>{ed.period}</Text>
                    </div>
                  </Row>
                </Card>
              ))}
            </Section>
            <Divider />
            <Section>
              <Text h4>Skills</Text>
              <Row start="xs">
                {resume.skills.map((skill, index) => (
                  <Tag
                    key={index}
                    type="lite"
                    style={{ margin: '0 5px 5px 0' }}
                  >
                    {skill}
                  </Tag>
                ))}
              </Row>
            </Section>
          </ResumeCard>
        </Col>
      </Row>
    </Grid>
  )
}

export default withStyle(Contact)
