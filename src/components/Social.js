import styled from "@emotion/styled";

export const SocialSection = styled.div`
  margin-top: 10%;
  display: grid;
  justify-content: center;
  align-content: center;
  ul,
  li {
    display: inline;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  img {
    width: 50px;
    height: auto;
  }
`;

const Social = () => {
  return (
    <SocialSection>
      <ul>
        <li>
          <a
            href="https://www.facebook.com/bobbleliquide/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://res.cloudinary.com/dagmffgu0/image/upload/v1637872230/assets/facebook_epgnzf.png"
              alt="facebook"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/bobbleliquide/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{ paddingLeft: "20px" }}
              src="https://res.cloudinary.com/dagmffgu0/image/upload/v1637872230/assets/instagram_sftebq.png"
              alt="instagram"
            />
          </a>
        </li>
      </ul>
      <div style={{ textAlign: "center", fontWeight: 600, paddingTop: "1rem" }}>
        www.bobblemix.com
      </div>
    </SocialSection>
  );
};
export default Social;
