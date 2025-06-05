import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Text, Card, Link, Avatar, Divider } from '@geist-ui/react'
import styled from 'styled-components'

import withStyle from '../components/Layout'

import profilePic from '../../static/tim-image.png'
import resume from '../constants/resume'

const ResumeCard = styled(Card)`
  padding: 20px;
`

const Section = styled.div`
  margin: 20px 0;
`

const SkillCard = styled(Card)`
  margin: 5px;
  padding: 5px;
`

const Contact = ({ switchTheme }) => {
  return (
    <Grid fluid>
      <Row start="xs" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Col xs={11} md={8} lg={6}>
          <ResumeCard shadow>
            <Row start="xs">
              <Avatar src={profilePic} size="60px" />
            </Row>
            <Row start="xs">
              <Text h2>{resume.name}</Text>
            </Row>
            <Row start="xs">
              <Text h4>{resume.title}</Text>
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
              <Row start="xs">
                {resume.skills.map((skill, index) => (
                  <SkillCard key={index} shadow>
                    <Text small>{skill}</Text>
                  </SkillCard>
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
