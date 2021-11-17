import styled from "@emotion/styled";

export const InputBlock = styled.div`
  display: grid;
  justify-content: center;
  .download {
    width: 333px;
    border: 1px solid navy;
    border-radius: 5px;
    background: darkcyan;
    color: white;
    margin-left: 1rem;
    padding-top: 0.46rem;
    padding-bottom: 0.46rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    :hover {
      background: teal;
      border: 1px sold grey;
      cursor: pointer;
    }
  }
`;

export const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 3rem;
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
  width: 333px;
  height: 2.2rem;
  border: 1px solid navy;
  border-radius: 5px;
  background: darkcyan;
  color: white;
  margin: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  :hover {
    background: teal;
    border: 1px sold grey;
    cursor: pointer;
  }
`;
