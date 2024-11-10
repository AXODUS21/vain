import React from "react";
import styled from "styled-components";

const Paper = ({content}) => {


  return (
    <StyledWrapper style={{width: 'max-content'}}>
      <div className="papper">
        {content}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .papper {
    position: relative; 
    box-sizing: border-box;
    width: 300px;
    height: 250px;
    background: #ffffff;
    background-image: linear-gradient(#ffffff 1.1rem, #ccc 1.2rem);
    background-size: 100% 1.2rem;
    border-radius: 10px;
    cursor: text;
    padding:5px;
    border:2px solid;

  }

`;

export default Paper;
