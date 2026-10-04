import { Check } from "lucide-react";
import { Link } from "react-router-dom";

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "For getting started",
      features: [
        "Basic tools",
        "Limited usage",
        "Basic dashboard",
        "Tool history"
      ]
    },
    {
      name: "Pro",
      price: "₹499",
      description: "For active freelancers",
      features: [
        "All free tools",
        "Pro tools",
        "Higher limits",
        "Advanced history",
        "Priority processing"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "₹999",
      description: "For teams and professionals",
      features: [
        "Everything in Pro",
        "Team workspace",
        "Higher limits",
        "Priority support",
        "Advanced features"
      ]
    }
  ];

  return (
    <section className="section page-section">

      <div className="container">

        <div className="page-header center">
          <span className="section-badge">
            Pricing
          </span>

          <h1>Choose your WorkZone plan</h1>

          <p>
            Start free and upgrade when your workflow
            needs more power.
          </p>
        </div>

        <div className="pricing-grid">

          {plans.map((plan) => (

            <div
              className={`pricing-card ${
                plan.popular ? "popular" : ""
              }`}
              key={plan.name}
            >

              {plan.popular && (
                <span className="popular-badge">
                  Most Popular
                </span>
              )}

              <h3>{plan.name}</h3>

              <p>{plan.description}</p>

              <div className="price">
                {plan.price}
                {plan.name !== "Free" && (
                  <small>/month</small>
                )}
              </div>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`btn ${
                  plan.popular
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                Get Started
              </Link>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Pricing;
