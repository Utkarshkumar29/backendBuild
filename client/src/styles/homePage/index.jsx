import styled from "styled-components";

export const UserInfo = styled.div`
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const UserName = styled.p`
    font-size: 24px;
    margin-bottom: 10px;
`

export const UserDetail = styled.p`
    font-size: 16px;
    margin-bottom: 8px;
`

export const UserImage = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 20px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
`

export const ActionIcons = styled.div`
    display: flex;
    align-items: center;

    svg {
        font-size: 20px;
        margin-right: 10px;
        cursor: pointer;
        color: #333;

        &:hover {
            color: #007bff;
        }
    }
`

export const ErrorContainer = styled.div`
    color: #ff0000;
    margin-top: 10px;
`