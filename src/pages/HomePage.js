function HomePage() {
    return <div>
        <h2>Welcome to Virtual Pet!</h2>
        <img src={require("../assets/FrontScreenPet.png")} alt={"Pet on Front Screen"}/>
        <p>Click <a href="/login">here</a> to login!</p>
    </div>
}

export default HomePage;