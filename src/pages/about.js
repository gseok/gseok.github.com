import React from 'react';
import { graphql } from 'gatsby';
import { Row, Col } from 'antd';

import Layout from '../layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import TimeLineSection from '../components/about-sections/timeline-section';
import CareerSection from '../components/about-sections/career-section';
import TechSkillSection from '../components/about-sections/techskill-section';
import TechPPTSection from '../components/about-sections/techppt-section';

// import TimeStampSection from '../components/timestamp-section';
// import ProjectSection from '../components/project-section';
import './style.scss';
import './antd.min.css';

function AboutPage({ data }) {
  const metaData = data.site.siteMetadata;
  const { author, language } = metaData;
  // const { timestamps, projects } = about;
  return (
    <Layout className="about">
      <Seo title="About" />
      <Bio author={author} language={language} />

      <Row className="my-ant-row">
        <Col span={24}>
          <TimeLineSection />
        </Col>
      </Row>
      <Row className="my-ant-row">
        <Col span={24}>
          <CareerSection />
        </Col>
      </Row>
      <Row className="my-ant-row">
        <Col span={24}>
          <TechSkillSection />
        </Col>
      </Row>
      <Row className="my-ant-row">
        <Col span={24}>
          <TechPPTSection />
        </Col>
      </Row>

      {/* <TimeStampSection timestamps={timestamps} />
      <ProjectSection projects={projects} /> */}
    </Layout>
  );
}

export default AboutPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        language
        author {
          name
          bio {
            role
            description
            thumbnail
            gravata
          }
          social {
            github
            linkedIn
            email
            person
          }
        }

        about {
          timestamps {
            date
            activity
            links {
              post
              github
              demo
              googlePlay
              appStore
            }
          }

          projects {
            title
            description
            techStack
            thumbnailUrl
            links {
              post
              github
              demo
              googlePlay
              appStore
            }
          }
        }
      }
    }
  }
`;
