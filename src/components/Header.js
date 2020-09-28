import React from 'react';


const Header = ({titulo}) => {
    return (
        <header className="bg-alert mt-4">
            <h1>{titulo}</h1>
        </header>
    );
}
 
export default Header;