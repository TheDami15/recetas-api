import React from 'react';

const AllergenFilter = ({ commonAllergens, selectedAllergens, handleAllergenChange }) => {
  return (
    <>
      {commonAllergens.map(allergen => (
        <div key={allergen}>
          <input
            type="checkbox"
            id={allergen}
            value={allergen}
            onChange={handleAllergenChange}
            checked={selectedAllergens.includes(allergen)}
          />
          <label htmlFor={allergen}>{allergen}</label>
        </div>
      ))}
    </>
  );
};

export default AllergenFilter;
