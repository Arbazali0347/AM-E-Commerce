const Delivery = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Delivery Information</h1>
        <p className="text-gray-600 mb-6">
          This is a placeholder page for delivery policy and shipping details.
          Please provide the exact information that will be displayed here.
        </p>

        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Delivery time</h2>
            <p className="text-gray-600">
              Note : 3-7 working days Delivery in normal circumstances. Due to road blockage, Protests ,Public Holidays, Sale Season or Area LockDown, Deliveries make take longer. For Any WhatsApp us on 03451081010
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Shipping Charges</h2>
            <p className="text-gray-600">
              Example: Free delivery for orders above Rs. 2000. Standard charges apply otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Delivery Areas</h2>
            <p className="text-gray-600">
              Example: We deliver all over Pakistan. International shipping is available on request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
