import styled from 'styled-components'

export const RegisterContainer=styled.div`
    max-width: 2600px;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const RegisterWrapper=styled.div`
    height: 100%;
    width: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const RegisterForm=styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    align-items: center;

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
        color: #333;
    }
`

export const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
`

export const FileInput = styled.input`
    margin: 10px 0;
`

export const Button = styled.button`
    margin: 15px 0;
    padding: 12px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #45a049;
    }
`

export const LinkText = styled.div`
    margin-top: 10px;
    text-align: center;
    font-size: 14px;

    a {
        color: #007bff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`