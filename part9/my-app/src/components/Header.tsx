import React from 'react';

interface HeaderProps {
  nameForHeader: string;
}

const Header = ({ nameForHeader }: HeaderProps) => {
  return (
    <div>
      <h1>{nameForHeader}</h1>
    </div>
  );
};

export default Header;
