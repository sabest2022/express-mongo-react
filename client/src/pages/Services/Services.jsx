import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Services.css'

// const Plan = ({ plan }) => {
//     return (
//         <div className="plan-container">
//             <h2>{plan.title}</h2>
//             <p>{plan.description}</p>
//             <p>Price: {plan.price}</p>
//             <p>Responsive: {plan.responsive ? 'Yes' : 'No'}</p>
//             <p>Pages: {plan.pages}</p>
//         </div>
//     );
// };
// const Services = () => {
//     const [plans, setPlans] = useState([]);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         const fetchPlans = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/plans'); // Adjust the URL to your backend endpoint
//                 setPlans(response.data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };

//         fetchPlans();
//     }, []);
//     return (
//         <div className="home">
//             <Header />
//             <main className="home-content">

//                 <h1>Our Plans</h1>
//                 {error && <p>There was an error fetching the plans: {error}</p>}
//                 <div className="plans-list">
//                     {plans.map(plan => (
//                         <Plan key={plan._id} plan={plan} />
//                     ))}
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );

// }

// export default Services;

import PlanCard from '../../components/PlanCard/PlanCard';
import { usePlanContext } from '../../context/PlanContext';

import "./services.css";

const PlanList = () => {

    const { plans } = usePlanContext();
    if (!plans || plans.length === 0) {
        return <div>Loading plans...</div>; // or some other placeholder
    }
    return (
        <div className="home">
            <Header />
            <div className="products-container">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan._id}
                        _id={plan._id}
                        title={plan.title}
                        pages={plan.pages}
                        responsive={plan.responsive}
                        price={plan.price}
                        description={plan.description}
                        image={plan.image}

                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};
//<ProductCard key={product._id} {...product} />
export default PlanList;

