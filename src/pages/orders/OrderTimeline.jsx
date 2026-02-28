const steps = ["CREATED", "CONFIRMED", "SHIPPED", "DELIVERED"];

export default function OrderTimeline({ status }) {
  const current = steps.indexOf(status);

  return (
    <div className="flex justify-between bg-white p-5 rounded-xl shadow">
      {steps.map((step, idx) => (
        <div key={step} className="flex-1 text-center">
          <div
            className={`mx-auto h-3 w-3 rounded-full ${
              idx <= current ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <p
            className={`mt-2 text-xs ${
              idx <= current ? "text-green-600" : "text-gray-400"
            }`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}
