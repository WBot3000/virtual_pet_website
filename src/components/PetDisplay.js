function PetDisplay() {

    const data = {id: 1, user: "AwesomeMan", pet: {name: "Sample Pet", desc: "This is a sample description!"}};

    return <div className="pet_page">
        <h2>{data.user}</h2>
        <h3>{data.pet.name}</h3>
        <img src={require("../assets/lilcat.png")} alt={data.pet.name} className="pet_page_images"/>
        <p>{data.pet.desc}</p>
    </div>
}

export default PetDisplay;