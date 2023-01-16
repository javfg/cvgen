exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Contact {
      value: String!
      url: String!
      icon: String!
    }
    type Address {
      recipient: String
      date: Date
      business: String
      address: [String]
    }
    type Entry {
      title: String!
      content: String!
    }
    type Frontmatter implements Node @dontInfer{
      firstname: String
      lastname: String
      titles: [String!]
      address: Address
      contact: [Contact!]
      title: String!
      subtitle: String!
      location: String
      startDate: Date @dateformat(formatString: "") # Somehow this is needed for dates to be parsed properly
      endDate: Date @dateformat(formatString: "")
      subject: String
      ps: [String]
      entries: [Entry!]
      dateFormat: String
    }
  `;
  createTypes(typeDefs);
};
