import { memo } from "react";
import './some-sass.scss';

const Todos = ({ todos }) => {
    console.log("child render");
    const todoStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Sans-Serif"
    }
    return (
        <>
            <h2>My Todos</h2>
            {todos.map((todo, index) => {
                return <p style={todoStyle} key={index}>{todo}</p>;
            })}
        </>
    );
};

export default memo(Todos);