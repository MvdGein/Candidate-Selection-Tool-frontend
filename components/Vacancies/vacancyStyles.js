import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Vacancy = styled.section`
    width: 100%;
    padding: 10px;
    border-radius: 18px;
    margin: 0 auto 15px;
`;

export const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const Div = styled.div`
    width: 50%;
`;

export const DivRight = styled.div`
    width: 50%;
    display: grid;
    justify-items: right;
`;

export const Salary = styled.p`
    margin: 0;
    font-size: 24px;
`;

export const TagContainer = styled.div`
    display: flex;
    margin: 20px 20px 10px 20px;
    width: 250px;
    justify-content: space-around;
`;

export const Tag = styled.div`
    width: 120px;
    margin: 0 5px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    border: 1px solid black;
`;

export const Body = styled.p`
    margin: 10px 0;
`;

export const Footer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const Title = styled.h3`
    font-size: 24px;
    margin: 0;
`;

export const LinkStyled = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: ${(props) => props.color};
`;