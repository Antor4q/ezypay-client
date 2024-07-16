import useProvider from "../../hooks/useProvider";


const Dashboard = () => {
    const {user} = useProvider()
    console.log(user)
    return (
        <div className="lg:max-w-[1620px] lg:min-h-screen mx-auto flex ">
           <div className="w-2/6  bg-gray-900 ">
                
           </div>
           <div className="w-4/6 border-8 p-10">

           </div>
        </div>
    );
};

export default Dashboard;