import IsAuthenticated from "../providers/isAuthenticated";

const WelcomePage: React.FC = () => {
    return (
        <IsAuthenticated>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">Welcome to Bookings</h1>
                <p className="text-lg text-gray-600">This page is comming soon!</p>
            </div>
        </IsAuthenticated>
    );
};

export default WelcomePage;