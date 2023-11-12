import React, { useState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { graphql } from 'gatsby';

import CoverLetter from '../templates/coverLetter';
import Detailed from '../templates/detailed';
import FreeText from '../templates/freeText';
import Header from '../templates/header';
import ItemList from '../templates/itemList';
import List from '../templates/list';
import Page from '../components/page';
import SideMenu from '../components/sideMenu';

import '../styles/styles.scss';
import { Helmet } from 'react-helmet';
import { isWindow } from '../utils/utils';

const IndexPage = ({ data }) => {
  library.add(fab, faEnvelope, faPhone, faGlobe);
  const {
    headerData,
    profileData,
    skillsData,
    experienceData,
    educationData,
    languageData,
    coverLetterData,
  } = data;
  const { firstname, lastname } = headerData.nodes[0].frontmatter;
  const anchor = isWindow() && window.location.hash.substring(1) === 'cl' ? 'cl' : 'cv';
  const [doc, setDoc] = useState(anchor);

  const handleDocChange = doc => {
    if (isWindow()) {
      window.location.hash = doc;
    }
    setDoc(doc);
  };

  return (
    <main>
      <Helmet>
        <title>
          {firstname} {lastname} - {doc === 'cv' ? 'Curriculum Vitae' : 'Cover Letter'}
        </title>
      </Helmet>

      <SideMenu selection={doc} docHandler={handleDocChange} />
      {doc === 'cv' && (
        <Page id="cv">
          <Header caption="top" data={headerData} />
          <FreeText caption="profile" data={profileData} />
          <ItemList caption="key skills" data={skillsData} />
          <Detailed caption="experience" data={experienceData} />
          <Detailed caption="education" data={educationData} dateFormat="yyyy" />
          <List caption="languages" data={languageData} inline />
          {/* <List caption="technical skills" data={skillsData} />
          <List caption="personal skills" data={personalSkillsData} />
          <Detailed caption="extracurricular activities" data={extracurricularData} />
          <List caption="interests & hobbies" data={interestsData} />
          <FreeText caption="publications" data={publicationsData} /> */}
          {/* <FreeText caption="training" data={trainingData} /> */}
        </Page>
      )}
      {doc === 'cl' && (
        <Page id="cl">
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
    # resume query fragments
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
    skillsData: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/skills.md/" } }) {
      nodes {
        ...itemListData
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
    languageData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/languages.md/" } }
    ) {
      nodes {
        ...listData
      }
    }
    technicalSkillsData: allMarkdownRemark(
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
    extracurricularData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/extracurricular.*.md/" } }
      sort: { frontmatter: { startDate: DESC } }
    ) {
      nodes {
        ...detailedData
      }
    }
    interestsData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/interests.md/" } }
    ) {
      nodes {
        ...listData
      }
    }

    # cover letter query fragments
    coverLetterData: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/cover-letter.md/" } }
    ) {
      nodes {
        ...coverLetterData
      }
    }
  }
`;
