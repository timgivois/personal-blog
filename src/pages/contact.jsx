import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Text, Card, Link, Avatar, Divider } from '@geist-ui/react'

import { Topbar } from '../components'
import withStyle from '../components/Layout'

import profilePic from '../../static/tim-image.png'

const Contact = ({ switchTheme }) => {
  const resume = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    summary:
      'Experienced developer with a focus on building modern web applications.',
    contact: {
      email: 'john.doe@example.com',
      phone: '+1 234 567 890',
      location: 'San Francisco, CA',
      website: 'https://example.com',
    },
    experience: [
      {
        company: 'ABC Corp',
        role: 'Senior Engineer',
        period: '2019 - Present',
        details: ['Lead the front-end team', 'Implemented CI/CD pipelines'],
      },
      {
        company: 'XYZ Inc',
        role: 'Software Engineer',
        period: '2016 - 2019',
        details: ['Developed internal tools', 'Maintained legacy systems'],
      },
    ],
    education: [
      {
        institution: 'University of Example',
        degree: 'B.Sc Computer Science',
        period: '2012 - 2016',
      },
    ],
    skills: ['React', 'Node.js', 'GraphQL', 'AWS'],
  }

  return (
    <Grid fluid>
      <Topbar switchTheme={switchTheme} />
      <Row center="xs" style={{ marginTop: '20px' }}>
        <Col xs={12} md={8} lg={6}>
          <Card shadow>
            <Row center="xs">
              <Avatar src={profilePic} size="80px" />
            </Row>
            <Row center="xs">
              <Text h2>{resume.name}</Text>
            </Row>
            <Row center="xs">
              <Text h4>{resume.title}</Text>
            </Row>
            <Divider />
            <Row>
              <Col xs={12}>
                <Text h4>Contact</Text>
                <Text small>
                  Email:{' '}
                  <Link href={`mailto:${resume.contact.email}`} pure underline>
                    {resume.contact.email}
                  </Link>
                </Text>
                <Text small>Phone: {resume.contact.phone}</Text>
                <Text small>Location: {resume.contact.location}</Text>
                <Text small>
                  Website:{' '}
                  <Link href={resume.contact.website} pure underline>
                    {resume.contact.website}
                  </Link>
                </Text>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={12}>
                <Text h4>Summary</Text>
                <Text>{resume.summary}</Text>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={12}>
                <Text h4>Experience</Text>
                {resume.experience.map((exp, index) => (
                  <div key={index}>
                    <Text h5>
                      {exp.role} - {exp.company}
                    </Text>
                    <Text small>{exp.period}</Text>
                    <ul>
                      {exp.details.map((d, i) => (
                        <li key={i}>
                          <Text small>{d}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={12}>
                <Text h4>Education</Text>
                {resume.education.map((ed, index) => (
                  <div key={index}>
                    <Text h5>{ed.institution}</Text>
                    <Text small>{ed.degree}</Text>
                    <Text small>{ed.period}</Text>
                  </div>
                ))}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={12}>
                <Text h4>Skills</Text>
                <Row>
                  {resume.skills.map((skill, index) => (
                    <Card
                      key={index}
                      shadow
                      style={{ margin: '5px', padding: '5px' }}
                    >
                      <Text small>{skill}</Text>
                    </Card>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Grid>
  )
}

export default withStyle(Contact)
