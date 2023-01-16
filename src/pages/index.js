import React, { useState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { graphql } from 'gatsby';

import CoverLetter from '../templates/coverLetter';
import Detailed from '../templates/detailed';
import FreeText from '../templates/freeText';
import Header from '../templates/header';
import List from '../templates/list';
import Page from '../components/page';
import SideMenu from '../components/sideMenu';

import '../styles/styles.scss';
import { Helmet } from 'react-helmet';

const IndexPage = ({ data }) => {
  library.add(fab, faEnvelope, faPhone);
  const {
    headerData,
    profileData,
    experienceData,
    educationData,
    extracurricularData,
    languageData,
    skillsData,
    trainingData,
    personalSkillsData,
    interestsData,
    publicationsData,
    coverLetterData,
  } = data;
  const { firstname, lastname } = headerData.nodes[0].frontmatter;
  const [document, setDocument] = useState('cv');

  const handleDocumentChange = document => {
    setDocument(document);
  };

  return (
    <main>
      <Helmet>
        <title>
          {firstname} {lastname} - {document === 'cv' ? 'Curriculum Vitae' : 'Cover Letter'}
        </title>
      </Helmet>

      <SideMenu selection={document} documentHandler={handleDocumentChange} />
      {document === 'cv' && (
        <Page>
          <Header caption="Top" data={headerData} />
          <FreeText caption="Profile" data={profileData} />
          <Detailed caption="Experience" data={experienceData} />
          <Detailed caption="Education" data={educationData} dateFormat="yyyy" />
          <List caption="Languages" data={languageData} />
          <List caption="Technical skills" data={skillsData} />
          <List caption="Personal skills" data={personalSkillsData} />
          <FreeText caption="Training" data={trainingData} />
          <FreeText caption="Publications" data={publicationsData} />
          <Detailed caption="Extracurricular activities" data={extracurricularData} />
          <List caption="Interests & hobbies" data={interestsData} />
        </Page>
      )}
      {document === 'cl' && (
        <Page>
          <Header align="end" data={headerData} />
          <CoverLetter data={coverLetterData} />
        </Page>
      )}
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;

export const query = graphql`
  query cvQuery {
    headerData: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/header.md/" } }) {
      nodes {
        ...headerData
      }
    }
    profileData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/profile.md/" } }
    ) {
      nodes {
        ...freeTextData
      }
    }
    experienceData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/experience.*.md/" } }
      sort: { frontmatter: { startDate: DESC } }
    ) {
      nodes {
        ...detailedData
      }
    }
    educationData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/education.*.md/" } }
      sort: { frontmatter: { startDate: DESC } }
    ) {
      nodes {
        ...detailedData
      }
    }
    extracurricularData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/extracurricular.*.md/" } }
      sort: { frontmatter: { startDate: DESC } }
    ) {
      nodes {
        ...detailedData
      }
    }
    languageData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/languages.md/" } }
    ) {
      nodes {
        ...listData
      }
    }
    skillsData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/skills-tech.md/" } }
    ) {
      nodes {
        ...listData
      }
    }
    personalSkillsData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/skills-pers.md/" } }
    ) {
      nodes {
        ...listData
      }
    }
    interestsData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/interests.md/" } }
    ) {
      nodes {
        ...listData
      }
    }
    trainingData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/training.md/" } }
    ) {
      nodes {
        ...freeTextData
      }
    }
    publicationsData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications.md/" } }
    ) {
      nodes {
        ...freeTextData
      }
    }
    coverLetterData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/cover-letter.md/" } }
    ) {
      nodes {
        ...coverLetterData
      }
    }
  }
`;
