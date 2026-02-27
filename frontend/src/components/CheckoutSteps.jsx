import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center items-center space-x-4 mb-8">
      {[
        { name: 'Sign In', link: '/login', status: step1 },
        { name: 'Shipping', link: '/shipping', status: step2 },
        { name: 'Payment', link: '/payment', status: step3 },
        { name: 'Place Order', link: '/placeorder', status: step4 },
      ].map((step, index) => (
        <div key={index} className="flex items-center">
          {step.status ? (
            <Link to={step.link} className="text-blue-600 font-bold text-sm md:text-base">
              {step.name}
            </Link>
          ) : (
            <span className="text-slate-300 font-medium text-sm md:text-base cursor-not-allowed">
              {step.name}
            </span>
          )}
          {index < 3 && <div className="mx-4 text-slate-300 font-light">/</div>}
        </div>
      ))}
    </nav>
  );
};

export default CheckoutSteps;