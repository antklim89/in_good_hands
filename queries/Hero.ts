const gql = (a: TemplateStringsArray) => a[0];

export const HeroQuery = gql`
  query Hero {
    hero {
      data {
        attributes {
          body
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
