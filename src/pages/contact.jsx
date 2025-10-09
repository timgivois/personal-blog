import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Text, Card, Link, Avatar, Divider } from '@geist-ui/react'
import styled from 'styled-components'

import withStyle from '../components/Layout'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

import profilePic from '../../static/tim-image.png'
import resume from '../constants/resume'

const PageGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 40px 16px;

  @media (max-width: 600px) {
    padding: 24px 12px;
  }
`

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const ResumeCard = styled(Card)`
  padding: 20px;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 16px;
  }
`

const Section = styled.div`
  margin: 20px 0;
`

const SkillCard = styled(Card)`
  margin: 0;
  padding: 6px 12px;
  text-align: center;
  flex: 0 1 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
  }
`

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`

const Contact = ({ switchTheme }) => {
  return (
    <PageGrid fluid>
      <SpeedInsights />
      <Analytics />
      <Row center="xs" style={{ marginTop: '30px', marginBottom: '30px', width: '100%' }}>
        <Col xs={12} sm={10} md={8} lg={6}>
          <CardContainer>
            <ResumeCard shadow>
              <Row center="xs">
                <Avatar src={profilePic} size="60px" />
              </Row>
              <Row center="xs">
                <Text h2 style={{ textAlign: 'center' }}>{resume.name}</Text>
              </Row>
              <Row center="xs">
                <Text h4 style={{ textAlign: 'center' }}>{resume.title}</Text>
              </Row>
              <Divider />
              <Section>
                <Text h4>Contact</Text>
                <div style={{ marginBottom: '8px' }}>
                  <Text small>
                    Email:{' '}
                    <Link href={`mailto:${resume.contact.email}`} pure underline>
                      {resume.contact.email}
                    </Link>
                  </Text>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text small>Phone: {resume.contact.phone}</Text>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text small>Location: {resume.contact.location}</Text>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <Text small>
                    Website:{' '}
                    <Link href={resume.contact.website} pure underline>
                      {resume.contact.website}
                    </Link>
                  </Text>
                </div>
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
                          style={{ height: '60px', marginRight: '10px' }}
                        />
                      </Link>
                      <Text h5>
                        {exp.role} - {exp.company}
                      </Text>
                    </Row>
                    <Text small>
                      {exp.period} ({exp.duration})
                    </Text>
                    <ul style={{ marginLeft: '20px' }}>
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
                            style={{ height: '60px', marginRight: '10px' }}
                          />
                        </Link>
                      )}
                      <Text h5>{ed.institution}</Text>
                    </Row>
                    <Text small>{ed.degree}</Text>
                    <Text small>{ed.period}</Text>
                  </Card>
                ))}
              </Section>
              <Divider />
              <Section>
                <Text h4>Skills</Text>
                <SkillList>
                  {resume.skills.map((skill, index) => (
                    <SkillCard key={index} shadow>
                      <Text small>{skill}</Text>
                    </SkillCard>
                  ))}
                </SkillList>
              </Section>
            </ResumeCard>
          </CardContainer>
        </Col>
      </Row>
    </PageGrid>
  )
}

export default withStyle(Contact)
