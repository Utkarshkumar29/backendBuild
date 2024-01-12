import styled from "styled-components";

export const DashboardContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`

export const UserCard = styled.div`
    width: 100%;
    height: 100vh;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-wrap: wrap;

    div{
        background-color: #f8f8f8;
        padding: 20px;
        text-align: center;
    }

    p {
        margin: 5px 0;
    }

    a {
        margin-top: auto;
        align-self: flex-end;
        display: inline-block;
        text-decoration: none;
        color: #007bff;
    }

    svg{
        padding-left: 10px;
    }

    a:hover {
        text-decoration: underline;
    }
`;