import styled from "@emotion/styled";

export const Logo = styled.div`
  margin-top: 2rem;
  text-align: center;
  img {
    width: 150px;
    height: auto;
  }
`;

export const InputBlock = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  .download {
    width: 333px;
    border: 1px solid #fab752;
    border-radius: 5px;
    background: #f29100;
    color: white;
    margin-left: 1rem;
    padding-top: 0.46rem;
    padding-bottom: 0.46rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    :hover {
      background: #ed9f2a;
      border: 1px soldid #e0921d;
      cursor: pointer;
    }
    :focus-visible {
      border: none;
      outline: none;
    }
  }
`;

export const Title = styled.div`
  text-align: center;
  font-size: 1.42rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

export const SubTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  padding-top: 2rem;
  padding-bottom: 1rem;
  text-align: center;
  font-style: italic;
`;

export const LabelInput = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin: 0.1rem 1rem;
  text-transform: uppercase;
`;

export const Input = styled.input`
  width: 600px;
  height: 2rem;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0 10px;
  margin: 0.1rem 1rem;
`;

export const Button = styled.button`
  /* width: 333px; */
  height: 2.2rem;
  border: 1px solid #fab752;
  border-radius: 5px;
  background: #f29100;
  color: white;
  margin: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  :hover {
    background: #ed9f2a;
    border: 1px soldid #e0921d;
    cursor: pointer;
  }
  :focus-visible {
    border: none;
    outline: none !important;
  }
`;
