import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Text, Card, Link, Avatar, Divider } from '@geist-ui/react'
import styled from 'styled-components'

import { Topbar } from '../components'
import withStyle from '../components/Layout'

import profilePic from '../../static/tim-image.png'

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
  const resume = {
    name: 'Timothee Givois Mendez',
    title: 'Senior Software Engineer',
    summary:
      'Senior Software Engineer with 10 years of experience building frontend and backend systems. Proven ability to lead cross-functional teams, launch 0-to-1 products, and modernize legacy platforms.',
    contact: {
      email: 'tim.givois.mendez@gmail.com',
      phone: '+1 305 501 9895',
      location: 'Miami, FL',
      website: 'https://timgivois.me',
    },
    experience: [
      {
        company: 'Airbnb',
        role: 'Senior Software Engineer, Marketing Technology',
        period: '2021 \u2013 Present',
        details: [
          'Led 0-to-1 product development of renewed marketing tools improving user engagement and driving ~$XXM in conversions in year one.',
          'Designed and implemented a global localization system for marketing campaigns; used by 60% of launches.',
          'Introduced frontend instrumentation and automated regression detection to improve visibility into performance, reliability, and user behavior.',
          'Mentored 4 engineers and aligned cross-functional stakeholders across teams.',
        ],
      },
      {
        company: 'Carta',
        role: 'Software Engineer, Valuations and Compensation',
        period: '2020 \u2013 2021',
        details: [
          'Led backend and frontend implementation of new compensation product, acquiring $X M in ARR within 3 months.',
          'Migrated core valuation workflows to React, improving UI responsiveness and reducing valuation request time by 50%.',
        ],
      },
      {
        company: 'Wizeline',
        role: 'Senior Software Engineer, Services',
        period: '2017 \u2013 2019',
        details: [
          'Built scalable web applications using TypeScript, React, and GraphQL for multiple client projects.',
          'Recruited and mentored junior engineers and interns, contributing to a stronger engineering culture.',
        ],
      },
      {
        company: 'Rappi',
        role: 'Backend Engineer, Payments',
        period: '2017',
        details: [
          'Reduced payment fraud rate from 18% to 5% using data-driven fraud detection systems.',
        ],
      },
      {
        company: 'Sertech Consulting Group',
        role: 'Backend Engineer, Data',
        period: '2015 \u2013 2017',
        details: [
          'Developed 10+ microservices and built a data pipeline processing 1M+ daily records.',
        ],
      },
      {
        company: 'Intelimetrica',
        role: 'Junior Software Engineer, Data',
        period: '2014 \u2013 2015',
        details: [
          'Built a cloud-based data pipeline (500k+ records/day) using Python and AWS services.',
        ],
      },
    ],
    education: [
      {
        institution: 'Mexico Autonomous Institute of Technology (ITAM)',
        degree: 'M.Sc. in Computer Science. GPA: 9/10',
        period: 'Aug. 2016 \u2013 Dec. 2018',
      },
      {
        institution:
          'Monterrey Institute of Technology and Higher Education (ITESM)',
        degree: 'B.S. in Electronic and Computer Engineering. GPA: 92/100',
        period: 'Jan. 2011 \u2013 Dec. 2015',
      },
    ],
    skills: [
      'Python',
      'Flask',
      'Django',
      'JavaScript',
      'Node.js',
      'React',
      'GraphQL',
      'PHP',
      'Laravel',
      'Java',
      'MySQL',
      'PostgreSQL',
      'AuroraDB',
      'MongoDB',
      'Redis',
      'DynamoDB',
      'AWS',
      'Kubernetes',
      'Docker',
      'Git',
      'Jest',
      'Styled-components',
    ],
  }

  return (
    <Grid fluid>
      <Topbar switchTheme={switchTheme} />
      <Row center="xs" style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Col xs={11} md={8} lg={6}>
          <ResumeCard shadow>
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
            <Section>
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
                  <Text h5>
                    {exp.role} - {exp.company}
                  </Text>
                  <Text small>{exp.period}</Text>
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
                  <Text h5>{ed.institution}</Text>
                  <Text small>{ed.degree}</Text>
                  <Text small>{ed.period}</Text>
                </Card>
              ))}
            </Section>
            <Divider />
            <Section>
              <Text h4>Skills</Text>
              <Row center="xs">
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
