import { useState } from "react";

const MyComponent = () => {
  // Dummy data for celebrity pets
  const celebrityPets = [
    {
      id: 1,
      petName: "Olivia Benson",
      petOwner: "Taylor Swift",
      petLocation: "Los Angeles, USA",
      breed: "Scottish Fold",
      image: "https://example.com/olivia.jpg",
      description: "A cute Scottish Fold cat, famous for appearing in ads and music videos.",
    },
    {
      id: 2,
      petName: "Tuna",
      petOwner: "Paris Hilton",
      petLocation: "Beverly Hills, USA",
      breed: "Chihuahua",
      image: "https://example.com/tuna.jpg",
      description: "A tiny Chihuahua with an adorable overbite, loved by Paris Hilton.",
    },
    {
      id: 3,
      petName: "Lord Chesterfield",
      petOwner: "Jennifer Aniston",
      petLocation: "New York, USA",
      breed: "Golden Retriever",
      image: "https://example.com/chesterfield.jpg",
      description: "A playful Golden Retriever often seen on Jennifer's Instagram.",
    },
    {
      id: 4,
      petName: "Daisy",
      petOwner: "Katy Perry",
      petLocation: "Malibu, USA",
      breed: "Poodle",
      image: "https://example.com/daisy.jpg",
      description: "A charming Poodle that enjoys luxurious pet spas.",
    },
    {
      id: 5,
      petName: "Neville",
      petOwner: "Marc Jacobs",
      petLocation: "Paris, France",
      breed: "Bull Terrier",
      image: "https://example.com/neville.jpg",
      description: "A stylish Bull Terrier known for modeling in fashion campaigns.",
    },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <h2>Celebrity Pet List</h2>
      <p>Explore famous pets and their details!</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        {celebrityPets.map((pet) => (
          <div 
            key={pet.id} 
            style={{
              width: "250px",
              padding: "15px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              textAlign: "left",
            }}
          >
            <img src={pet.image} alt={pet.petName} style={{ width: "100%", borderRadius: "10px" }} />
            <h3>{pet.petName}</h3>
            <p><strong>Owner:</strong> {pet.petOwner}</p>
            <p><strong>Location:</strong> {pet.petLocation}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p>{pet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
