/**
 * @description
 * @author lihao
 * @date 2024/12/11 19:21
 */
import styled from 'styled-components';

const Button = () => {
    return (
        <StyledWrapper>
            <button>
                <span>自定义标签</span>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    button {
        outline: none;
        cursor: pointer;
        border: none;
        padding: 0.9rem 2rem;
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        position: relative;
        display: inline-block;
        letter-spacing: 0.05rem;
        font-weight: 700;
        font-size: 17px;
        border-radius: 500px;
        overflow: hidden;
        background: #bbdefb;
        color: ghostwhite;
    }

    button span {
        position: relative;
        z-index: 9999;
        transition: color 0.4s;
    }

    button:hover span {
        color: black;
    }

    button::before,
    button::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    button::before {
        content: "";
        background: linear-gradient(to right, #00bfff, #1e90ff);;
        width: 120%;
        left: -10%;
        transform: skew(30deg);
        transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
    }

    button:hover::before {
        transform: translate3d(100%, 0, 0);
    }`;

export default Button;
